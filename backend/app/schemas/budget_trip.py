from typing import Optional, List
from decimal import Decimal
from pydantic import BaseModel, Field


class BudgetTripBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=200)
    category: str = Field(..., min_length=1, max_length=50)
    description: str = Field(..., min_length=10)
    price_estimate: Decimal = Field(..., ge=0)
    images: List[str] = []
    highlights: List[str] = []
    is_featured: bool = False


class BudgetTripCreate(BudgetTripBase):
    pass


class BudgetTripUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=200)
    category: Optional[str] = Field(None, min_length=1, max_length=50)
    description: Optional[str] = Field(None, min_length=10)
    price_estimate: Optional[Decimal] = Field(None, ge=0)
    images: Optional[List[str]] = None
    highlights: Optional[List[str]] = None
    is_featured: Optional[bool] = None


class BudgetTripResponse(BaseModel):
    id: str
    name: str
    slug: str
    category: str
    description: str
    price_estimate: Decimal
    images: List[str]
    highlights: List[str]
    is_featured: bool

    model_config = {"from_attributes": True}
