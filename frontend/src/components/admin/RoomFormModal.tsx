"use client";

import { useState, useEffect } from "react";
import { X, Loader2, Plus, Trash2, UploadCloud } from "lucide-react";
import { useCreateRoom, useUpdateRoom, Room } from "@/hooks/useRooms";
import { useUpload } from "@/hooks/useUpload";

interface RoomFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Room | null;
}

export default function RoomFormModal({ isOpen, onClose, initialData }: RoomFormModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    capacity: 2,
    price_per_night: 0,
    is_available: true,
    is_featured: false,
    amenities: [""],
    images: [""],
    videos: [""],
    sort_order: 0,
  });

  const createMutation = useCreateRoom();
  const updateMutation = useUpdateRoom();
  const { uploadMedia, isUploading: isUploadingMedia } = useUpload();

  const isEditing = !!initialData;
  const isPending = createMutation.isPending || updateMutation.isPending || isUploadingMedia;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number, field: 'images' | 'videos', type: 'image' | 'video') => {
    if (e.target.files && e.target.files[0]) {
      try {
        const url = await uploadMedia(e.target.files[0], type);
        handleArrayChange(index, field, url);
      } catch (err: any) {
        alert(err.message || "Upload failed");
      }
    }
  };

  useEffect(() => {
    if (initialData && isOpen) {
      setFormData({
        name: initialData.name,
        description: initialData.description,
        capacity: initialData.capacity,
        price_per_night: initialData.price_per_night,
        is_available: initialData.is_available,
        is_featured: initialData.is_featured,
        amenities: initialData.amenities?.length ? initialData.amenities : [""],
        images: initialData.images?.length ? initialData.images : [""],
        videos: initialData.videos?.length ? initialData.videos : [""],
        sort_order: 0, // Not exposed in list usually, but required by schema
      });
    } else if (isOpen) {
      // Reset form on open if not editing
      setFormData({
        name: "",
        description: "",
        capacity: 2,
        price_per_night: 0,
        is_available: true,
        is_featured: false,
        amenities: [""],
        images: [""],
        videos: [""],
        sort_order: 0,
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: value === '' ? '' : Number(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleArrayChange = (index: number, field: 'amenities' | 'images' | 'videos', value: string) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const addArrayItem = (field: 'amenities' | 'images' | 'videos') => {
    setFormData(prev => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeArrayItem = (index: number, field: 'amenities' | 'images' | 'videos') => {
    setFormData(prev => ({ 
      ...prev, 
      [field]: prev[field].filter((_, i) => i !== index) 
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clean arrays (remove empty strings)
    const cleanedData = {
      ...formData,
      amenities: formData.amenities.filter(a => a.trim() !== ""),
      images: formData.images.filter(img => img.trim() !== ""),
      videos: formData.videos.filter(v => v.trim() !== ""),
    };

    if (isEditing && initialData) {
      updateMutation.mutate({ id: initialData.id, data: cleanedData }, {
        onSuccess: () => onClose()
      });
    } else {
      createMutation.mutate(cleanedData, {
        onSuccess: () => onClose()
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col my-8">
        <div className="flex items-center justify-between p-6 border-b border-gold-light/20">
          <h2 className="font-display text-2xl font-bold text-warm-brown">
            {isEditing ? 'Edit Room' : 'Add New Room'}
          </h2>
          <button onClick={onClose} className="p-2 text-brown-muted hover:text-warm-brown transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <form id="room-form" onSubmit={handleSubmit} className="space-y-6">
            
            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-warm-brown uppercase tracking-wider mb-2">Room Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-sand/30 border border-gold-light/30 rounded-lg text-sm focus:outline-none focus:border-gold transition-colors text-warm-brown"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-warm-brown uppercase tracking-wider mb-2">Price per Night (₹)</label>
                <input
                  type="number"
                  name="price_per_night"
                  required
                  min="0"
                  value={formData.price_per_night}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-sand/30 border border-gold-light/30 rounded-lg text-sm focus:outline-none focus:border-gold transition-colors text-warm-brown"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-warm-brown uppercase tracking-wider mb-2">Capacity (Guests)</label>
                <input
                  type="number"
                  name="capacity"
                  required
                  min="1"
                  value={formData.capacity}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-sand/30 border border-gold-light/30 rounded-lg text-sm focus:outline-none focus:border-gold transition-colors text-warm-brown"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-xs font-semibold text-warm-brown uppercase tracking-wider mb-2">Description</label>
                <textarea
                  name="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-sand/30 border border-gold-light/30 rounded-lg text-sm focus:outline-none focus:border-gold transition-colors text-warm-brown resize-none"
                />
              </div>
            </div>

            {/* Toggles */}
            <div className="flex items-center gap-8 py-4 border-y border-gold-light/20">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="is_available"
                  checked={formData.is_available}
                  onChange={handleChange}
                  className="w-4 h-4 text-gold rounded border-gold-light/30 focus:ring-gold"
                />
                <span className="text-sm font-medium text-warm-brown">Available for Booking</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="is_featured"
                  checked={formData.is_featured}
                  onChange={handleChange}
                  className="w-4 h-4 text-gold rounded border-gold-light/30 focus:ring-gold"
                />
                <span className="text-sm font-medium text-warm-brown">Featured on Home Page</span>
              </label>
            </div>

            {/* Arrays: Images, Amenities */}
            <div className="space-y-6">
              {/* Images */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-semibold text-warm-brown uppercase tracking-wider">Image URLs</label>
                  <button type="button" onClick={() => addArrayItem('images')} className="text-xs text-gold hover:text-gold-dark font-medium flex items-center gap-1">
                    <Plus className="w-3 h-3" /> Add Image
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.images.map((img, index) => (
                    <div key={index} className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          placeholder="https://... or /images/..."
                          value={img}
                          onChange={(e) => handleArrayChange(index, 'images', e.target.value)}
                          className="w-full px-4 py-2 bg-sand/30 border border-gold-light/30 rounded-lg text-sm focus:outline-none focus:border-gold transition-colors text-warm-brown pr-10"
                        />
                      </div>
                      <div className="relative">
                        <input 
                          type="file" 
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={(e) => handleFileUpload(e, index, 'images', 'image')}
                          accept="image/*"
                          disabled={isUploadingMedia}
                        />
                        <button type="button" className="h-full px-3 bg-sand/50 text-warm-brown hover:bg-sand rounded-lg border border-gold-light/30 flex items-center justify-center transition-colors" title="Upload Image">
                          <UploadCloud className="w-4 h-4" />
                        </button>
                      </div>
                      <button type="button" onClick={() => removeArrayItem(index, 'images')} className="p-2 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Videos */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-semibold text-warm-brown uppercase tracking-wider">Video URLs</label>
                  <button type="button" onClick={() => addArrayItem('videos')} className="text-xs text-gold hover:text-gold-dark font-medium flex items-center gap-1">
                    <Plus className="w-3 h-3" /> Add Video
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.videos.map((vid, index) => (
                    <div key={index} className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          placeholder="https://... (Cloudinary/YouTube)"
                          value={vid}
                          onChange={(e) => handleArrayChange(index, 'videos', e.target.value)}
                          className="w-full px-4 py-2 bg-sand/30 border border-gold-light/30 rounded-lg text-sm focus:outline-none focus:border-gold transition-colors text-warm-brown pr-10"
                        />
                      </div>
                      <div className="relative">
                        <input 
                          type="file" 
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={(e) => handleFileUpload(e, index, 'videos', 'video')}
                          accept="video/*"
                          disabled={isUploadingMedia}
                        />
                        <button type="button" className="h-full px-3 bg-sand/50 text-warm-brown hover:bg-sand rounded-lg border border-gold-light/30 flex items-center justify-center transition-colors" title="Upload Video">
                          <UploadCloud className="w-4 h-4" />
                        </button>
                      </div>
                      <button type="button" onClick={() => removeArrayItem(index, 'videos')} className="p-2 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-semibold text-warm-brown uppercase tracking-wider">Amenities</label>
                  <button type="button" onClick={() => addArrayItem('amenities')} className="text-xs text-gold hover:text-gold-dark font-medium flex items-center gap-1">
                    <Plus className="w-3 h-3" /> Add Amenity
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.amenities.map((amenity, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. Free Wi-Fi"
                        value={amenity}
                        onChange={(e) => handleArrayChange(index, 'amenities', e.target.value)}
                        className="flex-1 px-4 py-2 bg-sand/30 border border-gold-light/30 rounded-lg text-sm focus:outline-none focus:border-gold transition-colors text-warm-brown"
                      />
                      <button type="button" onClick={() => removeArrayItem(index, 'amenities')} className="p-2 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </form>
        </div>

        <div className="p-6 border-t border-gold-light/20 bg-sand/30 flex justify-end gap-3 rounded-b-xl">
          <button 
            type="button" 
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-medium text-warm-brown hover:bg-white border border-gold-light/30 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button 
            form="room-form"
            type="submit"
            disabled={isPending}
            className="btn-primary py-2.5 px-8 text-sm flex items-center justify-center min-w-[120px]"
          >
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Room"}
          </button>
        </div>
      </div>
    </div>
  );
}
