from typing import Optional, List, Any, Generic, TypeVar
from pydantic import BaseModel


T = TypeVar("T")


class APIResponse(BaseModel, Generic[T]):
    success: bool = True
    message: str = ""
    data: Optional[T] = None


class APIErrorResponse(BaseModel):
    success: bool = False
    message: str = ""
    errors: Optional[List[dict]] = None


class PaginationMeta(BaseModel):
    page: int
    page_size: int
    total_items: int
    total_pages: int


class PaginatedResponse(BaseModel):
    success: bool = True
    message: str = ""
    data: List[Any] = []
    pagination: Optional[PaginationMeta] = None


class PaginationParams(BaseModel):
    page: int = 1
    page_size: int = 10
