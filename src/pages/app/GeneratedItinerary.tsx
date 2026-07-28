import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useItineraryContext } from '@/context/ItineraryContext';
import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@/components/ui/Button';
import { Sparkles, ArrowLeft } from 'lucide-react';

export const GeneratedItinerary: React.FC = () => {
  const itinerary = useItineraryContext();
  const navigate = useNavigate();

  const state = {
    status: itinerary.status,
    itinerary: itinerary.itinerary,
    error: itinerary.error,
    formValues: itinerary.formValues,
    expandedIds: itinerary.expandedIds,
    revealedDayIds: itinerary.revealedDayIds,
    regeneratingIds: itinerary.regeneratingIds,
  };

  if (itinerary.status === 'idle') {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          <Sparkles className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold text-white">No active itinerary</h2>
        <p className="text-sm text-slate-400 max-w-md">
          Start by generating a new trip plan using our AI Travel Companion.
        </p>
        <Button
          variant="primary"
          onClick={() => navigate('/app/plan')}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-white shadow-md flex items-center gap-2"
        >
          <Sparkles className="h-4 w-4" />
          <span>Plan a Trip</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/app/plan')}
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Planner</span>
        </button>
      </div>
      <AppShell state={state} actions={itinerary} />
    </div>
  );
};
