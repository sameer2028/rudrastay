from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.database import get_db
from app.services.auth import AuthService
from app.schemas.auth import LoginRequest, TokenResponse, RefreshRequest, AdminResponse
from app.core.dependencies import get_current_admin

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/login", response_model=dict)
async def login(data: LoginRequest, db: AsyncSession = Depends(get_db)):
    service = AuthService(db)
    tokens = await service.login(data)
    return {
        "success": True,
        "message": "Login successful",
        "data": tokens.model_dump(),
    }


@router.post("/refresh", response_model=dict)
async def refresh(data: RefreshRequest, db: AsyncSession = Depends(get_db)):
    service = AuthService(db)
    tokens = await service.refresh_token(data.refresh_token)
    return {
        "success": True,
        "message": "Token refreshed",
        "data": tokens.model_dump(),
    }


@router.get("/me", response_model=dict)
async def get_me(admin=Depends(get_current_admin)):
    return {
        "success": True,
        "message": "Admin profile",
        "data": AdminResponse(id=admin.id, email=admin.email, name=admin.name).model_dump(),
    }
