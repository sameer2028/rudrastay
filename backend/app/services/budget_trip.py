from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.budget_trip import BudgetTrip
from app.repositories.budget_trip import BudgetTripRepository
from app.schemas.budget_trip import BudgetTripCreate, BudgetTripUpdate
from app.utils.slug import generate_slug


class BudgetTripService:
    def __init__(self, db: AsyncSession):
        self.repo = BudgetTripRepository(db)

    async def get_all(self, page: int = 1, page_size: int = 10, category: str = None):
        filters = []
        if category:
            filters.append(BudgetTrip.category == category)
        return await self.repo.get_all(page=page, page_size=page_size, filters=filters)

    async def get_categories(self):
        return await self.repo.get_categories()

    async def get_by_slug(self, slug: str):
        trip = await self.repo.get_by_slug(slug)
        if not trip:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Trip not found")
        return trip

    async def create(self, data: BudgetTripCreate) -> BudgetTrip:
        slug = generate_slug(data.name)
        trip = BudgetTrip(slug=slug, **data.model_dump())
        return await self.repo.create(trip)

    async def update(self, id: str, data: BudgetTripUpdate) -> BudgetTrip:
        trip = await self.repo.get_by_id(id)
        if not trip:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Trip not found")
        update_data = data.model_dump(exclude_unset=True)
        if "name" in update_data:
            update_data["slug"] = generate_slug(update_data["name"])
        return await self.repo.update(trip, update_data)

    async def delete(self, id: str) -> bool:
        return await self.repo.delete(id)
