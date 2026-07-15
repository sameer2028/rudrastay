from sqlalchemy.ext.asyncio import AsyncSession

from app.models.gallery import GalleryItem
from app.repositories.gallery import GalleryRepository
from app.schemas.gallery import GalleryCreate, GalleryUpdate
from fastapi import HTTPException


class GalleryService:
    def __init__(self, db: AsyncSession):
        self.repo = GalleryRepository(db)

    async def get_all(self, type_filter: str = None):
        filters = []
        if type_filter:
            filters.append(GalleryItem.type == type_filter)
        return await self.repo.get_all_no_pagination(filters=filters)

    async def create(self, data: GalleryCreate) -> GalleryItem:
        item = GalleryItem(
            type=data.type,
            url=data.url,
            caption=data.caption,
            sort_order=data.sort_order,
        )
        return await self.repo.create(item)

    async def update(self, id: str, data: GalleryUpdate) -> GalleryItem:
        item = await self.repo.get_by_id(id)
        if not item:
            raise HTTPException(status_code=404, detail="Gallery item not found")
        return await self.repo.update(item, data.model_dump(exclude_unset=True))

    async def delete(self, id: str) -> bool:
        return await self.repo.delete(id)
