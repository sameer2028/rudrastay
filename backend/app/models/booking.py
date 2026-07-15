import uuid
from datetime import datetime, date, timezone

from sqlalchemy import String, Text, Integer, Date, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.database import Base


class Booking(Base):
    __tablename__ = "bookings"

    id: Mapped[str] = mapped_column(
        String(36), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    room_id: Mapped[str | None] = mapped_column(
        String(36), ForeignKey("rooms.id", ondelete="CASCADE"), nullable=True, index=True
    )
    package_id: Mapped[str | None] = mapped_column(
        String(36), ForeignKey("packages.id", ondelete="CASCADE"), nullable=True, index=True
    )
    budget_trip_id: Mapped[str | None] = mapped_column(
        String(36), ForeignKey("budget_trips.id", ondelete="CASCADE"), nullable=True, index=True
    )
    item_name: Mapped[str | None] = mapped_column(String(200), nullable=True)
    guest_name: Mapped[str] = mapped_column(String(200), nullable=False)
    guest_phone: Mapped[str] = mapped_column(String(20), nullable=False)
    guest_email: Mapped[str] = mapped_column(String(255), nullable=False)
    check_in: Mapped[date] = mapped_column(Date, nullable=False)
    check_out: Mapped[date] = mapped_column(Date, nullable=False)
    num_guests: Mapped[int] = mapped_column(Integer, nullable=False, default=1)
    special_requests: Mapped[str | None] = mapped_column(Text, nullable=True)
    rejection_reason: Mapped[str | None] = mapped_column(String(255), nullable=True)
    status: Mapped[str] = mapped_column(
        String(20), nullable=False, default="pending", index=True
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )

    room = relationship("Room", back_populates="bookings")
    package = relationship("Package")
    budget_trip = relationship("BudgetTrip")
