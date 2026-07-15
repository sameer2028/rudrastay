"use client";

import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { CalendarCheck, Clock, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function AdminDashboard() {
  // Quick fetch to get bookings for stats
  const { data: bookings, isLoading } = useQuery({
    queryKey: ['admin-bookings-stats'],
    queryFn: async () => {
      const response = await apiClient.get('/bookings/');
      return response.data.data;
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-gold" />
      </div>
    );
  }

  const pendingBookings = bookings?.filter((b: any) => b.status === "pending") || [];
  const confirmedBookings = bookings?.filter((b: any) => b.status === "confirmed") || [];

  return (
    <div className="max-w-5xl">
      <h1 className="font-display text-3xl font-bold text-warm-brown mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gold-light/20 flex items-start gap-4">
          <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6 text-amber-500" />
          </div>
          <div>
            <p className="text-sm text-brown-muted font-medium mb-1">Pending Requests</p>
            <p className="font-display text-3xl font-bold text-warm-brown">{pendingBookings.length}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gold-light/20 flex items-start gap-4">
          <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center shrink-0">
            <CalendarCheck className="w-6 h-6 text-green-500" />
          </div>
          <div>
            <p className="text-sm text-brown-muted font-medium mb-1">Confirmed</p>
            <p className="font-display text-3xl font-bold text-warm-brown">{confirmedBookings.length}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gold-light/20 flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
            <Users className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <p className="text-sm text-brown-muted font-medium mb-1">Total Inquiries</p>
            <p className="font-display text-3xl font-bold text-warm-brown">{bookings?.length || 0}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gold-light/20 overflow-hidden">
        <div className="px-6 py-5 border-b border-gold-light/20 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-warm-brown">Recent Pending Requests</h2>
          <Link href="/admin/bookings" className="text-sm text-gold hover:text-gold-dark font-medium flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="divide-y divide-gold-light/10">
          {pendingBookings.length === 0 ? (
            <div className="p-8 text-center text-brown-muted">
              No pending requests at the moment.
            </div>
          ) : (
            pendingBookings.slice(0, 5).map((booking: any) => (
              <div key={booking.id} className="p-6 flex items-center justify-between hover:bg-sand/30 transition-colors">
                <div>
                  <p className="font-medium text-warm-brown">{booking.guest_name}</p>
                  <p className="text-sm text-brown-muted">{booking.guest_email}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-warm-brown">
                    {new Date(booking.check_in).toLocaleDateString()} - {new Date(booking.check_out).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-brown-muted mt-1">
                    {booking.num_guests} Guest(s)
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
