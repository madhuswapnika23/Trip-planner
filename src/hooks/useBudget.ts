import { useMemo } from 'react';
import type { Itinerary } from '@/types/itinerary';
import { calculateBudgetMetrics, type BudgetMetrics } from '@/utils/budget';

/**
 * Pure derivation of all budget metrics from the itinerary.
 * useMemo ensures recalculation only when the itinerary reference changes.
 * Components subscribe to this hook to get live budget numbers.
 */
export function useBudget(itinerary: Itinerary | null): BudgetMetrics | null {
  return useMemo(() => {
    if (!itinerary) return null;
    return calculateBudgetMetrics(itinerary);
  }, [itinerary]);
}
