from typing import Optional
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.room import Room
from app.repositories.base import BaseRepository


class RoomRepository(BaseRepository[Room]):
    def __init__(self, db: AsyncSession):
        super().__init__(Room, db)

    async def get_by_slug(self, slug: str) -> Optional[Room]:
        result = await self.db.execute(
            select(Room).where(Room.slug == slug)
        )
        return result.scalar_one_or_none()

    async def get_featured(self):
        result = await self.db.execute(
            select(Room)
            .where(Room.is_featured == True, Room.is_available == True)
            .order_by(Room.sort_order)
        )
        return list(result.scalars().all())
