import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DESTINATIONS } from '@/data/mockData';
import { Search, MapPin, Star, Filter } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useSettings } from '@/context/SettingsContext';
import { formatCurrency } from '@/utils/budget';

export const ExploreDestinations: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { settings } = useSettings();

  const [query, setQuery] = useState(searchParams.get('search') || '');
  const [selectedTag, setSelectedTag] = useState(searchParams.get('tag') || 'All');

  const tags = ['All', 'Culture', 'Beach', 'Food', 'Romance', 'Nature', 'Urban', 'History', 'Luxury'];

  const filtered = DESTINATIONS.filter((d) => {
    const matchesQuery =
      d.name.toLowerCase().includes(query.toLowerCase()) ||
      d.country.toLowerCase().includes(query.toLowerCase()) ||
      d.description.toLowerCase().includes(query.toLowerCase());
    const matchesTag = selectedTag === 'All' || d.tags.includes(selectedTag);
    return matchesQuery && matchesTag;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Explore Destinations</h1>
        <p className="text-sm text-slate-400 mt-1">Discover places around the globe and start planning with AI.</p>
      </div>

      {/* Search & Tags */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search city, country, or experience..."
            className="w-full rounded-xl border border-slate-800 bg-slate-900/80 py-2.5 pl-10 pr-4 text-sm text-slate-200 placeholder:text-slate-500 focus:border-cyan-500/50 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 text-xs">
          <Filter className="h-4 w-4 text-slate-400 shrink-0" />
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTag(t)}
              className={`rounded-full px-3 py-1 font-medium transition shrink-0 border ${
                selectedTag === t
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Destination Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((dest) => (
          <div
            key={dest.id}
            onClick={() => navigate(`/app/explore/${dest.id}`)}
            className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 transition hover:border-cyan-500/40 hover:shadow-xl flex flex-col justify-between"
          >
            <div className="relative h-48 w-full">
              <img src={dest.image} alt={dest.name} className="h-full w-full object-cover group-hover:scale-105 transition duration-500" />
              <div className="absolute top-3 left-3 rounded-full bg-slate-950/80 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-md flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-cyan-400" />
                <span>{dest.country}</span>
              </div>
              <div className="absolute top-3 right-3 rounded-full bg-slate-950/80 px-2.5 py-1 text-xs font-semibold text-amber-400 backdrop-blur-md flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-amber-400" />
                <span>{dest.rating}</span>
              </div>
            </div>

            <div className="p-5 flex-1 space-y-3">
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition">{dest.name}</h3>
                <p className="text-xs text-slate-400 line-clamp-2 mt-1">{dest.description}</p>
              </div>

              <div className="flex flex-wrap gap-1">
                {dest.tags.map(t => (
                  <span key={t} className="rounded bg-slate-800/80 px-2 py-0.5 text-[10px] text-slate-300">
                    {t}
                  </span>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400">Est. 7-Day Budget</span>
                  <p className="text-sm font-bold text-cyan-300">{formatCurrency(dest.avgBudget, settings.currency)}</p>
                </div>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={(e) => { e.stopPropagation(); navigate(`/app/plan?destination=${encodeURIComponent(dest.name)}`); }}
                  className="bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 border-cyan-500/30 text-xs"
                >
                  Plan with AI
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
