# Import all models here so Alembic can detect them
from app.db.database import Base
from app.models.admin import Admin
from app.models.room import Room
from app.models.booking import Booking
from app.models.gallery import GalleryItem
from app.models.review import Review
from app.models.package import Package
from app.models.budget_trip import BudgetTrip
from app.models.contact_message import ContactMessage

__all__ = [
    "Base",
    "Admin",
    "Room",
    "Booking",
    "GalleryItem",
    "Review",
    "Package",
    "BudgetTrip",
    "ContactMessage",
]
