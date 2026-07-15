"use client";

import { useState, useEffect } from "react";
import { X, Loader2, Plus, Trash2 } from "lucide-react";
import { useCreatePackage, useUpdatePackage, Package } from "@/hooks/usePackages";

interface PackageFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Package | null;
}

export default function PackageFormModal({ isOpen, onClose, initialData }: PackageFormModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    duration_days: 2,
    price: 0,
    is_featured: false,
    inclusions: [""],
    images: [""],
    pdf_url: "",
  });

  const createMutation = useCreatePackage();
  const updateMutation = useUpdatePackage();

  const isEditing = !!initialData;
  const isPending = createMutation.isPending || updateMutation.isPending;

  useEffect(() => {
    if (initialData && isOpen) {
      setFormData({
        name: initialData.name,
        description: initialData.description,
        duration_days: initialData.duration_days,
        price: initialData.price,
        is_featured: initialData.is_featured,
        inclusions: initialData.inclusions?.length ? initialData.inclusions : [""],
        images: initialData.images?.length ? initialData.images : [""],
        pdf_url: initialData.pdf_url || "",
      });
    } else if (isOpen) {
      setFormData({
        name: "",
        description: "",
        duration_days: 2,
        price: 0,
        is_featured: false,
        inclusions: [""],
        images: [""],
        pdf_url: "",
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const handleArrayChange = (index: number, field: 'inclusions' | 'images', value: string) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const addArrayItem = (field: 'inclusions' | 'images') => {
    setFormData(prev => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeArrayItem = (index: number, field: 'inclusions' | 'images') => {
    setFormData(prev => ({ 
      ...prev, 
      [field]: prev[field].filter((_, i) => i !== index) 
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const cleanedData = {
      ...formData,
      inclusions: formData.inclusions.filter(i => i.trim() !== ""),
      images: formData.images.filter(img => img.trim() !== ""),
      pdf_url: formData.pdf_url.trim() === "" ? null : formData.pdf_url,
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
            {isEditing ? 'Edit Package' : 'Add New Package'}
          </h2>
          <button onClick={onClose} className="p-2 text-brown-muted hover:text-warm-brown transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <form id="package-form" onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-warm-brown uppercase tracking-wider mb-2">Package Name</label>
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
                <label className="block text-xs font-semibold text-warm-brown uppercase tracking-wider mb-2">Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  required
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-sand/30 border border-gold-light/30 rounded-lg text-sm focus:outline-none focus:border-gold transition-colors text-warm-brown"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-warm-brown uppercase tracking-wider mb-2">Duration (Days)</label>
                <input
                  type="number"
                  name="duration_days"
                  required
                  min="1"
                  value={formData.duration_days}
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

              <div className="col-span-2">
                <label className="block text-xs font-semibold text-warm-brown uppercase tracking-wider mb-2">PDF Brochure URL (Optional)</label>
                <input
                  type="text"
                  name="pdf_url"
                  placeholder="https://... or /pdfs/..."
                  value={formData.pdf_url}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-sand/30 border border-gold-light/30 rounded-lg text-sm focus:outline-none focus:border-gold transition-colors text-warm-brown"
                />
              </div>
            </div>

            <div className="flex items-center gap-8 py-4 border-y border-gold-light/20">
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

            <div className="space-y-6">
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
                      <input
                        type="text"
                        placeholder="https://... or /images/..."
                        value={img}
                        onChange={(e) => handleArrayChange(index, 'images', e.target.value)}
                        className="flex-1 px-4 py-2 bg-sand/30 border border-gold-light/30 rounded-lg text-sm focus:outline-none focus:border-gold transition-colors text-warm-brown"
                      />
                      <button type="button" onClick={() => removeArrayItem(index, 'images')} className="p-2 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-semibold text-warm-brown uppercase tracking-wider">Inclusions</label>
                  <button type="button" onClick={() => addArrayItem('inclusions')} className="text-xs text-gold hover:text-gold-dark font-medium flex items-center gap-1">
                    <Plus className="w-3 h-3" /> Add Inclusion
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.inclusions.map((inclusion, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. Breakfast included"
                        value={inclusion}
                        onChange={(e) => handleArrayChange(index, 'inclusions', e.target.value)}
                        className="flex-1 px-4 py-2 bg-sand/30 border border-gold-light/30 rounded-lg text-sm focus:outline-none focus:border-gold transition-colors text-warm-brown"
                      />
                      <button type="button" onClick={() => removeArrayItem(index, 'inclusions')} className="p-2 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
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
            form="package-form"
            type="submit"
            disabled={isPending}
            className="btn-primary py-2.5 px-8 text-sm flex items-center justify-center min-w-[120px]"
          >
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Package"}
          </button>
        </div>
      </div>
    </div>
  );
}
