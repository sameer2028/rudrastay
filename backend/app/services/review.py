from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.review import Review
from app.repositories.review import ReviewRepository
from app.schemas.review import ReviewCreate, ReviewUpdate


class ReviewService:
    def __init__(self, db: AsyncSession):
        self.repo = ReviewRepository(db)

    async def get_all(self, page: int = 1, page_size: int = 10):
        return await self.repo.get_all(page=page, page_size=page_size)

    async def get_featured(self):
        return await self.repo.get_featured()

    async def create(self, data: ReviewCreate) -> Review:
        review = Review(**data.model_dump())
        return await self.repo.create(review)

    async def update(self, id: str, data: ReviewUpdate) -> Review:
        review = await self.repo.get_by_id(id)
        if not review:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Review not found")
        return await self.repo.update(review, data.model_dump(exclude_unset=True))

    async def delete(self, id: str) -> bool:
        return await self.repo.delete(id)
