import React, { createContext, useContext } from 'react';
import { useItinerary } from '@/hooks/useItinerary';

type UseItineraryReturn = ReturnType<typeof useItinerary>;

const ItineraryContext = createContext<UseItineraryReturn | null>(null);

export const ItineraryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const itinerary = useItinerary();
  return (
    <ItineraryContext.Provider value={itinerary}>
      {children}
    </ItineraryContext.Provider>
  );
};

export function useItineraryContext(): UseItineraryReturn {
  const ctx = useContext(ItineraryContext);
  if (!ctx) throw new Error('useItineraryContext must be used within ItineraryProvider');
  return ctx;
}
