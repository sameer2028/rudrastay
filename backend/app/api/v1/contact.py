from math import ceil
from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.database import get_db
from app.core.dependencies import get_current_admin
from app.services.contact import ContactService
from app.schemas.contact import ContactCreate, ContactResponse

router = APIRouter(prefix="/contact", tags=["Contact"])


@router.post("", status_code=201)
async def submit_contact(data: ContactCreate, db: AsyncSession = Depends(get_db)):
    service = ContactService(db)
    msg = await service.create(data)
    return {"success": True, "message": "Message sent successfully", "data": {"id": msg.id}}


@router.get("")
async def list_messages(
    page: int = Query(1, ge=1), page_size: int = Query(10, ge=1, le=50),
    db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin),
):
    service = ContactService(db)
    items, total = await service.get_all(page=page, page_size=page_size)
    return {
        "success": True, "message": "Messages fetched",
        "data": [ContactResponse.model_validate(m) for m in items],
        "pagination": {"page": page, "page_size": page_size, "total_items": total, "total_pages": ceil(total / page_size)},
    }


@router.patch("/{id}/resolve")
async def resolve_message(id: str, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    service = ContactService(db)
    await service.mark_resolved(id)
    return {"success": True, "message": "Message marked as resolved"}


@router.delete("/{id}")
async def delete_message(id: str, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    service = ContactService(db)
    await service.delete(id)
    return {"success": True, "message": "Message deleted"}
