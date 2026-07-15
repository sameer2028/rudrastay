from sqlalchemy.ext.asyncio import AsyncSession

from app.models.gallery import GalleryItem
from app.repositories.base import BaseRepository


class GalleryRepository(BaseRepository[GalleryItem]):
    def __init__(self, db: AsyncSession):
        super().__init__(GalleryItem, db)
