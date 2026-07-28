import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { Hotel } from '@/data/mockData';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

interface HotelRatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  hotel: Hotel | null;
}

export const HotelRatesModal: React.FC<HotelRatesModalProps> = ({ isOpen, onClose, hotel }) => {
  const { showToast } = useToast();
  const [nights, setNights] = useState(3);
  const [roomType, setRoomType] = useState('Deluxe King Suite');
  const [guests, setGuests] = useState('2 Guests');
  const [isBooked, setIsBooked] = useState(false);

  if (!hotel) return null;

  const roomMultiplier = roomType === 'Executive Penthouse' ? 1.8 : roomType === 'Ocean View Villa' ? 1.4 : 1.0;
  const pricePerNight = Math.round(hotel.pricePerNight * roomMultiplier);
  const totalCost = pricePerNight * nights;

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
    setTimeout(() => {
      showToast({
        message: `Booking Confirmed! Stay reserved at ${hotel.name} (#HTL-${Math.floor(10000 + Math.random() * 90000)}) ✓`,
        duration: 5000,
      });
      setIsBooked(false);
      onClose();
    }, 600);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Reserve Room — ${hotel.name}`}>
      <div className="space-y-5 text-left text-slate-100">
        {/* Hotel Preview Header */}
        <div className="flex gap-4 items-center rounded-xl bg-slate-950 p-3 border border-slate-800">
          <img src={hotel.image} alt={hotel.name} className="h-16 w-20 rounded-lg object-cover bg-slate-800" />
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-sm text-white truncate">{hotel.name}</h4>
            <p className="text-xs text-amber-400">★ {hotel.rating} ({hotel.stars} Star Luxury)</p>
            <p className="text-xs text-slate-400">{hotel.destination}</p>
          </div>
        </div>

        <form onSubmit={handleBook} className="space-y-4 text-xs">
          {/* Room Type */}
          <div>
            <label className="block text-slate-400 font-semibold mb-1">Select Room Type</label>
            <select
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-white focus:border-cyan-500 focus:outline-none"
            >
              <option value="Deluxe King Suite">Deluxe King Suite — ${Math.round(hotel.pricePerNight)}/night</option>
              <option value="Ocean View Villa">Ocean View Villa — ${Math.round(hotel.pricePerNight * 1.4)}/night</option>
              <option value="Executive Penthouse">Executive Penthouse — ${Math.round(hotel.pricePerNight * 1.8)}/night</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Duration of Stay</label>
              <select
                value={nights}
                onChange={(e) => setNights(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-white focus:border-cyan-500 focus:outline-none"
              >
                <option value={1}>1 Night</option>
                <option value={3}>3 Nights</option>
                <option value={5}>5 Nights</option>
                <option value={7}>7 Nights</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Guests</label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-white focus:border-cyan-500 focus:outline-none"
              >
                <option value="1 Guest">1 Guest</option>
                <option value="2 Guests">2 Guests</option>
                <option value="3 Guests">3 Guests</option>
                <option value="4 Guests">4 Guests</option>
              </select>
            </div>
          </div>

          {/* Pricing Summary */}
          <div className="rounded-xl bg-slate-950/80 p-3 border border-slate-800 space-y-1 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>{roomType} (${pricePerNight} x {nights} nights):</span>
              <span className="text-white">${totalCost}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Taxes & Resort Fees:</span>
              <span className="text-emerald-400">Included</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-cyan-300 pt-2 border-t border-slate-800">
              <span>Total Estimated Price:</span>
              <span>${totalCost} {hotel.currency}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>Free cancellation up to 48 hours before check-in. Instant confirmation.</span>
          </div>

          <Button
            type="submit"
            disabled={isBooked}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-sm shadow-lg shadow-indigo-600/30"
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>{isBooked ? 'Confirming Reservation...' : `Book Room for $${totalCost}`}</span>
          </Button>
        </form>
      </div>
    </Modal>
  );
};
