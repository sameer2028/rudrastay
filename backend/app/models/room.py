import uuid
from datetime import datetime, timezone
from decimal import Decimal

from sqlalchemy import String, Text, Integer, Numeric, Boolean, DateTime, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.database import Base


class Room(Base):
    __tablename__ = "rooms"

    id: Mapped[str] = mapped_column(
        String(36), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    name: Mapped[str] = mapped_column(String(200), nullable=False)
    slug: Mapped[str] = mapped_column(String(250), unique=True, nullable=False, index=True)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    capacity: Mapped[int] = mapped_column(Integer, nullable=False, default=2)
    price_per_night: Mapped[Decimal] = mapped_column(
        Numeric(10, 2), nullable=False, default=0
    )
    amenities: Mapped[list] = mapped_column(JSON, default=list)
    images: Mapped[list] = mapped_column(JSON, default=list)
    videos: Mapped[list] = mapped_column(JSON, default=list)
    is_available: Mapped[bool] = mapped_column(Boolean, default=True)
    is_featured: Mapped[bool] = mapped_column(Boolean, default=False)
    sort_order: Mapped[int] = mapped_column(Integer, default=0)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )

    bookings = relationship("Booking", back_populates="room", cascade="all, delete-orphan")
