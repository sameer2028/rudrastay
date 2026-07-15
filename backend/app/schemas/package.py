from typing import Optional, List
from decimal import Decimal
from pydantic import BaseModel, Field


class PackageBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=200)
    description: str = Field(..., min_length=10)
    duration_days: int = Field(..., ge=1)
    price: Decimal = Field(..., ge=0)
    images: List[str] = []
    inclusions: List[str] = []
    pdf_url: Optional[str] = None
    is_featured: bool = False


class PackageCreate(PackageBase):
    pass


class PackageUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=200)
    description: Optional[str] = Field(None, min_length=10)
    duration_days: Optional[int] = Field(None, ge=1)
    price: Optional[Decimal] = Field(None, ge=0)
    images: Optional[List[str]] = None
    inclusions: Optional[List[str]] = None
    pdf_url: Optional[str] = None
    is_featured: Optional[bool] = None


class PackageResponse(BaseModel):
    id: str
    name: str
    slug: str
    description: str
    duration_days: int
    price: Decimal
    images: List[str]
    inclusions: List[str]
    pdf_url: Optional[str]
    is_featured: bool

    model_config = {"from_attributes": True}
