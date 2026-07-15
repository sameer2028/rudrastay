from typing import Optional
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.package import Package
from app.repositories.base import BaseRepository


class PackageRepository(BaseRepository[Package]):
    def __init__(self, db: AsyncSession):
        super().__init__(Package, db)

    async def get_by_slug(self, slug: str) -> Optional[Package]:
        result = await self.db.execute(
            select(Package).where(Package.slug == slug)
        )
        return result.scalar_one_or_none()

    async def get_featured(self):
        result = await self.db.execute(
            select(Package)
            .where(Package.is_featured == True)
            .order_by(Package.created_at.desc())
        )
        return list(result.scalars().all())
