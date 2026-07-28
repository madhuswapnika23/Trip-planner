import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SAVED_TRIPS } from '@/data/mockData';
import { Calendar, ArrowLeft, Share2, Sparkles, MapPin, Clock, DollarSign } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';
import { useSettings } from '@/context/SettingsContext';
import { formatCurrency } from '@/utils/budget';

const STATUS_CONFIG = {
  upcoming: { bg: 'bg-ocean-100', text: 'text-ocean-700' },
  completed: { bg: 'bg-sage-100', text: 'text-sage-700' },
  planning: { bg: 'bg-amber-100', text: 'text-amber-700' },
};

const PREVIEW_DAYS = [
  { day: 'Day 1', title: 'Arrival & Cultural Immersion', desc: 'Explore main temple district, local food market, and welcome dinner.', count: 3 },
  { day: 'Day 2', title: 'Scenic Excursion & Fine Dining', desc: 'Morning nature walk, museum tour, rooftop dinner at sunset.', count: 4 },
  { day: 'Day 3', title: 'Hidden Gems & Local Life', desc: 'Off-the-beaten-path neighborhoods, artisan markets, street food tour.', count: 5 },
];

export const TripDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { settings } = useSettings();

  const trip = SAVED_TRIPS.find(t => t.id === id) || SAVED_TRIPS[0];
  const statusCfg = STATUS_CONFIG[trip.status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.planning;
  const spentPct = Math.min(Math.round((trip.spent / trip.budget) * 100), 100);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">

      {/* Back link */}
      <button
        onClick={() => navigate('/app/trips')}
        className="flex items-center gap-1.5 text-[12px] font-500 text-[#A8A090] hover:text-[#1A1A1A] transition"
        style={{ fontWeight: 500 }}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Saved Trips
      </button>

      {/* ── HERO BANNER ── */}
      <div className="relative overflow-hidden rounded-[28px] h-[280px] sm:h-[360px] shadow-card-hover">
        <img src={trip.image} alt={trip.destination} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Status */}
        <div className="absolute top-5 left-5">
          <span className={`badge-pill ${statusCfg.bg} ${statusCfg.text} shadow-sm capitalize`}>
            {trip.status}
          </span>
        </div>

        {/* Duration */}
        <div className="absolute top-5 right-5">
          <span className="badge-pill bg-black/30 backdrop-blur-sm text-white border border-white/10">
            <Clock className="h-3 w-3" />
            {trip.duration} days
          </span>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-[12px] text-white/60 flex items-center gap-1 mb-1">
              <MapPin className="h-3 w-3" /> {trip.destination}
            </p>
            <h1 className="font-display text-[32px] sm:text-[42px] font-800 text-white leading-tight" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800 }}>
              {trip.destination}
            </h1>
            <p className="text-[12px] text-white/60 flex items-center gap-1.5 mt-1">
              <Calendar className="h-3.5 w-3.5" />
              {trip.startDate} — {trip.endDate}
            </p>
          </div>

          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => {
                const shareUrl = `${window.location.origin}/app/saved?tripId=${trip.id}`;
                navigator.clipboard.writeText(shareUrl).then(() => {
                  showToast({ message: `Trip link for ${trip.destination} copied! ✓`, duration: 3000 });
                }).catch(() => {
                  showToast({ message: `Shared ${trip.destination}! ✓`, duration: 3000 });
                });
              }}
              className="flex items-center gap-1.5 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white px-3.5 py-2 text-[12px] font-600 border border-white/20 transition"
              style={{ fontWeight: 600 }}
            >
              <Share2 className="h-3.5 w-3.5" />
              Share
            </button>
            <button
              onClick={() => navigate(`/app/plan?destination=${encodeURIComponent(trip.destination)}`)}
              className="flex items-center gap-1.5 rounded-xl bg-white hover:bg-white/90 text-[#1A1A1A] px-3.5 py-2 text-[12px] font-700 shadow-sm transition"
              style={{ fontWeight: 700 }}
            >
              <Sparkles className="h-3.5 w-3.5 text-ocean-600" />
              Regenerate
            </button>
          </div>
        </div>
      </div>

      {/* ── OVERVIEW STATS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Budget', value: formatCurrency(trip.budget, settings.currency), icon: DollarSign, color: 'text-ocean-600', bg: 'bg-ocean-50' },
          { label: 'Expenses', value: formatCurrency(trip.spent, settings.currency), icon: DollarSign, color: 'text-sage-600', bg: 'bg-sage-50' },
          { label: 'Activities', value: `${trip.activities} Events`, icon: Calendar, color: 'text-coral-500', bg: 'bg-coral-50' },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="rounded-2xl bg-white border border-[#EDE9E0] shadow-card p-5">
              <div className={`h-9 w-9 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                <Icon className={`h-4.5 w-4.5 ${stat.color}`} />
              </div>
              <p className="text-[11px] font-500 text-[#A8A090]" style={{ fontWeight: 500 }}>{stat.label}</p>
              <p className="font-display text-[22px] font-700 text-[#1A1A1A] mt-0.5" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* ── BUDGET PROGRESS ── */}
      <div className="rounded-2xl bg-white border border-[#EDE9E0] shadow-card p-5 space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="font-display text-[16px] font-700 text-[#1A1A1A]" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>Budget Usage</h2>
          <span className="text-[12px] font-600 text-[#A8A090]" style={{ fontWeight: 600 }}>{spentPct}% used</span>
        </div>
        <div className="h-2 w-full rounded-full bg-[#F0EDE6] overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-ocean-500 to-sage-500 budget-bar-fill"
            style={{ width: `${spentPct}%` }}
          />
        </div>
        <div className="flex justify-between text-[11px] text-[#A8A090]">
          <span>{formatCurrency(trip.spent, settings.currency)} spent</span>
          <span>{formatCurrency(trip.budget - trip.spent, settings.currency)} remaining</span>
        </div>
      </div>

      {/* ── ITINERARY PREVIEW ── */}
      <div className="rounded-2xl bg-white border border-[#EDE9E0] shadow-card p-6 space-y-4">
        <h2 className="font-display text-[18px] font-700 text-[#1A1A1A]" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>
          Trip Preview
        </h2>

        <div className="space-y-3">
          {PREVIEW_DAYS.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-4 rounded-xl bg-[#FAFAF8] border border-[#F0EDE6] hover:border-[#DDD8CB] transition"
            >
              <div className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center font-display text-[13px] font-700 text-white ${
                i === 0 ? 'bg-ocean-600' : i === 1 ? 'bg-sage-600' : 'bg-coral-500'
              }`} style={{ fontWeight: 700 }}>
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-600 text-[#1A1A1A]" style={{ fontWeight: 600 }}>{item.title}</p>
                <p className="text-[11px] text-[#A8A090] mt-0.5">{item.desc}</p>
              </div>
              <span className="shrink-0 text-[11px] font-500 text-[#C8C2B0]" style={{ fontWeight: 500 }}>
                {item.count} stops
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate(`/app/plan?destination=${encodeURIComponent(trip.destination)}`)}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-ocean-600 to-ocean-500 text-white py-3 text-[13px] font-600 shadow-ocean hover:shadow-[0_8px_24px_rgba(2,113,194,0.45)] hover:scale-[1.01] transition-all"
          style={{ fontWeight: 600 }}
        >
          <Sparkles className="h-4 w-4" />
          Generate Full AI Itinerary
        </button>
      </div>
    </div>
  );
};
