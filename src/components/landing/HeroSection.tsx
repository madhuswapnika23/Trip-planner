import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, MapPin, Calendar, Compass, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState('5');

  const handleQuickPlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (destination.trim()) {
      navigate(`/app/plan?destination=${encodeURIComponent(destination)}&days=${duration}`);
    } else {
      navigate('/app/plan');
    }
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 bg-slate-950">
      {/* Background imagery with overlay */}
      <div className="absolute inset-0 z-0 opacity-25">
        <img
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&q=80"
          alt="Travel Background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/80 to-slate-950" />
      </div>

      {/* Decorative Glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-cyan-500/20 via-blue-600/20 to-indigo-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold text-cyan-300 backdrop-blur-md mb-6">
          <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
          <span>Next-Gen AI Travel Companion 2.0</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl max-w-4xl mx-auto leading-tight">
          Plan Less.{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400 bg-clip-text text-transparent">
            Experience More.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal">
          AI-powered itineraries that respect your time, energy, and wallet. Get custom day-by-day plans, budget breakdowns, and hidden gems in under 60 seconds.
        </p>

        {/* Hero Interactive Search/Plan Card */}
        <form
          onSubmit={handleQuickPlan}
          className="mt-10 mx-auto max-w-3xl rounded-2xl border border-slate-800 bg-slate-900/90 p-3 sm:p-4 shadow-2xl backdrop-blur-xl grid grid-cols-1 sm:grid-cols-12 gap-3"
        >
          <div className="sm:col-span-6 relative text-left">
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1 px-1">
              Where to?
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cyan-400" />
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g. Tokyo, Paris, Bali..."
                className="w-full rounded-xl border border-slate-700/80 bg-slate-950/70 py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>
          </div>

          <div className="sm:col-span-3 relative text-left">
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1 px-1">
              Days
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cyan-400" />
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full rounded-xl border border-slate-700/80 bg-slate-950/70 py-2.5 pl-9 pr-3 text-sm text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              >
                <option value="3">3 Days</option>
                <option value="5">5 Days</option>
                <option value="7">7 Days</option>
                <option value="10">10 Days</option>
                <option value="14">14 Days</option>
              </select>
            </div>
          </div>

          <div className="sm:col-span-3 flex items-end">
            <Button
              type="submit"
              variant="primary"
              className="w-full h-11 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 rounded-xl"
            >
              <Sparkles className="h-4 w-4" />
              <span>Generate</span>
            </Button>
          </div>
        </form>

        {/* Trust Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-cyan-400" />
            <span>100% Free AI Planner</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Compass className="h-4 w-4 text-cyan-400" />
            <span>140,000+ Trips Generated</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            <span>Real-time Budget & Energy Engine</span>
          </div>
        </div>
      </div>
    </section>
  );
};
