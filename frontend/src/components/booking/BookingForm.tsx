"use client";

import { useState } from "react";
import { formatPrice } from "@/lib/utils";
import { useCreateBooking, BookingCreate } from "@/hooks/useBookings";
import { Loader2, ArrowRight, CheckCircle, Calendar, Users, User, Mail, Phone, MessageSquare } from "lucide-react";

interface BookingFormProps {
  itemId: string;
  itemName: string;
  price: number;
  itemType: "room" | "package" | "budget_trip";
}

export default function BookingForm({ itemId, itemName, price, itemType }: BookingFormProps) {
  const [formData, setFormData] = useState({
    guest_name: "",
    guest_email: "",
    guest_phone: "",
    check_in: "",
    check_out: "",
    num_guests: 1 as number | "",
    special_requests: "",
  });
  const [formError, setFormError] = useState<string | null>(null);

  const { mutate: submitBooking, isPending, isSuccess } = useCreateBooking();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "num_guests" ? (value === "" ? "" : parseInt(value)) : value,
    }));
    setFormError(null);
  };

  const calculateTotal = () => {
    if (itemType === "room") {
      if (!formData.check_in || !formData.check_out) return 0;
      const start = new Date(formData.check_in);
      const end = new Date(formData.check_out);
      const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      return nights > 0 ? nights * price : 0;
    } else {
      // For packages and budget trips, price is per guest
      return (formData.num_guests || 0) * price;
    }
  };

  const validateForm = () => {
    if (!formData.guest_name || !formData.guest_email || !formData.guest_phone || !formData.check_in || !formData.check_out) {
      return "Please fill in all required fields.";
    }
    const checkInDate = new Date(formData.check_in);
    const checkOutDate = new Date(formData.check_out);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkInDate < today) {
      return "Check-in date cannot be in the past.";
    }
    if (checkOutDate <= checkInDate) {
      return "Check-out date must be after check-in date.";
    }
    if (formData.num_guests === "" || formData.num_guests < 1) {
      return "Number of guests must be at least 1.";
    }
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      setFormError(error);
      return;
    }

    const payload: BookingCreate & { [key: string]: any } = {
      ...formData,
      num_guests: typeof formData.num_guests === "number" ? formData.num_guests : 1,
      item_name: itemName,
    };
    
    if (itemType === "room") payload.room_id = itemId;
    else if (itemType === "package") payload.package_id = itemId;
    else if (itemType === "budget_trip") payload.budget_trip_id = itemId;

    submitBooking(payload, {
      onError: (err: any) => {
        setFormError(err.response?.data?.message || "Failed to submit booking request. Please try again.");
      }
    });
  };

  if (isSuccess) {
    return (
      <div className="bg-cream rounded-xl p-8 shadow-lg border border-gold-light/30 text-center">
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-success" />
        </div>
        <h3 className="font-display text-2xl font-bold text-warm-brown mb-2">Request Sent!</h3>
        <p className="text-sm text-brown-light mb-6">
          Thank you for choosing Rudra Stay. Your booking request for the <span className="font-semibold text-warm-brown">{itemName}</span> has been sent to our team. We will review your dates and get back to you shortly to confirm your reservation.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="btn-secondary text-sm"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  const total = calculateTotal();

  return (
    <div className="sticky top-28 bg-cream rounded-xl p-6 sm:p-8 shadow-lg border border-gold-light/30">
      <div className="mb-6 pb-6 border-b border-gold-light/30">
        <span className="text-sm text-brown-light">Starting from</span>
        <div className="flex items-baseline gap-1 mt-1">
          <span className="font-price text-3xl font-bold text-warm-brown">
            {formatPrice(price)}
          </span>
          <span className="text-sm text-brown-muted">
            {itemType === "room" ? "/night" : "/guest"}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {formError && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg text-center">
            {formError}
          </div>
        )}

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-warm-brown uppercase tracking-wider mb-2">Check-in *</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brown-muted" />
              <input
                type="date"
                name="check_in"
                required
                value={formData.check_in}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full pl-9 pr-3 py-2.5 bg-white border border-gold-light/30 rounded-lg text-sm focus:outline-none focus:border-gold transition-colors text-warm-brown"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-warm-brown uppercase tracking-wider mb-2">Check-out *</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brown-muted" />
              <input
                type="date"
                name="check_out"
                required
                value={formData.check_out}
                onChange={handleInputChange}
                min={formData.check_in || new Date().toISOString().split('T')[0]}
                className="w-full pl-9 pr-3 py-2.5 bg-white border border-gold-light/30 rounded-lg text-sm focus:outline-none focus:border-gold transition-colors text-warm-brown"
              />
            </div>
          </div>
        </div>

        {/* Guests */}
        <div>
          <label className="block text-xs font-semibold text-warm-brown uppercase tracking-wider mb-2">Guests *</label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brown-muted" />
            <input
              type="number"
              name="num_guests"
              min="1"
              required
              value={formData.num_guests}
              onChange={handleInputChange}
              className="w-full pl-9 pr-3 py-2.5 bg-white border border-gold-light/30 rounded-lg text-sm focus:outline-none focus:border-gold transition-colors text-warm-brown"
            />
          </div>
        </div>

        {/* Personal Details */}
        <div className="pt-4 mt-4 border-t border-gold-light/20 space-y-4">
          <div>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brown-muted" />
              <input
                type="text"
                name="guest_name"
                placeholder="Full Name *"
                required
                value={formData.guest_name}
                onChange={handleInputChange}
                className="w-full pl-9 pr-3 py-2.5 bg-white border border-gold-light/30 rounded-lg text-sm focus:outline-none focus:border-gold transition-colors text-warm-brown placeholder:text-brown-muted/70"
              />
            </div>
          </div>
          <div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brown-muted" />
              <input
                type="email"
                name="guest_email"
                placeholder="Email Address *"
                required
                value={formData.guest_email}
                onChange={handleInputChange}
                className="w-full pl-9 pr-3 py-2.5 bg-white border border-gold-light/30 rounded-lg text-sm focus:outline-none focus:border-gold transition-colors text-warm-brown placeholder:text-brown-muted/70"
              />
            </div>
          </div>
          <div>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brown-muted" />
              <input
                type="tel"
                name="guest_phone"
                placeholder="Phone Number *"
                required
                value={formData.guest_phone}
                onChange={handleInputChange}
                className="w-full pl-9 pr-3 py-2.5 bg-white border border-gold-light/30 rounded-lg text-sm focus:outline-none focus:border-gold transition-colors text-warm-brown placeholder:text-brown-muted/70"
              />
            </div>
          </div>
          <div>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-brown-muted" />
              <textarea
                name="special_requests"
                placeholder="Any special requests? (Optional)"
                rows={2}
                value={formData.special_requests}
                onChange={handleInputChange}
                className="w-full pl-9 pr-3 py-2.5 bg-white border border-gold-light/30 rounded-lg text-sm focus:outline-none focus:border-gold transition-colors text-warm-brown placeholder:text-brown-muted/70 resize-none"
              />
            </div>
          </div>
        </div>

        {/* Total Price Display */}
        {total > 0 && (
          <div className="flex justify-between items-center pt-4 border-t border-gold-light/30">
            <span className="text-sm font-semibold text-warm-brown">Estimated Total</span>
            <span className="font-price text-xl font-bold text-gold">{formatPrice(total)}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="btn-primary w-full text-center justify-center text-sm mt-6"
        >
          {isPending ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              Send Booking Request <ArrowRight className="w-4 h-4 ml-1" />
            </>
          )}
        </button>

        <div className="mt-4 text-center">
          <p className="text-xs text-brown-muted">
            No payment required at this stage. We will contact you to confirm details.
          </p>
        </div>
      </form>
    </div>
  );
}
