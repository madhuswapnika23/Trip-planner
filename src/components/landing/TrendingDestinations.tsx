import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DESTINATIONS } from '@/data/mockData';
import { Star, ArrowRight, MapPin, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const TrendingDestinations: React.FC = () => {
  const navigate = useNavigate();
  const trendingList = DESTINATIONS.filter(d => d.trending).slice(0, 4);

  return (
    <section id="destinations" className="py-16 md:py-24 bg-slate-900/50 border-t border-b border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-semibold tracking-widest text-cyan-400 uppercase">Top Picks</span>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl mt-1">
              Trending Destinations
            </h2>
            <p className="mt-2 text-slate-400 max-w-xl text-sm sm:text-base">
              Hand-picked locations loved by modern travelers. Explore AI itineraries crafted for each.
            </p>
          </div>

          <Button
            variant="secondary"
            onClick={() => navigate('/app/explore')}
            className="border-slate-700 text-slate-200 hover:bg-slate-800 self-start md:self-auto flex items-center gap-2"
          >
            <span>View All Destinations</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Grid of Destination Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingList.map((dest) => (
            <div
              key={dest.id}
              onClick={() => navigate(`/app/explore/${dest.id}`)}
              className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-500/10 cursor-pointer flex flex-col"
            >
              {/* Image */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-800">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                <div className="absolute top-3 left-3 rounded-full bg-slate-950/70 px-2.5 py-1 text-[11px] font-semibold text-cyan-300 backdrop-blur-md border border-slate-700/50 flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-cyan-400" />
                  <span>{dest.country}</span>
                </div>
                <div className="absolute top-3 right-3 rounded-full bg-slate-950/70 px-2 py-1 text-[11px] font-semibold text-amber-400 backdrop-blur-md border border-slate-700/50 flex items-center gap-1">
                  <Star className="h-3 w-3 fill-amber-400" />
                  <span>{dest.rating}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition">
                    {dest.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                    {dest.tagline}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400 flex items-center gap-0.5">
                    <DollarSign className="h-3.5 w-3.5 text-slate-500" />
                    Avg. ${dest.avgBudget}
                  </span>
                  <span className="text-cyan-400 font-medium group-hover:translate-x-0.5 transition flex items-center gap-1">
                    <span>Plan Trip</span>
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
