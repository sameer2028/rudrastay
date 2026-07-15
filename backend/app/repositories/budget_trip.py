from typing import Optional, List
from sqlalchemy import select, distinct
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.budget_trip import BudgetTrip
from app.repositories.base import BaseRepository


class BudgetTripRepository(BaseRepository[BudgetTrip]):
    def __init__(self, db: AsyncSession):
        super().__init__(BudgetTrip, db)

    async def get_by_slug(self, slug: str) -> Optional[BudgetTrip]:
        result = await self.db.execute(
            select(BudgetTrip).where(BudgetTrip.slug == slug)
        )
        return result.scalar_one_or_none()

    async def get_categories(self) -> List[str]:
        result = await self.db.execute(
            select(distinct(BudgetTrip.category)).order_by(BudgetTrip.category)
        )
        return list(result.scalars().all())
