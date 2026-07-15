import uuid
from datetime import datetime, timezone

from sqlalchemy import String, Text, Integer, Boolean, DateTime
from sqlalchemy.orm import Mapped, mapped_column

from app.db.database import Base


class Review(Base):
    __tablename__ = "reviews"

    id: Mapped[str] = mapped_column(
        String(36), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    guest_name: Mapped[str] = mapped_column(String(200), nullable=False)
    guest_location: Mapped[str | None] = mapped_column(String(200), nullable=True)
    rating: Mapped[int] = mapped_column(Integer, nullable=False, default=5)
    content: Mapped[str] = mapped_column(Text, nullable=False)
    avatar_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    is_featured: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )
