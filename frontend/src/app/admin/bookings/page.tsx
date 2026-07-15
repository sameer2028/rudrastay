"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { Loader2, CheckCircle, XCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const REJECT_REASONS = [
  "Room unavailable for selected dates",
  "Invalid or incomplete guest details",
  "Payment not received/verified",
  "Policy violation or restricted booking",
  "Other"
];

export default function AdminBookingsPage() {
  const queryClient = useQueryClient();
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    step: number;
    bookingId: string | null;
    action: 'confirmed' | 'cancelled' | null;
    reason: string;
    assignedRoom: string;
  }>({
    isOpen: false,
    step: 1,
    bookingId: null,
    action: null,
    reason: "",
    assignedRoom: ""
  });

  const DUMMY_ROOMS = ["101", "102", "103", "104", "105", "106", "107", "108"];

  // Fetch all bookings
  const { data: bookings, isLoading } = useQuery({
    queryKey: ['admin-bookings'],
    queryFn: async () => {
      const response = await apiClient.get('/bookings/');
      return response.data.data;
    }
  });

  // Mutation to update booking status
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status, rejection_reason }: { id: string; status: string; rejection_reason?: string }) => {
      const response = await apiClient.patch(`/bookings/${id}/status`, { status, rejection_reason });
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-bookings'] });
      queryClient.invalidateQueries({ queryKey: ['admin-bookings-stats'] });
    }
  });

  const openConfirmModal = (id: string, action: 'confirmed' | 'cancelled') => {
    setModalState({ isOpen: true, step: 1, bookingId: id, action, reason: "", assignedRoom: "" });
  };

  const handleNextStep = () => {
    if (modalState.action === 'cancelled' && !modalState.reason) {
      return; // prevent if no reason selected
    }
    if (modalState.action === 'confirmed' && !modalState.assignedRoom) {
      return; // prevent if no room selected
    }
    setModalState(prev => ({ ...prev, step: 2 }));
  };

  const handleFinalSubmit = () => {
    if (modalState.bookingId && modalState.action) {
      updateStatusMutation.mutate({ 
        id: modalState.bookingId, 
        status: modalState.action,
        ...(modalState.action === 'cancelled' && modalState.reason ? { rejection_reason: modalState.reason } : {})
      });
      setModalState(prev => ({ ...prev, isOpen: false }));
    }
  };

  const closeModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-gold" />
      </div>
    );
  }

  const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3 h-3" /> Pending
          </span>
        );
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
            <CheckCircle className="w-3 h-3" /> Confirmed
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200">
            <XCircle className="w-3 h-3" /> Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-warm-brown">Booking Requests</h1>
        <p className="text-sm text-brown-muted mt-2">Manage incoming inquiries and confirm reservations.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gold-light/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-sand/30 border-b border-gold-light/20 text-xs uppercase tracking-wider text-brown-muted font-semibold">
                <th className="px-6 py-4">Guest</th>
                <th className="px-6 py-4">Item Booked</th>
                <th className="px-6 py-4">Dates</th>
                <th className="px-6 py-4">Details</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold-light/10 text-sm">
              {!bookings || bookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-brown-muted">
                    No booking requests found.
                  </td>
                </tr>
              ) : (
                bookings.map((booking: any) => (
                  <tr key={booking.id} className="hover:bg-sand/10 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-warm-brown">{booking.guest_name}</div>
                      <div className="text-xs text-brown-muted">{booking.guest_email}</div>
                      <div className="text-xs text-brown-muted">{booking.guest_phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-warm-brown">{booking.item_name || 'Room'}</div>
                      <div className="text-[10px] uppercase font-bold text-gold mt-1">
                        {booking.package_id ? 'Package' : booking.budget_trip_id ? 'Budget Trip' : 'Room'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-warm-brown">
                        {new Date(booking.check_in).toLocaleDateString()} &rarr; {new Date(booking.check_out).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-warm-brown">{booking.num_guests} Guest(s)</div>
                      {booking.special_requests && (
                        <div className="text-xs text-brown-muted mt-1 max-w-xs truncate" title={booking.special_requests}>
                          Note: {booking.special_requests}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={booking.status} />
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      {booking.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => openConfirmModal(booking.id, 'confirmed')}
                            disabled={updateStatusMutation.isPending}
                            className="text-xs px-3 py-1.5 bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 rounded font-medium transition-colors disabled:opacity-50"
                          >
                            Confirm
                          </button>
                          <button 
                            onClick={() => openConfirmModal(booking.id, 'cancelled')}
                            disabled={updateStatusMutation.isPending}
                            className="text-xs px-3 py-1.5 bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 rounded font-medium transition-colors disabled:opacity-50"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {booking.status !== 'pending' && (
                         <span className="text-xs text-brown-muted italic">Processed</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal */}
      {modalState.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6">
              <h3 className="text-xl font-display font-bold text-warm-brown mb-2">
                {modalState.action === 'confirmed' ? 'Confirm Booking' : 'Reject Booking'}
              </h3>
              
              {modalState.step === 1 ? (
                <div className="space-y-4 mt-4">
                  <p className="text-brown-muted">
                    {modalState.action === 'confirmed' 
                      ? 'Are you sure you want to approve this booking request? This will notify the guest.'
                      : 'You are about to reject this booking request. Please select a reason below.'}
                  </p>
                  
                  {modalState.action === 'cancelled' && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-warm-brown mb-1">
                        Reason for Rejection <span className="text-red-500">*</span>
                      </label>
                      <select 
                        className="w-full rounded-md border border-gold-light/30 bg-sand/10 px-3 py-2 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold text-warm-brown"
                        value={modalState.reason}
                        onChange={(e) => setModalState(prev => ({ ...prev, reason: e.target.value }))}
                      >
                        <option value="" disabled>Select a reason...</option>
                        {REJECT_REASONS.map((reason, idx) => (
                          <option key={idx} value={reason}>{reason}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {modalState.action === 'confirmed' && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-warm-brown mb-1">
                        Assign Room Number <span className="text-red-500">*</span>
                      </label>
                      <select 
                        className="w-full rounded-md border border-gold-light/30 bg-sand/10 px-3 py-2 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold text-warm-brown"
                        value={modalState.assignedRoom}
                        onChange={(e) => setModalState(prev => ({ ...prev, assignedRoom: e.target.value }))}
                      >
                        <option value="" disabled>Select a room...</option>
                        {DUMMY_ROOMS.map((room) => (
                          <option key={room} value={room}>Room {room}</option>
                        ))}
                      </select>
                      <p className="text-xs text-brown-muted mt-2 italic">
                        * Available rooms are dynamically fetched based on booking dates (placeholder data).
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4 mt-4">
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-amber-800 text-sm font-medium">
                      Final Confirmation Required
                    </p>
                    <p className="text-amber-700 text-xs mt-1">
                      {modalState.action === 'confirmed'
                        ? 'Please confirm once more to finalize this booking. This action cannot be undone.'
                        : 'Please confirm once more to reject this booking. This action cannot be undone.'}
                    </p>
                    {modalState.action === 'cancelled' && modalState.reason && (
                      <p className="text-amber-700 text-xs mt-2 italic">
                        Reason: {modalState.reason}
                      </p>
                    )}
                    {modalState.action === 'confirmed' && modalState.assignedRoom && (
                      <p className="text-amber-700 text-xs mt-2 font-semibold">
                        Assigned Room: {modalState.assignedRoom}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div className="bg-sand/30 px-6 py-4 flex justify-end gap-3 border-t border-gold-light/20">
              <button 
                onClick={closeModal}
                className="px-4 py-2 text-sm font-medium text-brown-muted hover:text-warm-brown transition-colors"
              >
                Cancel
              </button>
              
              {modalState.step === 1 ? (
                <button 
                  onClick={handleNextStep}
                  disabled={(modalState.action === 'cancelled' && !modalState.reason) || (modalState.action === 'confirmed' && !modalState.assignedRoom)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium text-white rounded-md transition-colors",
                    modalState.action === 'confirmed' 
                      ? "bg-green-600 hover:bg-green-700 disabled:bg-green-600/50" 
                      : "bg-red-600 hover:bg-red-700 disabled:bg-red-600/50"
                  )}
                >
                  Proceed
                </button>
              ) : (
                <button 
                  onClick={handleFinalSubmit}
                  disabled={updateStatusMutation.isPending}
                  className={cn(
                    "px-4 py-2 text-sm font-medium text-white rounded-md transition-colors flex items-center gap-2",
                    modalState.action === 'confirmed' 
                      ? "bg-green-600 hover:bg-green-700" 
                      : "bg-red-600 hover:bg-red-700"
                  )}
                >
                  {updateStatusMutation.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                  Yes, {modalState.action === 'confirmed' ? 'Confirm' : 'Reject'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
