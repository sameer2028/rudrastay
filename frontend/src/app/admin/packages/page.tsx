"use client";

import { useState } from "react";
import { usePackages, useDeletePackage, Package } from "@/hooks/usePackages";
import { Loader2, Plus, Edit2, Trash2 } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import PackageFormModal from "@/components/admin/PackageFormModal";

export default function AdminPackagesPage() {
  const { data: packages, isLoading } = usePackages();
  const deleteMutation = useDeletePackage();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  const handleAdd = () => {
    setSelectedPackage(null);
    setIsModalOpen(true);
  };

  const handleEdit = (pkg: Package) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete the package "${name}"? This action cannot be undone.`)) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-gold" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-warm-brown">Packages Management</h1>
          <p className="text-sm text-brown-muted mt-2">Manage your curated tour packages.</p>
        </div>
        <button 
          onClick={handleAdd}
          className="btn-primary py-2 px-4 flex items-center gap-2 text-sm"
        >
          <Plus className="w-4 h-4" /> Add Package
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gold-light/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-sand/30 border-b border-gold-light/20 text-xs uppercase tracking-wider text-brown-muted font-semibold">
                <th className="px-6 py-4">Package Name</th>
                <th className="px-6 py-4">Duration</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Featured</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold-light/10 text-sm">
              {!packages || packages.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-brown-muted">
                    No packages found. Add a package to get started.
                  </td>
                </tr>
              ) : (
                packages.map((pkg) => (
                  <tr key={pkg.id} className="hover:bg-sand/10 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-warm-brown">{pkg.name}</div>
                      <div className="text-xs text-brown-muted">Slug: {pkg.slug}</div>
                    </td>
                    <td className="px-6 py-4 text-warm-brown">
                      {pkg.duration_days} Days / {pkg.duration_nights} Nights
                    </td>
                    <td className="px-6 py-4 font-price font-medium text-warm-brown">
                      {formatPrice(pkg.price)}
                    </td>
                    <td className="px-6 py-4">
                      {pkg.is_featured ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gold/10 text-gold-dark border border-gold/20">
                          Yes
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                          No
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button 
                        onClick={() => handleEdit(pkg)}
                        className="text-brown-muted hover:text-gold transition-colors p-2" 
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(pkg.id, pkg.name)}
                        disabled={deleteMutation.isPending}
                        className="text-brown-muted hover:text-red-500 transition-colors p-2 disabled:opacity-50" 
                        title="Delete"
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

      <PackageFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={selectedPackage}
      />
    </div>
  );
}
