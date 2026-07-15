from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.package import Package
from app.repositories.package import PackageRepository
from app.schemas.package import PackageCreate, PackageUpdate
from app.utils.slug import generate_slug


class PackageService:
    def __init__(self, db: AsyncSession):
        self.repo = PackageRepository(db)

    async def get_all(self, page: int = 1, page_size: int = 10):
        return await self.repo.get_all(page=page, page_size=page_size)

    async def get_featured(self):
        return await self.repo.get_featured()

    async def get_by_slug(self, slug: str):
        pkg = await self.repo.get_by_slug(slug)
        if not pkg:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Package not found")
        return pkg

    async def create(self, data: PackageCreate) -> Package:
        slug = generate_slug(data.name)
        pkg = Package(slug=slug, **data.model_dump())
        return await self.repo.create(pkg)

    async def update(self, id: str, data: PackageUpdate) -> Package:
        pkg = await self.repo.get_by_id(id)
        if not pkg:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Package not found")
        update_data = data.model_dump(exclude_unset=True)
        if "name" in update_data:
            update_data["slug"] = generate_slug(update_data["name"])
        return await self.repo.update(pkg, update_data)

    async def delete(self, id: str) -> bool:
        return await self.repo.delete(id)
