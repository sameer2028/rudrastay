from typing import Optional
from pydantic import BaseModel, Field


class ReviewBase(BaseModel):
    guest_name: str = Field(..., min_length=2, max_length=200)
    guest_location: Optional[str] = Field(None, max_length=200)
    rating: int = Field(..., ge=1, le=5)
    content: str = Field(..., min_length=10)
    avatar_url: Optional[str] = None
    is_featured: bool = False


class ReviewCreate(ReviewBase):
    pass


class ReviewUpdate(BaseModel):
    guest_name: Optional[str] = Field(None, min_length=2, max_length=200)
    guest_location: Optional[str] = None
    rating: Optional[int] = Field(None, ge=1, le=5)
    content: Optional[str] = Field(None, min_length=10)
    avatar_url: Optional[str] = None
    is_featured: Optional[bool] = None


class ReviewResponse(BaseModel):
    id: str
    guest_name: str
    guest_location: Optional[str]
    rating: int
    content: str
    avatar_url: Optional[str]
    is_featured: bool

    model_config = {"from_attributes": True}
