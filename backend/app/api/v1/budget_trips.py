from math import ceil
from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.database import get_db
from app.core.dependencies import get_current_admin
from app.services.budget_trip import BudgetTripService
from app.schemas.budget_trip import BudgetTripCreate, BudgetTripUpdate, BudgetTripResponse

router = APIRouter(prefix="/budget-trips", tags=["Budget Trips"])


@router.get("")
async def list_trips(
    page: int = Query(1, ge=1), page_size: int = Query(10, ge=1, le=50),
    category: str = Query(None), db: AsyncSession = Depends(get_db),
):
    service = BudgetTripService(db)
    items, total = await service.get_all(page=page, page_size=page_size, category=category)
    return {
        "success": True, "message": "Budget trips fetched",
        "data": [BudgetTripResponse.model_validate(t) for t in items],
        "pagination": {"page": page, "page_size": page_size, "total_items": total, "total_pages": ceil(total / page_size)},
    }


@router.get("/categories")
async def get_categories(db: AsyncSession = Depends(get_db)):
    service = BudgetTripService(db)
    categories = await service.get_categories()
    return {"success": True, "message": "Categories fetched", "data": categories}


@router.get("/{slug}")
async def get_trip(slug: str, db: AsyncSession = Depends(get_db)):
    service = BudgetTripService(db)
    trip = await service.get_by_slug(slug)
    return {"success": True, "message": "Trip fetched", "data": BudgetTripResponse.model_validate(trip)}


@router.post("", status_code=201)
async def create_trip(data: BudgetTripCreate, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    service = BudgetTripService(db)
    trip = await service.create(data)
    return {"success": True, "message": "Trip created", "data": BudgetTripResponse.model_validate(trip)}


@router.put("/{id}")
async def update_trip(id: str, data: BudgetTripUpdate, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    service = BudgetTripService(db)
    trip = await service.update(id, data)
    return {"success": True, "message": "Trip updated", "data": BudgetTripResponse.model_validate(trip)}


@router.delete("/{id}")
async def delete_trip(id: str, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    service = BudgetTripService(db)
    await service.delete(id)
    return {"success": True, "message": "Trip deleted"}
