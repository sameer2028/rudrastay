from typing import TypeVar, Generic, Type, Optional, List
from sqlalchemy import select, func, delete
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.database import Base

ModelType = TypeVar("ModelType", bound=Base)


class BaseRepository(Generic[ModelType]):
    def __init__(self, model: Type[ModelType], db: AsyncSession):
        self.model = model
        self.db = db

    async def get_by_id(self, id: str) -> Optional[ModelType]:
        result = await self.db.execute(
            select(self.model).where(self.model.id == id)
        )
        return result.scalar_one_or_none()

    async def get_all(
        self,
        page: int = 1,
        page_size: int = 10,
        order_by=None,
        filters=None,
    ) -> tuple[List[ModelType], int]:
        query = select(self.model)
        count_query = select(func.count()).select_from(self.model)

        if filters:
            for f in filters:
                query = query.where(f)
                count_query = count_query.where(f)

        if order_by is not None:
            query = query.order_by(order_by)
        elif hasattr(self.model, "sort_order"):
            query = query.order_by(self.model.sort_order)
        elif hasattr(self.model, "created_at"):
            query = query.order_by(self.model.created_at.desc())

        total = (await self.db.execute(count_query)).scalar() or 0

        query = query.offset((page - 1) * page_size).limit(page_size)
        result = await self.db.execute(query)
        items = list(result.scalars().all())

        return items, total

    async def get_all_no_pagination(self, filters=None, order_by=None) -> List[ModelType]:
        query = select(self.model)

        if filters:
            for f in filters:
                query = query.where(f)

        if order_by is not None:
            query = query.order_by(order_by)
        elif hasattr(self.model, "sort_order"):
            query = query.order_by(self.model.sort_order)

        result = await self.db.execute(query)
        return list(result.scalars().all())

    async def create(self, obj: ModelType) -> ModelType:
        self.db.add(obj)
        await self.db.flush()
        await self.db.refresh(obj)
        return obj

    async def update(self, obj: ModelType, data: dict) -> ModelType:
        for key, value in data.items():
            if value is not None:
                setattr(obj, key, value)
        await self.db.flush()
        await self.db.refresh(obj)
        return obj

    async def delete(self, id: str) -> bool:
        result = await self.db.execute(
            delete(self.model).where(self.model.id == id)
        )
        return result.rowcount > 0
