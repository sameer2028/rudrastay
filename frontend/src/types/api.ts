export interface APIResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Array<{ field: string; message: string }>;
}

export interface PaginatedResponse<T> extends APIResponse<T[]> {
  pagination: {
    page: number;
    page_size: number;
    total_items: number;
    total_pages: number;
  };
}

