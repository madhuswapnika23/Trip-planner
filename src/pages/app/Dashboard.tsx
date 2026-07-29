import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/auth/useAuth';
import { SAVED_TRIPS, DESTINATIONS } from '@/data/mockData';
import { Sparkles, MapPin, Calendar, ArrowRight, Bookmark, Wallet, Plus, Compass } from 'lucide-react';
import { Button } from '@/components/ui/Button';

// Only the prebuilt mock accounts get mock trips; everyone else starts fresh
const MOCK_USER_IDS = ['user-1', 'admin-1'];

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const isPrebuiltUser = user ? MOCK_USER_IDS.includes(user.id) : false;

  // Only prebuilt users see the mock trips
  const userTrips = isPrebuiltUser ? SAVED_TRIPS : [];
  const upcomingTrips = userTrips.filter(t => t.status === 'upcoming');

  // Dynamic stats
  const savedTripsCount = isPrebuiltUser ? SAVED_TRIPS.length : (user?.savedTrips ?? 0);
  const upcomingCount = upcomingTrips.length;
  const countriesExplored = isPrebuiltUser
    ? [...new Set(SAVED_TRIPS.map(t => t.country))]
    : [];
  const totalBudget = isPrebuiltUser
    ? SAVED_TRIPS.reduce((sum, t) => sum + t.budget, 0)
    : 0;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 p-6 sm:p-8 backdrop-blur-xl">
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300 border border-cyan-500/20">
              <Sparkles className="h-3.5 w-3.5" />
              Welcome back, {user?.name.split(' ')[0]}!
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Where will AI take you next?
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              {upcomingCount > 0
                ? `You have ${upcomingCount} upcoming trip${upcomingCount > 1 ? 's' : ''} planned. Use our companion tools or create a fresh itinerary.`
                : 'You have no upcoming trips yet. Start planning your first adventure with AI!'}
            </p>
          </div>

          <Button
            variant="primary"
            onClick={() => navigate('/app/plan')}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold shadow-lg shadow-cyan-500/25 px-6 py-3 rounded-2xl flex items-center justify-center gap-2 self-start md:self-auto"
          >
            <Plus className="h-5 w-5" />
            <span>Plan New Trip</span>
          </Button>
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Saved Trips</span>
            <Bookmark className="h-4 w-4 text-cyan-400" />
          </div>
          <p className="text-2xl font-bold text-white">{savedTripsCount}</p>
          <p className="text-[10px] text-slate-400 mt-1">{upcomingCount} upcoming</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Countries Explored</span>
            <MapPin className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold text-white">{countriesExplored.length}</p>
          <p className="text-[10px] text-slate-400 mt-1">
            {countriesExplored.length > 0 ? countriesExplored.join(', ') : 'Plan your first trip!'}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Total Travel Budget</span>
            <Wallet className="h-4 w-4 text-indigo-400" />
          </div>
          <p className="text-2xl font-bold text-white">
            ${totalBudget.toLocaleString()}
          </p>
          <p className="text-[10px] text-slate-400 mt-1">
            Across {savedTripsCount} itinerar{savedTripsCount === 1 ? 'y' : 'ies'}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">AI Companion Score</span>
            <Sparkles className="h-4 w-4 text-amber-400" />
          </div>
          <p className="text-2xl font-bold text-amber-300">
            {savedTripsCount > 0 ? '98%' : '—'}
          </p>
          <p className="text-[10px] text-slate-400 mt-1">
            {savedTripsCount > 0 ? 'Optimal energy & budget match' : 'Plan a trip to get scored'}
          </p>
        </div>
      </div>

      {/* Upcoming Trip Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Upcoming Trips</h2>
          {upcomingTrips.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/app/trips')}
              className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>

        {upcomingTrips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingTrips.map((trip) => (
              <div
                key={trip.id}
                onClick={() => navigate(`/app/trips/${trip.id}`)}
                className="group cursor-pointer rounded-2xl border border-slate-800 bg-slate-900/80 p-4 backdrop-blur-xl transition hover:border-cyan-500/40 hover:shadow-lg flex gap-4"
              >
                <img src={trip.image} alt={trip.destination} className="h-24 w-24 rounded-xl object-cover bg-slate-800 shrink-0" />
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-white text-base group-hover:text-cyan-300 transition">{trip.destination}</h3>
                      <span className="rounded-full bg-cyan-500/10 px-2 py-0.5 text-[10px] font-semibold text-cyan-300 border border-cyan-500/20">
                        {trip.duration} Days
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                      <Calendar className="h-3.5 w-3.5 text-slate-500" />
                      <span>{trip.startDate} - {trip.endDate}</span>
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800">
                    <span className="text-slate-400">${trip.spent} / ${trip.budget} spent</span>
                    <span className="text-cyan-400 font-medium group-hover:translate-x-0.5 transition flex items-center gap-1">
                      View Details <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty state for new users */
          <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 p-8 flex flex-col items-center justify-center text-center space-y-3">
            <div className="h-14 w-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
              <Compass className="h-7 w-7 text-cyan-400" />
            </div>
            <h3 className="text-base font-bold text-white">No upcoming trips yet</h3>
            <p className="text-xs text-slate-400 max-w-sm">
              Start your journey by planning your first AI-powered trip. We'll help you find amazing destinations!
            </p>
            <Button
              variant="primary"
              onClick={() => navigate('/app/plan')}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-white font-semibold text-xs flex items-center gap-2 rounded-xl mt-2"
            >
              <Plus className="h-4 w-4" />
              <span>Plan Your First Trip</span>
            </Button>
          </div>
        )}
      </div>

      {/* Recommended Destinations Slider */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Recommended for You</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/app/explore')}
            className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            <span>Explore All</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {DESTINATIONS.slice(0, 3).map((dest) => (
            <div
              key={dest.id}
              onClick={() => navigate(`/app/explore/${dest.id}`)}
              className="group cursor-pointer rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden transition hover:border-cyan-500/40"
            >
              <div className="h-36 w-full relative">
                <img src={dest.image} alt={dest.name} className="h-full w-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <span className="absolute bottom-2 left-3 font-bold text-white text-base">{dest.name}</span>
              </div>
              <div className="p-3 text-xs text-slate-400 flex justify-between items-center">
                <span>{dest.country}</span>
                <span className="text-cyan-400">Plan with AI →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
