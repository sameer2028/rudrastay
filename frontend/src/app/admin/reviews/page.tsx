"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { Loader2, Star, Trash2, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminReviewsPage() {
  const queryClient = useQueryClient();

  const { data: reviews, isLoading } = useQuery({
    queryKey: ['admin-reviews'],
    queryFn: async () => {
      const response = await apiClient.get('/reviews/');
      return response.data.data;
    }
  });

  const toggleFeaturedMutation = useMutation({
    mutationFn: async ({ id, is_featured }: { id: string; is_featured: boolean }) => {
      const response = await apiClient.patch(`/reviews/${id}`, { is_featured });
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-reviews'] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/reviews/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-reviews'] });
    }
  });

  const handleToggleFeatured = (id: string, currentStatus: boolean) => {
    toggleFeaturedMutation.mutate({ id, is_featured: !currentStatus });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this review? This action cannot be undone.")) {
      deleteMutation.mutate(id);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star 
            key={star} 
            className={cn("w-4 h-4", star <= rating ? "fill-gold text-gold" : "text-gray-300")} 
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-warm-brown">Reviews Moderation</h1>
        <p className="text-sm text-brown-muted mt-2">Manage guest reviews and feature them on the website.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gold-light/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-sand/30 border-b border-gold-light/20 text-xs uppercase tracking-wider text-brown-muted font-semibold">
                <th className="px-6 py-4 w-1/4">Guest</th>
                <th className="px-6 py-4 w-[120px]">Rating</th>
                <th className="px-6 py-4 w-1/2">Review Content</th>
                <th className="px-6 py-4 text-center">Featured</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold-light/10 text-sm">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <Loader2 className="w-6 h-6 animate-spin text-gold mx-auto" />
                  </td>
                </tr>
              ) : !reviews || reviews.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-brown-muted">
                    No reviews found.
                  </td>
                </tr>
              ) : (
                reviews.map((review: any) => (
                  <tr key={review.id} className="hover:bg-sand/10 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-warm-brown">{review.guest_name}</div>
                      {review.guest_location && (
                        <div className="text-xs text-brown-muted">{review.guest_location}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {renderStars(review.rating)}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-brown-muted text-sm line-clamp-3" title={review.content}>
                        {review.content}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => handleToggleFeatured(review.id, review.is_featured)}
                        disabled={toggleFeaturedMutation.isPending}
                        className={cn(
                          "inline-flex items-center justify-center p-1.5 rounded-full transition-colors",
                          review.is_featured ? "text-green-600 bg-green-50 hover:bg-green-100 border border-green-200" : "text-gray-400 bg-gray-50 hover:bg-gray-200 border border-gray-200"
                        )}
                        title={review.is_featured ? "Unfeature" : "Feature on homepage"}
                      >
                        {review.is_featured ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleDelete(review.id)}
                        disabled={deleteMutation.isPending}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                        title="Delete Review"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
