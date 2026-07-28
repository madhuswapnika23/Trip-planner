import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useItineraryContext } from '@/context/ItineraryContext';
import { AppShell } from '@/components/layout/AppShell';
import { useSettings } from '@/context/SettingsContext';

export const PlanTrip: React.FC = () => {
  const itinerary = useItineraryContext();
  const [searchParams] = useSearchParams();
  const { settings } = useSettings();

  const destParam = searchParams.get('destination');
  const daysParam = searchParams.get('days');

  // Pre-fill if destination query parameter passed from hero/trending cards
  useEffect(() => {
    if (destParam && itinerary.status === 'idle') {
      const daysNum = parseInt(daysParam || '5', 10);
      itinerary.generate({
        destination: destParam,
        durationDays: isNaN(daysNum) ? 5 : daysNum,
        budget: 2000,
        currency: settings.currency,
        travelStyles: ['Balanced', 'Cultural'],
        notes: '',
      });
    }
  }, [destParam, daysParam, itinerary.status]);

  const state = {
    status: itinerary.status,
    itinerary: itinerary.itinerary,
    error: itinerary.error,
    formValues: itinerary.formValues,
    expandedIds: itinerary.expandedIds,
    revealedDayIds: itinerary.revealedDayIds,
    regeneratingIds: itinerary.regeneratingIds,
  };

  return (
    <div className="w-full">
      <AppShell state={state} actions={itinerary} />
    </div>
  );
};
