from typing import Optional
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.admin import Admin
from app.repositories.base import BaseRepository


class AdminRepository(BaseRepository[Admin]):
    def __init__(self, db: AsyncSession):
        super().__init__(Admin, db)

    async def get_by_email(self, email: str) -> Optional[Admin]:
        result = await self.db.execute(
            select(Admin).where(Admin.email == email)
        )
        return result.scalar_one_or_none()
