from fastapi import APIRouter

from app.api.v1.auth import router as auth_router
from app.api.v1.rooms import router as rooms_router
from app.api.v1.bookings import router as bookings_router
from app.api.v1.gallery import router as gallery_router
from app.api.v1.reviews import router as reviews_router
from app.api.v1.packages import router as packages_router
from app.api.v1.budget_trips import router as budget_trips_router
from app.api.v1.contact import router as contact_router
from app.api.v1.upload import router as upload_router

api_router = APIRouter(prefix="/api/v1")

api_router.include_router(auth_router)
api_router.include_router(rooms_router)
api_router.include_router(bookings_router)
api_router.include_router(gallery_router)
api_router.include_router(reviews_router)
api_router.include_router(packages_router)
api_router.include_router(budget_trips_router)
api_router.include_router(contact_router)
api_router.include_router(upload_router)
