from typing import Optional, List
from decimal import Decimal
from pydantic import BaseModel, Field


class RoomBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=200)
    description: str = Field(..., min_length=10)
    capacity: int = Field(..., ge=1, le=20)
    price_per_night: Decimal = Field(..., ge=0)
    amenities: List[str] = []
    images: List[str] = []
    videos: List[str] = []
    is_available: bool = True
    is_featured: bool = False
    sort_order: int = 0


class RoomCreate(RoomBase):
    pass


class RoomUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=200)
    description: Optional[str] = Field(None, min_length=10)
    capacity: Optional[int] = Field(None, ge=1, le=20)
    price_per_night: Optional[Decimal] = Field(None, ge=0)
    amenities: Optional[List[str]] = None
    images: Optional[List[str]] = None
    videos: Optional[List[str]] = None
    is_available: Optional[bool] = None
    is_featured: Optional[bool] = None
    sort_order: Optional[int] = None


class RoomResponse(BaseModel):
    id: str
    name: str
    slug: str
    description: str
    capacity: int
    price_per_night: Decimal
    amenities: List[str]
    images: List[str]
    videos: List[str]
    is_available: bool
    is_featured: bool
    sort_order: int

    model_config = {"from_attributes": True}
