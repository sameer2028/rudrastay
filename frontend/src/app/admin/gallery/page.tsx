"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { Loader2, Plus, Trash2, Image as ImageIcon, Video, UploadCloud, Edit2 } from "lucide-react";
import { useUpload } from "@/hooks/useUpload";

export default function AdminGalleryPage() {
  const queryClient = useQueryClient();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingMedia, setEditingMedia] = useState<any>(null);
  const [newMedia, setNewMedia] = useState({
    type: "photo",
    url: "",
    caption: "",
    sort_order: 0
  });

  const { uploadMedia, isUploading, progress } = useUpload({
    onSuccess: (url) => setNewMedia(prev => ({ ...prev, url })),
    onError: (err) => alert(`Upload failed: ${err}`)
  });

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const uploadType = newMedia.type === 'photo' ? 'image' : 'video';
      await uploadMedia(e.target.files[0], uploadType);
    }
  };

  const { data: gallery, isLoading } = useQuery({
    queryKey: ['admin-gallery'],
    queryFn: async () => {
      const response = await apiClient.get('/gallery/');
      return response.data.data;
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof newMedia) => {
      const response = await apiClient.post('/gallery/', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-gallery'] });
      setIsAddModalOpen(false);
      setNewMedia({ type: "photo", url: "", caption: "", sort_order: 0 });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async (data: { id: string, caption: string, sort_order: number }) => {
      const response = await apiClient.patch(`/gallery/${data.id}`, {
        caption: data.caption,
        sort_order: data.sort_order
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-gallery'] });
      setEditingMedia(null);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/gallery/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-gallery'] });
    }
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(newMedia);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate({
      id: editingMedia.id,
      caption: editingMedia.caption,
      sort_order: editingMedia.sort_order
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this media?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-warm-brown">Gallery Management</h1>
          <p className="text-sm text-brown-muted mt-2">Manage photos and videos displayed in the public gallery.</p>
        </div>
        
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-gold text-white px-4 py-2 rounded-lg font-medium hover:bg-gold-light transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Media
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-24">
          <Loader2 className="w-8 h-8 animate-spin text-gold" />
        </div>
      ) : !gallery || gallery.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gold-light/20 p-12 text-center">
          <ImageIcon className="w-12 h-12 text-gold/50 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-warm-brown">No Media Found</h3>
          <p className="text-sm text-brown-muted mt-1">Your gallery is empty. Add some photos or videos!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {gallery.sort((a: any, b: any) => a.sort_order - b.sort_order).map((item: any) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gold-light/20 overflow-hidden group">
              <div className="relative aspect-video bg-sand">
                {item.type === 'photo' ? (
                  <img src={item.url} alt={item.caption || "Gallery image"} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-sand-dark text-brown-muted">
                    <Video className="w-8 h-8" />
                  </div>
                )}
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur rounded p-1 shadow-sm flex gap-2">
                  <button 
                    onClick={() => setEditingMedia(item)}
                    className="p-1.5 text-warm-brown hover:bg-sand rounded transition-colors"
                    title="Edit Caption"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    disabled={deleteMutation.isPending}
                    className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors"
                    title="Delete Media"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="absolute top-2 left-2 bg-black/60 backdrop-blur text-white text-[10px] uppercase font-bold px-2 py-1 rounded">
                  {item.type}
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-warm-brown font-medium line-clamp-2">
                  {item.caption || <span className="italic text-gray-400">No caption</span>}
                </p>
                <div className="mt-2 text-xs text-brown-muted font-mono">
                  Order: {item.sort_order}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Media Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border border-gold-light/20">
            <div className="px-6 py-4 border-b border-gold-light/10 bg-sand/30 flex justify-between items-center">
              <h3 className="font-display font-semibold text-lg text-warm-brown">Add New Media</h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-brown-muted hover:text-warm-brown text-2xl leading-none"
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={handleAddSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-warm-brown mb-1">Type</label>
                <select 
                  className="w-full rounded-lg border-gold-light/30 focus:border-gold focus:ring-gold"
                  value={newMedia.type}
                  onChange={e => setNewMedia({...newMedia, type: e.target.value})}
                  required
                >
                  <option value="photo">Photo</option>
                  <option value="video">Video</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-warm-brown mb-1">Media URL</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input 
                      type="url" 
                      placeholder="https://example.com/image.jpg"
                      className="w-full rounded-lg border-gold-light/30 focus:border-gold focus:ring-gold pr-10"
                      value={newMedia.url}
                      onChange={e => setNewMedia({...newMedia, url: e.target.value})}
                      required
                    />
                  </div>
                  <div className="relative">
                    <input 
                      type="file" 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleFileSelect}
                      accept={newMedia.type === 'photo' ? "image/*" : "video/*"}
                      disabled={isUploading}
                    />
                    <button type="button" className="h-full px-4 bg-sand/50 text-warm-brown hover:bg-sand rounded-lg border border-gold-light/30 flex items-center gap-2 transition-colors">
                      {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
                      <span className="text-sm font-medium">{isUploading ? `Uploading ${progress}%` : 'Upload File'}</span>
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-warm-brown mb-1">Caption</label>
                <textarea 
                  rows={2}
                  className="w-full rounded-lg border-gold-light/30 focus:border-gold focus:ring-gold"
                  value={newMedia.caption}
                  onChange={e => setNewMedia({...newMedia, caption: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-warm-brown mb-1">Sort Order (Optional)</label>
                <input 
                  type="number" 
                  className="w-full rounded-lg border-gold-light/30 focus:border-gold focus:ring-gold"
                  value={newMedia.sort_order}
                  onChange={e => setNewMedia({...newMedia, sort_order: parseInt(e.target.value) || 0})}
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 px-4 py-2 text-sm font-medium text-brown-muted bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={createMutation.isPending}
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-gold hover:bg-gold-light rounded-lg transition-colors flex justify-center items-center gap-2"
                >
                  {createMutation.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                  Save Media
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Media Modal */}
      {editingMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border border-gold-light/20">
            <div className="px-6 py-4 border-b border-gold-light/10 bg-sand/30 flex justify-between items-center">
              <h3 className="font-display font-semibold text-lg text-warm-brown">Edit Caption</h3>
              <button 
                onClick={() => setEditingMedia(null)}
                className="text-brown-muted hover:text-warm-brown text-2xl leading-none"
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-warm-brown mb-1">Caption</label>
                <textarea 
                  rows={3}
                  className="w-full rounded-lg border-gold-light/30 focus:border-gold focus:ring-gold"
                  value={editingMedia.caption || ""}
                  onChange={e => setEditingMedia({...editingMedia, caption: e.target.value})}
                  placeholder="Enter a nice caption..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-warm-brown mb-1">Sort Order (Optional)</label>
                <input 
                  type="number" 
                  className="w-full rounded-lg border-gold-light/30 focus:border-gold focus:ring-gold"
                  value={editingMedia.sort_order}
                  onChange={e => setEditingMedia({...editingMedia, sort_order: parseInt(e.target.value) || 0})}
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setEditingMedia(null)}
                  className="flex-1 px-4 py-2 text-sm font-medium text-brown-muted bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={updateMutation.isPending}
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-gold hover:bg-gold-light rounded-lg transition-colors flex justify-center items-center gap-2"
                >
                  {updateMutation.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
