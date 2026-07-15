import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';

export interface BudgetTrip {
  id: string;
  name: string;
  slug: string;
  description: string;
  price_estimate: number;
  category: string;
  images: string[];
  highlights: string[];
  is_featured: boolean;
}

export const useFeaturedBudgetTrips = () => {
  return useQuery({
    queryKey: ['budget-trips', 'featured'],
    queryFn: async (): Promise<BudgetTrip[]> => {
      const response = await apiClient.get('/budget-trips/featured');
      return response.data.data;
    },
  });
};

export const useBudgetTrips = (category?: string) => {
  return useQuery({
    queryKey: ['budget-trips', category],
    queryFn: async (): Promise<BudgetTrip[]> => {
      const params = category ? { category } : {};
      const response = await apiClient.get('/budget-trips/', { params });
      return response.data.data; 
    },
  });
};

export const useBudgetTrip = (slug: string) => {
  return useQuery({
    queryKey: ['budget-trip', slug],
    queryFn: async (): Promise<BudgetTrip> => {
      const response = await apiClient.get(`/budget-trips/${slug}`);
      return response.data.data;
    },
    enabled: !!slug,
  });
};
