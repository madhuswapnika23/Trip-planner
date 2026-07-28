import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { Restaurant } from '@/data/mockData';
import { CheckCircle2 } from 'lucide-react';

interface TableReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  restaurant: Restaurant | null;
}

export const TableReservationModal: React.FC<TableReservationModalProps> = ({
  isOpen,
  onClose,
  restaurant,
}) => {
  const { showToast } = useToast();
  const [partySize, setPartySize] = useState('2 Guests');
  const [timeSlot, setTimeSlot] = useState('7:30 PM');
  const [seating, setSeating] = useState('Main Dining');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!restaurant) return null;

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      showToast({
        message: `Table Reserved! Reservation code #RES-${Math.floor(10000 + Math.random() * 90000)} for ${restaurant.name} (${partySize} at ${timeSlot}) ✓`,
        duration: 5000,
      });
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Reserve Table — ${restaurant.name}`}>
      <div className="space-y-5 text-left text-slate-100">
        {/* Restaurant Preview Header */}
        <div className="flex gap-4 items-center rounded-xl bg-slate-950 p-3 border border-slate-800">
          <img src={restaurant.image} alt={restaurant.name} className="h-16 w-20 rounded-lg object-cover bg-slate-800" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-white truncate">{restaurant.name}</h4>
              <span className="text-xs font-bold text-emerald-400">{restaurant.priceRange}</span>
            </div>
            <p className="text-xs text-amber-400">★ {restaurant.rating} ({restaurant.cuisine})</p>
            <p className="text-xs text-slate-400">{restaurant.destination}</p>
          </div>
        </div>

        <form onSubmit={handleReserve} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Party Size</label>
              <select
                value={partySize}
                onChange={(e) => setPartySize(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-white focus:border-cyan-500 focus:outline-none"
              >
                <option value="1 Guest">1 Person (Solo Table)</option>
                <option value="2 Guests">2 Guests (Table for 2)</option>
                <option value="4 Guests">4 Guests (Standard Table)</option>
                <option value="6 Guests">6 Guests (Large Group)</option>
                <option value="8 Guests">8 Guests (Party Table)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Time Slot</label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-white focus:border-cyan-500 focus:outline-none"
              >
                <option value="6:00 PM">6:00 PM (Early Dinner)</option>
                <option value="7:30 PM">7:30 PM (Prime Hour)</option>
                <option value="9:00 PM">9:00 PM (Late Seating)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">Seating Area Preference</label>
            <select
              value={seating}
              onChange={(e) => setSeating(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-white focus:border-cyan-500 focus:outline-none"
            >
              <option value="Main Dining">Main Dining Room</option>
              <option value="Rooftop / Terrace">Rooftop / Outdoor Terrace</option>
              <option value="Chef Counter">Chef Counter / Bar Seating</option>
            </select>
          </div>

          <div className="rounded-xl bg-slate-950/80 p-3 border border-slate-800 space-y-1 text-xs">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Chef’s Special Recommendation</p>
            <p className="text-xs text-slate-200 font-medium">{restaurant.mustTry.join(' • ')}</p>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-sm shadow-lg shadow-emerald-600/30"
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>{isSubmitting ? 'Reserving Table...' : `Confirm Table Reservation for ${partySize}`}</span>
          </Button>
        </form>
      </div>
    </Modal>
  );
};
