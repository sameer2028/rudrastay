import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';

export interface Room {
  id: string;
  name: string;
  slug: string;
  description: string;
  capacity: number;
  price_per_night: number;
  original_price?: number;
  discount_percentage: number;
  extra_guest_price: number;
  amenities: string[];
  images: string[];
  videos: string[];
  is_available: boolean;
  is_featured: boolean;
}

export const useFeaturedRooms = () => {
  return useQuery({
    queryKey: ['rooms', 'featured'],
    queryFn: async (): Promise<Room[]> => {
      const response = await apiClient.get('/rooms/featured');
      return response.data.data;
    },
  });
};

export const useRooms = () => {
  return useQuery({
    queryKey: ['rooms'],
    queryFn: async (): Promise<Room[]> => {
      const response = await apiClient.get('/rooms/');
      return response.data.data; 
    },
  });
};

export const useRoom = (slug: string) => {
  return useQuery({
    queryKey: ['room', slug],
    queryFn: async (): Promise<Room> => {
      const response = await apiClient.get(`/rooms/${slug}`);
      return response.data.data;
    },
    enabled: !!slug,
  });
};

export const useCreateRoom = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await apiClient.post('/rooms/', data);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    },
  });
};

export const useUpdateRoom = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await apiClient.put(`/rooms/${id}`, data);
      return response.data.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
      queryClient.invalidateQueries({ queryKey: ['room'] }); // Invalidate all specific rooms too
    },
  });
};

export const useDeleteRoom = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.delete(`/rooms/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    },
  });
};
