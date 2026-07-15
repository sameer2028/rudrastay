"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { Loader2, Plus, Trash2, Map, CheckCircle, XCircle, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminBudgetTripsPage() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price_estimate: 0,
    images: [] as string[],
    highlights: [] as string[],
    is_featured: false
  });

  const [tempImage, setTempImage] = useState("");
  const [tempHighlight, setTempHighlight] = useState("");

  const { data: trips, isLoading } = useQuery({
    queryKey: ['admin-budget-trips'],
    queryFn: async () => {
      const response = await apiClient.get('/budget-trips/');
      return response.data.data;
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiClient.post('/budget-trips/', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-budget-trips'] });
      closeModal();
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string, data: any }) => {
      const response = await apiClient.put(`/budget-trips/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-budget-trips'] });
      closeModal();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/budget-trips/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-budget-trips'] });
    }
  });

  // Note: our backend for budget-trips doesn't have a PATCH for just is_featured. We use PUT to update the whole object,
  // or we need to send all required fields. Let's send the full trip object minus id/slug as update data.
  const handleToggleFeatured = (trip: any) => {
    const updateData = {
      name: trip.name,
      category: trip.category,
      description: trip.description,
      price_estimate: trip.price_estimate,
      images: trip.images,
      highlights: trip.highlights,
      is_featured: !trip.is_featured
    };
    updateMutation.mutate({ id: trip.id, data: updateData });
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({ name: "", category: "", description: "", price_estimate: 0, images: [], highlights: [], is_featured: false });
    setIsModalOpen(true);
  };

  const openEditModal = (trip: any) => {
    setEditingId(trip.id);
    setFormData({
      name: trip.name,
      category: trip.category,
      description: trip.description,
      price_estimate: Number(trip.price_estimate),
      images: trip.images || [],
      highlights: trip.highlights || [],
      is_featured: trip.is_featured
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setTempImage("");
    setTempHighlight("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateMutation.mutate({ id: editingId, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this trip?")) {
      deleteMutation.mutate(id);
    }
  };

  const addImage = () => {
    if (tempImage && !formData.images.includes(tempImage)) {
      setFormData({ ...formData, images: [...formData.images, tempImage] });
      setTempImage("");
    }
  };

  const removeImage = (url: string) => {
    setFormData({ ...formData, images: formData.images.filter(i => i !== url) });
  };

  const addHighlight = () => {
    if (tempHighlight && !formData.highlights.includes(tempHighlight)) {
      setFormData({ ...formData, highlights: [...formData.highlights, tempHighlight] });
      setTempHighlight("");
    }
  };

  const removeHighlight = (h: string) => {
    setFormData({ ...formData, highlights: formData.highlights.filter(i => i !== h) });
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-warm-brown">Budget Trips Management</h1>
          <p className="text-sm text-brown-muted mt-2">Manage curated budget-friendly travel packages.</p>
        </div>
        
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-gold text-white px-4 py-2 rounded-lg font-medium hover:bg-gold-light transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Trip
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gold-light/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-sand/30 border-b border-gold-light/20 text-xs uppercase tracking-wider text-brown-muted font-semibold">
                <th className="px-6 py-4">Trip Details</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4 text-right">Est. Price</th>
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
              ) : !trips || trips.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-brown-muted">
                    No budget trips found.
                  </td>
                </tr>
              ) : (
                trips.map((trip: any) => (
                  <tr key={trip.id} className="hover:bg-sand/10 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-warm-brown">{trip.name}</div>
                      <div className="text-xs text-brown-muted line-clamp-1 max-w-md">{trip.description}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-sand-dark text-warm-brown text-[10px] uppercase font-bold px-2 py-1 rounded">
                        {trip.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-warm-brown">
                      ${Number(trip.price_estimate).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => handleToggleFeatured(trip)}
                        disabled={updateMutation.isPending}
                        className={cn(
                          "inline-flex items-center justify-center p-1.5 rounded-full transition-colors",
                          trip.is_featured ? "text-green-600 bg-green-50 hover:bg-green-100" : "text-gray-400 bg-gray-50 hover:bg-gray-100"
                        )}
                      >
                        {trip.is_featured ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                      <button 
                        onClick={() => openEditModal(trip)}
                        className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-md transition-colors inline-block"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(trip.id)}
                        disabled={deleteMutation.isPending}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors inline-block"
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

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl border border-gold-light/20 my-8">
            <div className="px-6 py-4 border-b border-gold-light/10 bg-sand/30 flex justify-between items-center sticky top-0 z-10">
              <h3 className="font-display font-semibold text-lg text-warm-brown">
                {editingId ? "Edit Budget Trip" : "Add New Trip"}
              </h3>
              <button onClick={closeModal} className="text-brown-muted hover:text-warm-brown text-2xl leading-none">&times;</button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-warm-brown mb-1">Trip Name</label>
                  <input type="text" className="w-full rounded-lg border-gold-light/30 focus:border-gold focus:ring-gold" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-warm-brown mb-1">Category</label>
                  <input type="text" className="w-full rounded-lg border-gold-light/30 focus:border-gold focus:ring-gold" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} required />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-warm-brown mb-1">Description</label>
                <textarea rows={3} className="w-full rounded-lg border-gold-light/30 focus:border-gold focus:ring-gold" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required />
              </div>

              <div>
                <label className="block text-sm font-medium text-warm-brown mb-1">Price Estimate ($)</label>
                <input type="number" min="0" step="0.01" className="w-full rounded-lg border-gold-light/30 focus:border-gold focus:ring-gold" value={formData.price_estimate} onChange={e => setFormData({...formData, price_estimate: parseFloat(e.target.value) || 0})} required />
              </div>

              <div>
                <label className="block text-sm font-medium text-warm-brown mb-1">Images (URLs)</label>
                <div className="flex gap-2 mb-2">
                  <input type="url" placeholder="https://example.com/img.jpg" className="flex-1 rounded-lg border-gold-light/30 text-sm focus:border-gold focus:ring-gold" value={tempImage} onChange={e => setTempImage(e.target.value)} />
                  <button type="button" onClick={addImage} className="px-3 py-1 bg-sand-dark text-warm-brown rounded-lg text-sm font-medium hover:bg-gold-light/20">Add</button>
                </div>
                <ul className="space-y-1">
                  {formData.images.map((img, idx) => (
                    <li key={idx} className="flex justify-between items-center text-xs bg-gray-50 p-2 rounded border border-gray-200">
                      <span className="truncate flex-1 mr-2">{img}</span>
                      <button type="button" onClick={() => removeImage(img)} className="text-red-500 hover:text-red-700"><Trash2 className="w-3 h-3" /></button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <label className="block text-sm font-medium text-warm-brown mb-1">Highlights</label>
                <div className="flex gap-2 mb-2">
                  <input type="text" placeholder="e.g. Guided tour included" className="flex-1 rounded-lg border-gold-light/30 text-sm focus:border-gold focus:ring-gold" value={tempHighlight} onChange={e => setTempHighlight(e.target.value)} />
                  <button type="button" onClick={addHighlight} className="px-3 py-1 bg-sand-dark text-warm-brown rounded-lg text-sm font-medium hover:bg-gold-light/20">Add</button>
                </div>
                <ul className="space-y-1">
                  {formData.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex justify-between items-center text-xs bg-amber-50 text-amber-800 p-2 rounded border border-amber-200">
                      <span>{highlight}</span>
                      <button type="button" onClick={() => removeHighlight(highlight)} className="text-red-500 hover:text-red-700"><Trash2 className="w-3 h-3" /></button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-gold-light/20">
                <input type="checkbox" id="is_featured" className="rounded text-gold focus:ring-gold border-gold-light/30" checked={formData.is_featured} onChange={e => setFormData({...formData, is_featured: e.target.checked})} />
                <label htmlFor="is_featured" className="text-sm font-medium text-warm-brown">Feature on homepage</label>
              </div>

              <div className="pt-4 flex gap-3 sticky bottom-0 bg-white border-t border-gold-light/10 mt-6 -mx-6 px-6 py-4">
                <button type="button" onClick={closeModal} className="flex-1 px-4 py-2 text-sm font-medium text-brown-muted bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">Cancel</button>
                <button type="submit" disabled={createMutation.isPending || updateMutation.isPending} className="flex-1 px-4 py-2 text-sm font-medium text-white bg-gold hover:bg-gold-light rounded-lg transition-colors flex justify-center items-center gap-2">
                  {(createMutation.isPending || updateMutation.isPending) && <Loader2 className="w-4 h-4 animate-spin" />}
                  {editingId ? "Save Changes" : "Create Trip"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
