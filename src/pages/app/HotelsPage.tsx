import React, { useState } from 'react';
import { HOTELS, Hotel } from '@/data/mockData';
import { Star, MapPin, Filter } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { HotelRatesModal } from '@/components/modals/HotelRatesModal';
import { useSettings } from '@/context/SettingsContext';
import { formatCurrency } from '@/utils/budget';

export const HotelsPage: React.FC = () => {
  const [selectedDestination, setSelectedDestination] = useState('All');
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [isRatesModalOpen, setIsRatesModalOpen] = useState(false);
  const { settings } = useSettings();

  const destinations = ['All', 'Tokyo', 'Bali', 'Paris', 'Santorini', 'New York City', 'Kyoto', 'Mumbai', 'Jaipur', 'Goa', 'Kerala'];
  const filtered = HOTELS.filter(h => selectedDestination === 'All' || h.destination === selectedDestination);

  const handleCheckRates = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setIsRatesModalOpen(true);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Curated Accommodations</h1>
        <p className="text-sm text-slate-400 mt-1">Hand-picked luxury stays, boutique hotels, and authentic ryokans.</p>
      </div>

      {/* Destination filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
        <Filter className="h-4 w-4 text-slate-400 shrink-0" />
        {destinations.map(d => (
          <button
            key={d}
            onClick={() => setSelectedDestination(d)}
            className={`rounded-full px-3.5 py-1.5 font-semibold transition shrink-0 border ${
              selectedDestination === d
                ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((hotel) => (
          <div key={hotel.id} className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 transition hover:border-indigo-500/40 flex flex-col justify-between">
            <div className="relative h-48 w-full">
              <img src={hotel.image} alt={hotel.name} className="h-full w-full object-cover group-hover:scale-105 transition duration-500" />
              <div className="absolute top-3 left-3 rounded-full bg-slate-950/80 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-md flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-indigo-400" />
                <span>{hotel.destination}</span>
              </div>
              <div className="absolute top-3 right-3 rounded-full bg-slate-950/80 px-2.5 py-1 text-xs font-semibold text-amber-400 backdrop-blur-md flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-amber-400" />
                <span>{hotel.rating}</span>
              </div>
            </div>

            <div className="p-5 flex-1 space-y-3">
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition">{hotel.name}</h3>
                <p className="text-xs text-amber-400 mt-0.5">{hotel.stars} Star Luxury Stay</p>
              </div>

              <div className="flex flex-wrap gap-1">
                {hotel.amenities.map(a => (
                  <span key={a} className="rounded bg-slate-800/80 px-2 py-0.5 text-[10px] text-slate-300">
                    {a}
                  </span>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xl font-extrabold text-indigo-300">{formatCurrency(hotel.pricePerNight, settings.currency)}</span>
                  <span className="text-xs text-slate-400"> / night</span>
                </div>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleCheckRates(hotel)}
                  className="bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20 border-indigo-500/30 text-xs"
                >
                  Check Rates & Reserve
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <HotelRatesModal
        isOpen={isRatesModalOpen}
        onClose={() => setIsRatesModalOpen(false)}
        hotel={selectedHotel}
      />
    </div>
  );
};
