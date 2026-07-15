from math import ceil
from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.database import get_db
from app.core.dependencies import get_current_admin
from app.services.room import RoomService
from app.schemas.room import RoomCreate, RoomUpdate, RoomResponse

router = APIRouter(prefix="/rooms", tags=["Rooms"])


@router.get("")
async def list_rooms(
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=50),
    db: AsyncSession = Depends(get_db),
):
    service = RoomService(db)
    items, total = await service.get_all(page=page, page_size=page_size)
    return {
        "success": True,
        "message": "Rooms fetched successfully",
        "data": [RoomResponse.model_validate(r) for r in items],
        "pagination": {
            "page": page,
            "page_size": page_size,
            "total_items": total,
            "total_pages": ceil(total / page_size),
        },
    }


@router.get("/featured")
async def featured_rooms(db: AsyncSession = Depends(get_db)):
    service = RoomService(db)
    rooms = await service.get_featured()
    return {
        "success": True,
        "message": "Featured rooms fetched",
        "data": [RoomResponse.model_validate(r) for r in rooms],
    }


@router.get("/{slug}")
async def get_room(slug: str, db: AsyncSession = Depends(get_db)):
    service = RoomService(db)
    room = await service.get_by_slug(slug)
    return {
        "success": True,
        "message": "Room fetched successfully",
        "data": RoomResponse.model_validate(room),
    }


@router.post("", status_code=201)
async def create_room(
    data: RoomCreate,
    db: AsyncSession = Depends(get_db),
    admin=Depends(get_current_admin),
):
    service = RoomService(db)
    room = await service.create(data)
    return {
        "success": True,
        "message": "Room created successfully",
        "data": RoomResponse.model_validate(room),
    }


@router.put("/{id}")
async def update_room(
    id: str,
    data: RoomUpdate,
    db: AsyncSession = Depends(get_db),
    admin=Depends(get_current_admin),
):
    service = RoomService(db)
    room = await service.update(id, data)
    return {
        "success": True,
        "message": "Room updated successfully",
        "data": RoomResponse.model_validate(room),
    }


@router.delete("/{id}")
async def delete_room(
    id: str,
    db: AsyncSession = Depends(get_db),
    admin=Depends(get_current_admin),
):
    service = RoomService(db)
    await service.delete(id)
    return {"success": True, "message": "Room deleted successfully"}
