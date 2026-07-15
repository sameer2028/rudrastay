from math import ceil
from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.database import get_db
from app.core.dependencies import get_current_admin
from app.services.review import ReviewService
from app.schemas.review import ReviewCreate, ReviewUpdate, ReviewResponse

router = APIRouter(prefix="/reviews", tags=["Reviews"])


@router.get("")
async def list_reviews(
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=50),
    db: AsyncSession = Depends(get_db),
):
    service = ReviewService(db)
    items, total = await service.get_all(page=page, page_size=page_size)
    return {
        "success": True,
        "message": "Reviews fetched",
        "data": [ReviewResponse.model_validate(r) for r in items],
        "pagination": {
            "page": page, "page_size": page_size,
            "total_items": total, "total_pages": ceil(total / page_size),
        },
    }


@router.get("/featured")
async def featured_reviews(db: AsyncSession = Depends(get_db)):
    service = ReviewService(db)
    reviews = await service.get_featured()
    return {
        "success": True,
        "message": "Featured reviews fetched",
        "data": [ReviewResponse.model_validate(r) for r in reviews],
    }


@router.post("", status_code=201)
async def create_review(
    data: ReviewCreate, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin),
):
    service = ReviewService(db)
    review = await service.create(data)
    return {"success": True, "message": "Review created", "data": ReviewResponse.model_validate(review)}


@router.put("/{id}")
async def update_review(
    id: str, data: ReviewUpdate, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin),
):
    service = ReviewService(db)
    review = await service.update(id, data)
    return {"success": True, "message": "Review updated", "data": ReviewResponse.model_validate(review)}


@router.delete("/{id}")
async def delete_review(id: str, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    service = ReviewService(db)
    await service.delete(id)
    return {"success": True, "message": "Review deleted"}
