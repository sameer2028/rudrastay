from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import verify_password, hash_password, create_access_token, create_refresh_token, decode_token
from app.repositories.admin import AdminRepository
from app.models.admin import Admin
from app.schemas.auth import LoginRequest, TokenResponse


class AuthService:
    def __init__(self, db: AsyncSession):
        self.repo = AdminRepository(db)

    async def login(self, data: LoginRequest) -> TokenResponse:
        admin = await self.repo.get_by_email(data.email)

        if not admin or not verify_password(data.password, admin.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password",
            )

        access_token = create_access_token({"sub": admin.id})
        refresh_token = create_refresh_token({"sub": admin.id})

        return TokenResponse(
            access_token=access_token,
            refresh_token=refresh_token,
        )

    async def refresh_token(self, refresh_token: str) -> TokenResponse:
        payload = decode_token(refresh_token)

        if not payload or payload.get("type") != "refresh":
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid refresh token",
            )

        admin = await self.repo.get_by_id(payload.get("sub"))

        if not admin:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Admin not found",
            )

        new_access_token = create_access_token({"sub": admin.id})
        new_refresh_token = create_refresh_token({"sub": admin.id})

        return TokenResponse(
            access_token=new_access_token,
            refresh_token=new_refresh_token,
        )

    @staticmethod
    async def seed_admin(db: AsyncSession, email: str, password: str, name: str = "Admin"):
        repo = AdminRepository(db)
        existing = await repo.get_by_email(email)

        if existing:
            return existing

        admin = Admin(
            email=email,
            password_hash=hash_password(password),
            name=name,
        )
        return await repo.create(admin)
