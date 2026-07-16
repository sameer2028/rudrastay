from fastapi import HTTPException, status, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.booking import Booking
from app.repositories.booking import BookingRepository
from app.repositories.room import RoomRepository
from app.schemas.booking import BookingCreate, BookingStatusUpdate
from app.services.email import EmailService


class BookingService:
    def __init__(self, db: AsyncSession):
        self.repo = BookingRepository(db)
        self.room_repo = RoomRepository(db)

    async def get_all(self, page: int = 1, page_size: int = 10, status_filter: str = None):
        filters = []
        if status_filter:
            filters.append(Booking.status == status_filter)
        return await self.repo.get_all(page=page, page_size=page_size, filters=filters)

    async def get_by_id(self, id: str):
        booking = await self.repo.get_by_id(id)
        if not booking:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Booking not found")
        return booking

    async def create(self, data: BookingCreate, background_tasks: BackgroundTasks = None) -> Booking:
        if data.room_id:
            room = await self.room_repo.get_by_id(data.room_id)
            if not room:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Room not found")
            if not room.is_available:
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Room is not available")

        if data.check_out <= data.check_in:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Check-out must be after check-in",
            )

        booking = Booking(
            room_id=data.room_id,
            package_id=data.package_id,
            budget_trip_id=data.budget_trip_id,
            item_name=data.item_name,
            guest_name=data.guest_name,
            guest_phone=data.guest_phone,
            guest_email=data.guest_email,
            check_in=data.check_in,
            check_out=data.check_out,
            num_guests=data.num_guests,
            special_requests=data.special_requests,
            status="pending",
        )
        created_booking = await self.repo.create(booking)
        
        # Send admin notification and user acknowledgement (fire and forget)
        booking_details = data.model_dump()
        booking_details['check_in'] = str(booking_details['check_in'])
        booking_details['check_out'] = str(booking_details['check_out'])
        if background_tasks:
            background_tasks.add_task(EmailService.send_admin_new_booking, booking_details)
            background_tasks.add_task(EmailService.send_user_booking_submitted, booking_details)
        else:
            EmailService.send_admin_new_booking(booking_details)
            EmailService.send_user_booking_submitted(booking_details)
        
        return created_booking

    async def update_status(self, id: str, data: BookingStatusUpdate, background_tasks: BackgroundTasks = None) -> Booking:
        booking = await self.get_by_id(id)
        update_data = {"status": data.status}
        if data.status == "cancelled" and data.rejection_reason is not None:
            update_data["rejection_reason"] = data.rejection_reason
            
        updated_booking = await self.repo.update(booking, update_data)
        
        # Prepare details for email
        booking_details = {
            "guest_name": updated_booking.guest_name,
            "guest_email": updated_booking.guest_email,
            "item_name": updated_booking.item_name,
            "check_in": str(updated_booking.check_in),
            "check_out": str(updated_booking.check_out),
            "num_guests": updated_booking.num_guests
        }
        
        if data.status == "confirmed":
            # Just sending generic confirmation without specific room assignment since that's handled on frontend only for now
            if background_tasks:
                background_tasks.add_task(EmailService.send_user_booking_confirmed, booking_details)
            else:
                EmailService.send_user_booking_confirmed(booking_details)
        elif data.status == "cancelled":
            if background_tasks:
                background_tasks.add_task(EmailService.send_user_booking_rejected, booking_details, data.rejection_reason)
            else:
                EmailService.send_user_booking_rejected(booking_details, data.rejection_reason)
            
        return updated_booking
