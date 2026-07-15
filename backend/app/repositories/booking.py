from sqlalchemy.ext.asyncio import AsyncSession

from app.models.booking import Booking
from app.repositories.base import BaseRepository


class BookingRepository(BaseRepository[Booking]):
    def __init__(self, db: AsyncSession):
        super().__init__(Booking, db)
