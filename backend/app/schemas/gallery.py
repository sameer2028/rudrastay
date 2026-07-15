from typing import Optional
from pydantic import BaseModel, Field


class GalleryCreate(BaseModel):
    type: str = Field(..., pattern="^(photo|video)$")
    url: str = Field(..., min_length=1)
    caption: Optional[str] = Field(None, max_length=300)
    sort_order: int = 0


class GalleryUpdate(BaseModel):
    caption: Optional[str] = Field(None, max_length=300)
    sort_order: Optional[int] = None


class GalleryResponse(BaseModel):
    id: str
    type: str
    url: str
    caption: Optional[str]
    sort_order: int

    model_config = {"from_attributes": True}
