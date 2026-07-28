import React, { useState } from 'react';
import { RESTAURANTS, Restaurant } from '@/data/mockData';
import { Star, MapPin, Filter } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { TableReservationModal } from '@/components/modals/TableReservationModal';

export const RestaurantsPage: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);

  const cities = ['All', 'Tokyo', 'Bali', 'Paris', 'New York City', 'Rome', 'Santorini', 'Mumbai', 'Jaipur', 'Goa'];
  const filtered = RESTAURANTS.filter(r => selectedCity === 'All' || r.destination === selectedCity);

  const handleReserveTable = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setIsReserveModalOpen(true);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto text-slate-100">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Top Dining Recommendations</h1>
        <p className="text-sm text-slate-400 mt-1">Authentic culinary spots, Michelin-starred sushi, and hidden rooftops.</p>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
        <Filter className="h-4 w-4 text-slate-400 shrink-0" />
        {cities.map(c => (
          <button
            key={c}
            onClick={() => setSelectedCity(c)}
            className={`rounded-full px-3.5 py-1.5 font-semibold transition shrink-0 border ${
              selectedCity === c
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((rest) => (
          <div key={rest.id} className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 transition hover:border-emerald-500/40 flex flex-col justify-between">
            <div className="relative h-48 w-full">
              <img src={rest.image} alt={rest.name} className="h-full w-full object-cover group-hover:scale-105 transition duration-500" />
              <div className="absolute top-3 left-3 rounded-full bg-slate-950/80 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-md flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-emerald-400" />
                <span>{rest.destination}</span>
              </div>
              <div className="absolute top-3 right-3 rounded-full bg-slate-950/80 px-2.5 py-1 text-xs font-semibold text-amber-400 backdrop-blur-md flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-amber-400" />
                <span>{rest.rating}</span>
              </div>
            </div>

            <div className="p-5 flex-1 space-y-3">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition">{rest.name}</h3>
                  <span className="text-xs font-bold text-emerald-400">{rest.priceRange}</span>
                </div>
                <p className="text-xs text-slate-400">{rest.cuisine}</p>
              </div>

              <div className="rounded-xl bg-slate-950/60 p-3 border border-slate-800/80 space-y-1">
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Must Try Dishes</p>
                <p className="text-xs font-medium text-slate-200">{rest.mustTry.join(' • ')}</p>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs">
                <span className={`flex items-center gap-1 font-semibold ${rest.openNow ? 'text-emerald-400' : 'text-slate-500'}`}>
                  <span className={`h-2 w-2 rounded-full ${rest.openNow ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
                  {rest.openNow ? 'Open Now' : 'Closed'}
                </span>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleReserveTable(rest)}
                  className="bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 border-emerald-500/30 text-xs"
                >
                  Reserve Table
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <TableReservationModal
        isOpen={isReserveModalOpen}
        onClose={() => setIsReserveModalOpen(false)}
        restaurant={selectedRestaurant}
      />
    </div>
  );
};
