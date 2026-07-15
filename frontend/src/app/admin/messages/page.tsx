"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { Loader2, Mail, Phone, Clock, Trash2, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminMessagesPage() {
  const queryClient = useQueryClient();

  const { data: messages, isLoading } = useQuery({
    queryKey: ['admin-messages'],
    queryFn: async () => {
      const response = await apiClient.get('/contact/');
      return response.data.data;
    }
  });

  const toggleResolvedMutation = useMutation({
    mutationFn: async ({ id, is_resolved }: { id: string; is_resolved: boolean }) => {
      // Assuming patch for contact messages. Let's send a full PUT if patch is not supported by standard CRUD template. 
      // I will send a PUT with all fields if PATCH fails, but standard FastAPI routes often have partial update or full update.
      const response = await apiClient.patch(`/contact/${id}`, { is_resolved });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-messages'] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/contact/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-messages'] });
    }
  });

  const handleToggleResolved = (id: string, currentStatus: boolean) => {
    toggleResolvedMutation.mutate({ id, is_resolved: !currentStatus });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this message?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-warm-brown">Contact Messages Inbox</h1>
        <p className="text-sm text-brown-muted mt-2">Manage and reply to inquiries from the public website.</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-24">
          <Loader2 className="w-8 h-8 animate-spin text-gold" />
        </div>
      ) : !messages || messages.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gold-light/20 p-12 text-center">
          <Mail className="w-12 h-12 text-gold/50 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-warm-brown">No Messages Found</h3>
          <p className="text-sm text-brown-muted mt-1">Your inbox is empty!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((message: any) => (
            <div 
              key={message.id} 
              className={cn(
                "bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow relative overflow-hidden",
                message.is_resolved ? "border-gold-light/20 opacity-75" : "border-gold-light/60"
              )}
            >
              {/* Left Accent line for unread/unresolved */}
              {!message.is_resolved && (
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gold" />
              )}
              
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-warm-brown">{message.name}</h3>
                      <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-brown-muted">
                        <span className="flex items-center gap-1.5">
                          <Mail className="w-4 h-4 text-gold" /> 
                          <a href={`mailto:${message.email}`} className="hover:underline">{message.email}</a>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Phone className="w-4 h-4 text-gold" /> 
                          <a href={`tel:${message.phone}`} className="hover:underline">{message.phone}</a>
                        </span>
                        <span className="flex items-center gap-1.5 text-xs">
                          <Clock className="w-3 h-3" /> 
                          {new Date(message.created_at).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-sand/30 rounded-lg p-4 text-brown-muted text-sm whitespace-pre-wrap border border-gold-light/10">
                    {message.message}
                  </div>
                </div>

                <div className="flex md:flex-col justify-end gap-3 shrink-0 md:w-[200px]">
                  <button 
                    onClick={() => handleToggleResolved(message.id, message.is_resolved)}
                    disabled={toggleResolvedMutation.isPending}
                    className={cn(
                      "flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full",
                      message.is_resolved 
                        ? "bg-gray-100 text-gray-600 hover:bg-gray-200" 
                        : "bg-green-50 text-green-700 hover:bg-green-100 border border-green-200"
                    )}
                  >
                    {message.is_resolved ? (
                      <><XCircle className="w-4 h-4" /> Mark Unresolved</>
                    ) : (
                      <><CheckCircle className="w-4 h-4" /> Mark Resolved</>
                    )}
                  </button>
                  <button 
                    onClick={() => handleDelete(message.id)}
                    disabled={deleteMutation.isPending}
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 transition-colors w-full"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
