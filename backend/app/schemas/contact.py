from typing import Optional
from pydantic import BaseModel, Field, EmailStr


class ContactCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=200)
    phone: str = Field(..., min_length=10, max_length=20)
    email: EmailStr
    message: str = Field(..., min_length=10)


class ContactResponse(BaseModel):
    id: str
    name: str
    phone: str
    email: str
    message: str
    is_resolved: bool
    created_at: str

    model_config = {"from_attributes": True}
