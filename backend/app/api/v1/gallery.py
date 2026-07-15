from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.database import get_db
from app.core.dependencies import get_current_admin
from app.services.gallery import GalleryService
from app.schemas.gallery import GalleryCreate, GalleryResponse

router = APIRouter(prefix="/gallery", tags=["Gallery"])


@router.get("")
async def list_gallery(
    type: str = Query(None, pattern="^(photo|video)$"),
    db: AsyncSession = Depends(get_db),
):
    service = GalleryService(db)
    items = await service.get_all(type_filter=type)
    return {
        "success": True,
        "message": "Gallery items fetched",
        "data": [GalleryResponse.model_validate(i) for i in items],
    }


@router.post("", status_code=201)
async def add_gallery_item(
    data: GalleryCreate,
    db: AsyncSession = Depends(get_db),
    admin=Depends(get_current_admin),
):
    service = GalleryService(db)
    item = await service.create(data)
    return {
        "success": True,
        "message": "Gallery item added",
        "data": GalleryResponse.model_validate(item),
    }


@router.delete("/{id}")
async def delete_gallery_item(
    id: str,
    db: AsyncSession = Depends(get_db),
    admin=Depends(get_current_admin),
):
    service = GalleryService(db)
    await service.delete(id)
    return {"success": True, "message": "Gallery item deleted"}
