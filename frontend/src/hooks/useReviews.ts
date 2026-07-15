import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';

export interface Review {
  id: string;
  guest_name: string;
  guest_location?: string;
  rating: number;
  content: string;
  is_featured: boolean;
  created_at: string;
}

export const useFeaturedReviews = () => {
  return useQuery({
    queryKey: ['reviews', 'featured'],
    queryFn: async (): Promise<Review[]> => {
      const response = await apiClient.get('/reviews/featured');
      return response.data;
    },
  });
};

export const useReviews = (params?: Record<string, any>) => {
  return useQuery({
    queryKey: ['reviews', params],
    queryFn: async (): Promise<Review[]> => {
      const response = await apiClient.get('/reviews/', { params });
      return response.data.data;
    },
  });
};
