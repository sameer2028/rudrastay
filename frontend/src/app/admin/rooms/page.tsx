"use client";

import { useState } from "react";
import { useRooms, useDeleteRoom, Room } from "@/hooks/useRooms";
import { Loader2, Plus, Edit2, Trash2 } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import RoomFormModal from "@/components/admin/RoomFormModal";

export default function AdminRoomsPage() {
  const { data: rooms, isLoading } = useRooms();
  const deleteMutation = useDeleteRoom();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const handleAdd = () => {
    setSelectedRoom(null);
    setIsModalOpen(true);
  };

  const handleEdit = (room: Room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete the room "${name}"? This action cannot be undone.`)) {
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
          <h1 className="font-display text-3xl font-bold text-warm-brown">Rooms Management</h1>
          <p className="text-sm text-brown-muted mt-2">Manage your hotel rooms, pricing, and availability.</p>
        </div>
        <button 
          onClick={handleAdd}
          className="btn-primary py-2 px-4 flex items-center gap-2 text-sm"
        >
          <Plus className="w-4 h-4" /> Add Room
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gold-light/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-sand/30 border-b border-gold-light/20 text-xs uppercase tracking-wider text-brown-muted font-semibold">
                <th className="px-6 py-4">Room Name</th>
                <th className="px-6 py-4">Capacity</th>
                <th className="px-6 py-4">Price / Night</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold-light/10 text-sm">
              {!rooms || rooms.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-brown-muted">
                    No rooms found. Add a room to get started.
                  </td>
                </tr>
              ) : (
                rooms.map((room) => (
                  <tr key={room.id} className="hover:bg-sand/10 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-warm-brown">{room.name}</div>
                      <div className="text-xs text-brown-muted">Slug: {room.slug}</div>
                    </td>
                    <td className="px-6 py-4 text-warm-brown">
                      {room.capacity} Guests
                    </td>
                    <td className="px-6 py-4 font-price font-medium text-warm-brown">
                      {formatPrice(room.price_per_night)}
                    </td>
                    <td className="px-6 py-4">
                      {room.is_available ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                          Available
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200">
                          Booked
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button 
                        onClick={() => handleEdit(room)}
                        className="text-brown-muted hover:text-gold transition-colors p-2" 
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(room.id, room.name)}
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

      <RoomFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={selectedRoom}
      />
    </div>
  );
}
