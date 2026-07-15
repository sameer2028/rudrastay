import uuid
from datetime import datetime, timezone
from decimal import Decimal

from sqlalchemy import String, Text, Numeric, Boolean, DateTime, JSON
from sqlalchemy.orm import Mapped, mapped_column

from app.db.database import Base


class BudgetTrip(Base):
    __tablename__ = "budget_trips"

    id: Mapped[str] = mapped_column(
        String(36), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    name: Mapped[str] = mapped_column(String(200), nullable=False)
    slug: Mapped[str] = mapped_column(String(250), unique=True, nullable=False, index=True)
    category: Mapped[str] = mapped_column(String(50), nullable=False, index=True)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    price_estimate: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False, default=0)
    images: Mapped[list] = mapped_column(JSON, default=list)
    highlights: Mapped[list] = mapped_column(JSON, default=list)
    is_featured: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )
