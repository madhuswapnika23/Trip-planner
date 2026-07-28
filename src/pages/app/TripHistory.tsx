import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SAVED_TRIPS } from '@/data/mockData';
import { Calendar, CheckCircle2, ArrowRight } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';
import { formatCurrency } from '@/utils/budget';

export const TripHistory: React.FC = () => {
  const navigate = useNavigate();
  const { settings } = useSettings();
  const completedTrips = SAVED_TRIPS.filter(t => t.status === 'completed');

  return (
    <div className="space-y-6 max-w-4xl mx-auto text-slate-100">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Trip History</h1>
        <p className="text-sm text-slate-400 mt-1">Review past journeys, actual expenses, and experiences.</p>
      </div>

      <div className="space-y-4">
        {completedTrips.map((trip) => (
          <div
            key={trip.id}
            onClick={() => navigate(`/app/trips/${trip.id}`)}
            className="group cursor-pointer rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-xl transition hover:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <img src={trip.image} alt={trip.destination} className="h-16 w-16 rounded-xl object-cover bg-slate-800 shrink-0" />
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-white text-base group-hover:text-cyan-300 transition">{trip.destination}</h3>
                  <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400 border border-emerald-500/20">
                    <CheckCircle2 className="h-3 w-3" /> Completed
                  </span>
                </div>
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-slate-500" />
                  <span>{trip.startDate} to {trip.endDate} ({trip.duration} days)</span>
                </p>
                <p className="text-xs text-slate-400">
                  Total Spent: <strong className="text-emerald-300">{formatCurrency(trip.spent, settings.currency)}</strong> / {formatCurrency(trip.budget, settings.currency)}
                </p>
              </div>
            </div>

            <span className="text-xs text-cyan-400 font-medium group-hover:translate-x-1 transition flex items-center gap-1">
              View History Log <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
