import { useEffect, useMemo } from 'react';
import type { Itinerary } from '@/types/itinerary';
import { buildShareUrl, getTripParamFromUrl, deserializeItinerary } from '@/utils/serialization';

interface UseShareUrlOptions {
  itinerary: Itinerary | null;
  onHydrate: (itinerary: Itinerary) => void;
}

/**
 * Manages shareable URL state.
 * On mount: checks for ?trip= URL param and hydrates state from it.
 * shareUrl is derived from the current itinerary on demand.
 */
export function useShareUrl({ itinerary, onHydrate }: UseShareUrlOptions) {
  // On mount, check for a shared itinerary in the URL
  useEffect(() => {
    const param = getTripParamFromUrl();
    if (!param) return;

    const restored = deserializeItinerary(param);
    if (restored) {
      onHydrate(restored);
      // Clean up the URL so sharing the current page doesn't re-trigger
      const url = new URL(window.location.href);
      url.searchParams.delete('trip');
      window.history.replaceState({}, '', url.toString());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only on mount

  const shareUrl = useMemo(() => {
    if (!itinerary) return null;
    return buildShareUrl(itinerary);
  }, [itinerary]);

  return { shareUrl };
}
