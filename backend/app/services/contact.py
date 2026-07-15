from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.contact_message import ContactMessage
from app.repositories.contact import ContactRepository
from app.schemas.contact import ContactCreate


class ContactService:
    def __init__(self, db: AsyncSession):
        self.repo = ContactRepository(db)

    async def get_all(self, page: int = 1, page_size: int = 10):
        return await self.repo.get_all(page=page, page_size=page_size)

    async def create(self, data: ContactCreate) -> ContactMessage:
        msg = ContactMessage(**data.model_dump(exclude={"subject"}))
        return await self.repo.create(msg)

    async def mark_resolved(self, id: str):
        msg = await self.repo.get_by_id(id)
        if not msg:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Message not found")
        return await self.repo.update(msg, {"is_resolved": not msg.is_resolved})

    async def delete(self, id: str) -> bool:
        return await self.repo.delete(id)
