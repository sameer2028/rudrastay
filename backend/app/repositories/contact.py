from sqlalchemy.ext.asyncio import AsyncSession

from app.models.contact_message import ContactMessage
from app.repositories.base import BaseRepository


class ContactRepository(BaseRepository[ContactMessage]):
    def __init__(self, db: AsyncSession):
        super().__init__(ContactMessage, db)
