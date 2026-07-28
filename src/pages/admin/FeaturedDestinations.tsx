import React, { useState } from 'react';
import { DESTINATIONS } from '@/data/mockData';
import { useToast } from '@/components/ui/Toast';

export const FeaturedDestinations: React.FC = () => {
  const { showToast } = useToast();
  const [featuredList, setFeaturedList] = useState(DESTINATIONS);

  const toggleFeatured = (id: string) => {
    setFeaturedList(featuredList.map(d => d.id === id ? { ...d, featured: !d.featured } : d));
    showToast({ message: 'Featured status updated ✓', duration: 2000 });
  };

  return (
    <div className="space-y-6 text-slate-100">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Featured Destinations Curation</h1>
        <p className="text-xs sm:text-sm text-purple-300/80 mt-1">Select which destinations appear on the main landing page and hero carousel.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredList.map((dest) => (
          <div
            key={dest.id}
            className={`rounded-2xl border p-4 transition ${
              dest.featured ? 'border-purple-500/60 bg-purple-950/20' : 'border-purple-900/30 bg-slate-900/60 opacity-60'
            }`}
          >
            <div className="h-32 w-full rounded-xl overflow-hidden mb-3">
              <img src={dest.image} alt={dest.name} className="h-full w-full object-cover" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-white text-base">{dest.name}</h3>
                <p className="text-xs text-slate-400">{dest.country}</p>
              </div>

              <button
                onClick={() => toggleFeatured(dest.id)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition border ${
                  dest.featured
                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                    : 'bg-slate-950 text-slate-400 border-slate-800'
                }`}
              >
                {dest.featured ? 'Featured ★' : 'Feature'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
