"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { Loader2, Calendar as CalendarIcon, Users, Phone, Mail, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SchedulePage() {
  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  });
  
  const [endDate, setEndDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    d.setHours(0, 0, 0, 0);
    return d;
  });

  const { data: bookings, isLoading } = useQuery({
    queryKey: ['admin-bookings-confirmed'],
    queryFn: async () => {
      const response = await apiClient.get('/bookings/?status=confirmed');
      return response.data.data;
    }
  });

  // Group bookings by check-in date
  const groupedBookings = () => {
    if (!bookings) return {};
    
    return bookings.reduce((groups: any, booking: any) => {
      const dateStr = new Date(booking.check_in).toDateString();
      if (!groups[dateStr]) {
        groups[dateStr] = [];
      }
      groups[dateStr].push(booking);
      return groups;
    }, {});
  };

  const groups = groupedBookings();

  // Generate all dates in range
  const getDatesInRange = (start: Date, end: Date) => {
    const dates = [];
    let current = new Date(start);
    // limit to max 60 days to prevent infinite loops or massive renders if user selects huge range
    let iterations = 0; 
    while (current <= end && iterations < 60) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
      iterations++;
    }
    return dates;
  };

  const datesToDisplay = getDatesInRange(startDate, endDate);

  const isToday = (dateStr: string) => new Date(dateStr).toDateString() === new Date().toDateString();
  const isTomorrow = (dateStr: string) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return new Date(dateStr).toDateString() === tomorrow.toDateString();
  };

  const formatDateLabel = (dateStr: string) => {
    if (isToday(dateStr)) return "Today";
    if (isTomorrow(dateStr)) return "Tomorrow";
    return new Date(dateStr).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
  };

  const formatDateForInput = (date: Date) => {
    if (isNaN(date.getTime())) return "";
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-warm-brown">Upcoming Arrivals</h1>
          <p className="text-sm text-brown-muted mt-2">Chronological list of all confirmed guest check-ins.</p>
        </div>

        {/* Date Range Selector */}
        <div className="flex items-center gap-3 bg-white p-2 rounded-xl shadow-sm border border-gold-light/20">
          <div className="flex flex-col">
            <label className="text-[10px] uppercase font-bold text-brown-muted px-2 mb-0.5">Start Date</label>
            <input 
              type="date"
              className="text-sm px-3 py-1.5 rounded-md border-0 bg-sand/30 text-warm-brown focus:ring-1 focus:ring-gold outline-none cursor-pointer"
              value={formatDateForInput(startDate)}
              onChange={(e) => {
                if (e.target.value) {
                  const newStart = new Date(e.target.value);
                  newStart.setHours(0,0,0,0);
                  setStartDate(newStart);
                  if (newStart > endDate) setEndDate(newStart);
                }
              }}
            />
          </div>
          <span className="text-gold-light font-bold">-</span>
          <div className="flex flex-col">
            <label className="text-[10px] uppercase font-bold text-brown-muted px-2 mb-0.5">End Date</label>
            <input 
              type="date"
              className="text-sm px-3 py-1.5 rounded-md border-0 bg-sand/30 text-warm-brown focus:ring-1 focus:ring-gold outline-none cursor-pointer"
              value={formatDateForInput(endDate)}
              min={formatDateForInput(startDate)}
              onChange={(e) => {
                if (e.target.value) {
                  const newEnd = new Date(e.target.value);
                  newEnd.setHours(0,0,0,0);
                  setEndDate(newEnd);
                }
              }}
            />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-24">
          <Loader2 className="w-8 h-8 animate-spin text-gold" />
        </div>
      ) : (
        <div className="space-y-10">
          {datesToDisplay.map((dateObj) => {
            const dateStr = dateObj.toDateString();
            const dayBookings = groups[dateStr] || [];

            return (
              <div key={dateStr} className="relative">
                {/* Date Header Marker */}
                <div className="sticky top-20 z-10 bg-sand/95 backdrop-blur-sm py-3 rounded-xl flex items-center gap-4 mb-4 border border-gold-light/30 shadow-sm px-5">
                  <div className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full font-bold",
                    isToday(dateStr) ? "bg-gold text-white" : "bg-white text-warm-brown border border-gold-light/50"
                  )}>
                    {dateObj.getDate()}
                  </div>
                  <h2 className="text-xl font-display font-semibold text-warm-brown">
                    {formatDateLabel(dateStr)}
                  </h2>
                </div>

                {/* Bookings List for that Date */}
                <div className="space-y-5 pl-6 border-l-2 border-gold-light/30 ml-9">
                  {dayBookings.length === 0 ? (
                    <div className="bg-white/50 rounded-xl border border-dashed border-gold-light/40 p-6 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-sand flex items-center justify-center text-brown-muted">
                        <Users className="w-5 h-5 opacity-50" />
                      </div>
                      <div>
                        <p className="font-medium text-warm-brown">No Guests Checking In</p>
                        <p className="text-xs text-brown-muted mt-0.5">There are no arrivals scheduled for this day.</p>
                      </div>
                    </div>
                  ) : (
                    dayBookings.map((booking: any) => (
                      <div key={booking.id} className="bg-white rounded-xl shadow-sm border border-gold-light/20 p-6 hover:shadow-md transition-shadow relative overflow-hidden group">
                        {/* Decorative side accent */}
                        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gold/70 group-hover:bg-gold transition-colors" />
                        
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                          <div className="space-y-4 flex-1">
                            <div>
                              <h3 className="text-2xl font-bold text-warm-brown">{booking.guest_name}</h3>
                              <div className="flex flex-wrap items-center gap-5 mt-2 text-sm text-brown-muted">
                                <span className="flex items-center gap-1.5"><Mail className="w-4 h-4 text-gold" /> {booking.guest_email}</span>
                                <span className="flex items-center gap-1.5"><Phone className="w-4 h-4 text-gold" /> {booking.guest_phone}</span>
                                <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-gold" /> {booking.num_guests} Guests</span>
                              </div>
                            </div>

                            <div className="bg-sand/30 rounded-lg p-4 border border-gold-light/10 inline-block">
                              <div className="flex items-center gap-6">
                                <div>
                                  <p className="text-[11px] text-brown-muted font-bold uppercase tracking-wider mb-1">Check-in</p>
                                  <p className="font-medium text-warm-brown flex items-center gap-2">
                                    {new Date(booking.check_in).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                                    <Clock className="w-3 h-3 text-gold" />
                                  </p>
                                </div>
                                <div className="h-8 w-px bg-gold-light/30"></div>
                                <div>
                                  <p className="text-[11px] text-brown-muted font-bold uppercase tracking-wider mb-1">Check-out</p>
                                  <p className="font-medium text-warm-brown">
                                    {new Date(booking.check_out).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                                  </p>
                                </div>
                              </div>
                            </div>
                            
                            {booking.special_requests && (
                              <div className="text-sm bg-amber-50/50 p-3 rounded border border-amber-100 text-amber-800 flex flex-col">
                                <span className="font-semibold mb-0.5">Special Requests:</span>
                                {booking.special_requests}
                              </div>
                            )}
                          </div>
                          
                          {/* Room Assignment Box */}
                          <div className="bg-sand/50 px-8 py-6 rounded-xl border border-gold-light/20 text-center min-w-[160px] shrink-0 self-stretch flex flex-col justify-center">
                            <p className="text-[11px] text-brown-muted font-bold uppercase tracking-widest mb-2">Room Assigned</p>
                            <p className="text-3xl font-display font-bold text-warm-brown">
                              {booking.assigned_room_number || "TBD"}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
