from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.api.v1.router import api_router
from app.db.database import AsyncSessionLocal
from app.services.auth import AuthService


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Seed default admin on startup
    async with AsyncSessionLocal() as db:
        try:
            await AuthService.seed_admin(
                db,
                email=settings.ADMIN_EMAIL,
                password=settings.ADMIN_PASSWORD,
                name="Rudra Stay Admin",
            )
            await db.commit()
            print(f"[OK] Admin seeded: {settings.ADMIN_EMAIL}")
        except Exception as e:
            print(f"[ERROR] Admin seed failed: {e}")
            await db.rollback()

    yield


app = FastAPI(
    title="Rudra Stay API",
    description="Luxury Stay & Travel Booking Platform API",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)


@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "Rudra Stay API"}
