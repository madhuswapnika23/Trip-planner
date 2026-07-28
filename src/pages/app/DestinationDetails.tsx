import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DESTINATIONS, HOTELS, RESTAURANTS, Hotel, Restaurant } from '@/data/mockData';
import { Star, Calendar, DollarSign, Sparkles, ArrowLeft, CheckCircle2, Hotel as HotelIcon, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { HotelRatesModal } from '@/components/modals/HotelRatesModal';
import { TableReservationModal } from '@/components/modals/TableReservationModal';
import { useSettings } from '@/context/SettingsContext';
import { formatCurrency } from '@/utils/budget';

export const DestinationDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { settings } = useSettings();

  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [isRatesModalOpen, setIsRatesModalOpen] = useState(false);

  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);

  const dest = DESTINATIONS.find((d) => d.id === id) || DESTINATIONS[0];
  const destHotels = HOTELS.filter((h) => h.destination.toLowerCase() === dest.name.toLowerCase());
  const destRestaurants = RESTAURANTS.filter((r) => r.destination.toLowerCase() === dest.name.toLowerCase());

  return (
    <div className="space-y-8 max-w-5xl mx-auto text-slate-100">
      {/* Back Button */}
      <button
        onClick={() => navigate('/app/explore')}
        className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Destinations</span>
      </button>

      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 h-80 sm:h-96">
        <img src={dest.image} alt={dest.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-semibold text-cyan-300 border border-cyan-500/30">
                {dest.country}
              </span>
              <span className="flex items-center gap-1 text-xs text-amber-400 font-semibold bg-slate-950/80 px-2.5 py-1 rounded-full border border-slate-800">
                <Star className="h-3.5 w-3.5 fill-amber-400" />
                {dest.rating} ({dest.reviewCount.toLocaleString()} reviews)
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white">{dest.name}</h1>
            <p className="text-sm sm:text-base text-slate-300 italic">{dest.tagline}</p>
          </div>

          <Button
            variant="primary"
            onClick={() => navigate(`/app/plan?destination=${encodeURIComponent(dest.name)}`)}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold shadow-lg shadow-cyan-500/30 px-6 py-3 rounded-2xl flex items-center justify-center gap-2 shrink-0"
          >
            <Sparkles className="h-4 w-4" />
            <span>Plan Trip with AI</span>
          </Button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* About */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl space-y-4">
          <h2 className="text-lg font-bold text-white">About {dest.name}</h2>
          <p className="text-sm text-slate-300 leading-relaxed">{dest.description}</p>

          <div className="pt-4 border-t border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white">Top Highlights</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {dest.highlights.map((h) => (
                <div key={h} className="flex items-center gap-2 rounded-xl bg-slate-950/60 p-3 border border-slate-800">
                  <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" />
                  <span className="text-xs font-medium text-slate-200">{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Essentials */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl space-y-4 h-fit">
          <h2 className="text-base font-bold text-white">Travel Essentials</h2>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-cyan-400" /> Best Time
              </span>
              <span className="font-semibold text-white">{dest.bestTime}</span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400 flex items-center gap-1.5">
                <DollarSign className="h-4 w-4 text-emerald-400" /> Avg. 7-Day Budget
              </span>
              <span className="font-bold text-emerald-400">{formatCurrency(dest.avgBudget, settings.currency)}</span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400">Continent</span>
              <span className="font-semibold text-white">{dest.continent}</span>
            </div>
          </div>

          <div className="pt-2">
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Tags</p>
            <div className="flex flex-wrap gap-1.5">
              {dest.tags.map((t) => (
                <span key={t} className="rounded bg-slate-950 px-2.5 py-1 text-[10px] text-slate-300 border border-slate-800">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Hotels */}
      {destHotels.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <HotelIcon className="h-5 w-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-white">Top Stays in {dest.name}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {destHotels.map((h) => (
              <div key={h.id} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-xl flex gap-4">
                <img src={h.image} alt={h.name} className="h-24 w-24 rounded-xl object-cover shrink-0 bg-slate-800" />
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-white text-sm truncate">{h.name}</h3>
                    <p className="text-xs text-amber-400 mt-0.5">{h.stars}-star Luxury Stay • Rating {h.rating}</p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                    <span className="font-bold text-indigo-300 text-sm">{formatCurrency(h.pricePerNight, settings.currency)}/night</span>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => { setSelectedHotel(h); setIsRatesModalOpen(true); }}
                      className="bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20 border-indigo-500/30 text-xs"
                    >
                      Check Rates
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Restaurants */}
      {destRestaurants.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Utensils className="h-5 w-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-white">Top Dining in {dest.name}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {destRestaurants.map((r) => (
              <div key={r.id} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-xl flex gap-4">
                <img src={r.image} alt={r.name} className="h-24 w-24 rounded-xl object-cover shrink-0 bg-slate-800" />
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-white text-sm truncate">{r.name}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{r.cuisine} • {r.priceRange}</p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                    <span className="text-xs text-slate-300 truncate max-w-[140px]">{r.mustTry[0]}</span>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => { setSelectedRestaurant(r); setIsReserveModalOpen(true); }}
                      className="bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 border-emerald-500/30 text-xs"
                    >
                      Reserve Table
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <HotelRatesModal
        isOpen={isRatesModalOpen}
        onClose={() => setIsRatesModalOpen(false)}
        hotel={selectedHotel}
      />
      <TableReservationModal
        isOpen={isReserveModalOpen}
        onClose={() => setIsReserveModalOpen(false)}
        restaurant={selectedRestaurant}
      />
    </div>
  );
};
