from math import ceil
from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.database import get_db
from app.core.dependencies import get_current_admin
from app.services.package import PackageService
from app.schemas.package import PackageCreate, PackageUpdate, PackageResponse

router = APIRouter(prefix="/packages", tags=["Packages"])


@router.get("")
async def list_packages(
    page: int = Query(1, ge=1), page_size: int = Query(10, ge=1, le=50),
    db: AsyncSession = Depends(get_db),
):
    service = PackageService(db)
    items, total = await service.get_all(page=page, page_size=page_size)
    return {
        "success": True, "message": "Packages fetched",
        "data": [PackageResponse.model_validate(p) for p in items],
        "pagination": {"page": page, "page_size": page_size, "total_items": total, "total_pages": ceil(total / page_size)},
    }


@router.get("/featured")
async def featured_packages(db: AsyncSession = Depends(get_db)):
    service = PackageService(db)
    pkgs = await service.get_featured()
    return {"success": True, "message": "Featured packages fetched", "data": [PackageResponse.model_validate(p) for p in pkgs]}


@router.get("/{slug}")
async def get_package(slug: str, db: AsyncSession = Depends(get_db)):
    service = PackageService(db)
    pkg = await service.get_by_slug(slug)
    return {"success": True, "message": "Package fetched", "data": PackageResponse.model_validate(pkg)}


@router.post("", status_code=201)
async def create_package(data: PackageCreate, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    service = PackageService(db)
    pkg = await service.create(data)
    return {"success": True, "message": "Package created", "data": PackageResponse.model_validate(pkg)}


@router.put("/{id}")
async def update_package(id: str, data: PackageUpdate, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    service = PackageService(db)
    pkg = await service.update(id, data)
    return {"success": True, "message": "Package updated", "data": PackageResponse.model_validate(pkg)}


@router.delete("/{id}")
async def delete_package(id: str, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    service = PackageService(db)
    await service.delete(id)
    return {"success": True, "message": "Package deleted"}
