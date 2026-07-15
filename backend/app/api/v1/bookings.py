from math import ceil
from fastapi import APIRouter, Depends, Query, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.database import get_db
from app.core.dependencies import get_current_admin
from app.services.booking import BookingService
from app.schemas.booking import BookingCreate, BookingStatusUpdate, BookingResponse

router = APIRouter(prefix="/bookings", tags=["Bookings"])


@router.post("", status_code=201)
async def create_booking(data: BookingCreate, background_tasks: BackgroundTasks, db: AsyncSession = Depends(get_db)):
    service = BookingService(db)
    booking = await service.create(data, background_tasks)
    return {
        "success": True,
        "message": "Booking request submitted successfully",
        "data": {"id": booking.id, "status": booking.status},
    }


@router.get("")
async def list_bookings(
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=50),
    status: str = Query(None),
    db: AsyncSession = Depends(get_db),
    admin=Depends(get_current_admin),
):
    service = BookingService(db)
    items, total = await service.get_all(page=page, page_size=page_size, status_filter=status)
    return {
        "success": True,
        "message": "Bookings fetched",
        "data": [BookingResponse.model_validate(b) for b in items],
        "pagination": {
            "page": page,
            "page_size": page_size,
            "total_items": total,
            "total_pages": ceil(total / page_size),
        },
    }


@router.get("/{id}")
async def get_booking(
    id: str,
    db: AsyncSession = Depends(get_db),
    admin=Depends(get_current_admin),
):
    service = BookingService(db)
    booking = await service.get_by_id(id)
    return {
        "success": True,
        "message": "Booking fetched",
        "data": BookingResponse.model_validate(booking),
    }


@router.patch("/{id}/status")
async def update_booking_status(
    id: str,
    data: BookingStatusUpdate,
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(get_db),
    admin=Depends(get_current_admin),
):
    service = BookingService(db)
    booking = await service.update_status(id, data, background_tasks)
    return {
        "success": True,
        "message": f"Booking status updated to {data.status}",
        "data": BookingResponse.model_validate(booking),
    }
