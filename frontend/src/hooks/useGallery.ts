import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';

export interface GalleryItem {
  id: string;
  type: string;
  url: string;
  caption?: string;
  sort_order: number;
}

export const useGallery = (category?: string) => {
  return useQuery({
    queryKey: ['gallery', category],
    queryFn: async (): Promise<GalleryItem[]> => {
      const params = category ? { category } : {};
      const response = await apiClient.get('/gallery/', { params });
      return response.data.data; // The backend returns { success, message, data: [...] }
    },
  });
};
