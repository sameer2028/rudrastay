from typing import Optional, List
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.room import Room
from app.repositories.room import RoomRepository
from app.schemas.room import RoomCreate, RoomUpdate
from app.utils.slug import generate_slug


class RoomService:
    def __init__(self, db: AsyncSession):
        self.repo = RoomRepository(db)

    async def get_all(self, page: int = 1, page_size: int = 10):
        return await self.repo.get_all(page=page, page_size=page_size)

    async def get_featured(self):
        return await self.repo.get_featured()

    async def get_by_slug(self, slug: str):
        room = await self.repo.get_by_slug(slug)
        if not room:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Room not found")
        return room

    async def get_by_id(self, id: str):
        room = await self.repo.get_by_id(id)
        if not room:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Room not found")
        return room

    async def create(self, data: RoomCreate) -> Room:
        slug = generate_slug(data.name)
        existing = await self.repo.get_by_slug(slug)
        if existing:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="A room with this name already exists",
            )

        room = Room(
            name=data.name,
            slug=slug,
            description=data.description,
            capacity=data.capacity,
            price_per_night=data.price_per_night,
            original_price=data.original_price,
            discount_percentage=data.discount_percentage,
            extra_guest_price=data.extra_guest_price,
            amenities=data.amenities,
            images=data.images,
            videos=data.videos,
            is_available=data.is_available,
            is_featured=data.is_featured,
            sort_order=data.sort_order,
        )
        return await self.repo.create(room)

    async def update(self, id: str, data: RoomUpdate) -> Room:
        room = await self.get_by_id(id)
        update_data = data.model_dump(exclude_unset=True)

        if "name" in update_data:
            slug = generate_slug(update_data["name"])
            existing = await self.repo.get_by_slug(slug)
            if existing and existing.id != id:
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail="A room with this name already exists",
                )
            update_data["slug"] = slug

        return await self.repo.update(room, update_data)

    async def delete(self, id: str) -> bool:
        await self.get_by_id(id)
        return await self.repo.delete(id)
