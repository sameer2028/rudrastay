from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.review import Review
from app.repositories.base import BaseRepository


class ReviewRepository(BaseRepository[Review]):
    def __init__(self, db: AsyncSession):
        super().__init__(Review, db)

    async def get_featured(self):
        result = await self.db.execute(
            select(Review)
            .where(Review.is_featured == True)
            .order_by(Review.created_at.desc())
        )
        return list(result.scalars().all())
