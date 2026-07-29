import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/auth/useAuth';
import { SAVED_TRIPS } from '@/data/mockData';
import { Bookmark, Calendar, ArrowRight, Plus, Compass } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const MOCK_USER_IDS = ['user-1', 'admin-1'];

export const SavedTrips: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const isPrebuiltUser = user ? MOCK_USER_IDS.includes(user.id) : false;
  const userTrips = isPrebuiltUser ? SAVED_TRIPS : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Saved Trips</h1>
          <p className="text-sm text-slate-400 mt-1">Your saved itineraries and active travel blueprints.</p>
        </div>

        <Button
          variant="primary"
          onClick={() => navigate('/app/plan')}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-white font-semibold flex items-center gap-2 rounded-xl"
        >
          <Plus className="h-4 w-4" />
          <span>New Itinerary</span>
        </Button>
      </div>

      {userTrips.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userTrips.map((trip) => (
            <div
              key={trip.id}
              onClick={() => navigate(`/app/trips/${trip.id}`)}
              className="group cursor-pointer rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-xl transition hover:border-cyan-500/40 hover:shadow-xl flex flex-col justify-between space-y-4"
            >
              <div className="flex gap-4">
                <img src={trip.image} alt={trip.destination} className="h-28 w-28 rounded-xl object-cover bg-slate-800 shrink-0" />
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase border ${
                      trip.status === 'upcoming'
                        ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20'
                        : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                    }`}>
                      {trip.status}
                    </span>
                    <Bookmark className="h-4 w-4 text-cyan-400 fill-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition truncate">{trip.destination}</h3>
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-slate-500" />
                    <span>{trip.startDate} - {trip.endDate} ({trip.duration} days)</span>
                  </p>
                  <div className="flex gap-1 pt-1">
                    {trip.tags.map(t => (
                      <span key={t} className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-300">{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">
                  Budget: <strong className="text-white">${trip.budget}</strong> ({trip.activities} activities)
                </span>
                <span className="text-cyan-400 font-semibold group-hover:translate-x-1 transition flex items-center gap-1">
                  Open Trip <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty state for new users */
        <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 p-12 flex flex-col items-center justify-center text-center space-y-4">
          <div className="h-16 w-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
            <Compass className="h-8 w-8 text-cyan-400" />
          </div>
          <h3 className="text-lg font-bold text-white">No saved trips yet</h3>
          <p className="text-sm text-slate-400 max-w-md">
            You haven't created any trips yet. Use our AI-powered planner to design your perfect itinerary — it only takes a minute!
          </p>
          <Button
            variant="primary"
            onClick={() => navigate('/app/plan')}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-white font-semibold text-sm flex items-center gap-2 rounded-xl mt-2"
          >
            <Plus className="h-4 w-4" />
            <span>Plan Your First Trip</span>
          </Button>
        </div>
      )}
    </div>
  );
};
