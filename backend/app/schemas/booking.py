from typing import Optional
from datetime import date, datetime
from pydantic import BaseModel, Field, EmailStr, model_validator


class BookingCreate(BaseModel):
    room_id: Optional[str] = None
    package_id: Optional[str] = None
    budget_trip_id: Optional[str] = None
    item_name: Optional[str] = None
    guest_name: str = Field(..., min_length=2, max_length=200)
    guest_phone: str = Field(..., min_length=10, max_length=20)
    guest_email: EmailStr
    check_in: date
    check_out: date
    num_guests: int = Field(..., ge=1, le=20)
    special_requests: Optional[str] = None

    @model_validator(mode='after')
    def check_item_id(self):
        if not self.room_id and not self.package_id and not self.budget_trip_id:
            raise ValueError("Must provide room_id, package_id, or budget_trip_id")
        return self
class BookingStatusUpdate(BaseModel):
    status: str = Field(..., pattern="^(pending|confirmed|cancelled|completed)$")
    rejection_reason: Optional[str] = None


class BookingResponse(BaseModel):
    id: str
    room_id: Optional[str]
    package_id: Optional[str]
    budget_trip_id: Optional[str]
    item_name: Optional[str]
    guest_name: str
    guest_phone: str
    guest_email: str
    check_in: date
    check_out: date
    num_guests: int
    special_requests: Optional[str]
    rejection_reason: Optional[str]
    status: str
    created_at: datetime

    model_config = {"from_attributes": True}
