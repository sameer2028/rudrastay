import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';

export interface BookingCreate {
  room_id?: string;
  package_id?: string;
  budget_trip_id?: string;
  item_name?: string;
  guest_name: string;
  guest_phone: string;
  guest_email: string;
  check_in: string; // YYYY-MM-DD
  check_out: string; // YYYY-MM-DD
  num_guests: number;
  special_requests?: string;
}

export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: BookingCreate) => {
      const response = await apiClient.post('/bookings/', data);
      return response.data.data;
    },
    onSuccess: () => {
      // Invalidate relevant queries if needed (e.g. if we had an availability calendar)
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    },
  });
};
