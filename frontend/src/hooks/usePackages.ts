import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';

export interface Package {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  duration_days: number;
  images: string[];
  inclusions: string[];
  is_featured: boolean;
}

export const useFeaturedPackages = () => {
  return useQuery({
    queryKey: ['packages', 'featured'],
    queryFn: async (): Promise<Package[]> => {
      const response = await apiClient.get('/packages/featured');
      return response.data.data;
    },
  });
};

export const usePackages = () => {
  return useQuery({
    queryKey: ['packages'],
    queryFn: async (): Promise<Package[]> => {
      const response = await apiClient.get('/packages/');
      return response.data.data; 
    },
  });
};

export const usePackage = (slug: string) => {
  return useQuery({
    queryKey: ['package', slug],
    queryFn: async (): Promise<Package> => {
      const response = await apiClient.get(`/packages/${slug}`);
      return response.data.data;
    },
    enabled: !!slug,
  });
};

export const useCreatePackage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await apiClient.post('/packages/', data);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['packages'] });
    },
  });
};

export const useUpdatePackage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await apiClient.put(`/packages/${id}`, data);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['packages'] });
      queryClient.invalidateQueries({ queryKey: ['package'] });
    },
  });
};

export const useDeletePackage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.delete(`/packages/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['packages'] });
    },
  });
};
