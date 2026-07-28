import { useCallback, useRef } from 'react';
import { generateItinerary } from '@/api/generateItinerary';
import { regenerateActivity } from '@/api/regenerateActivity';
import type { Itinerary, Activity } from '@/types/itinerary';
import type { TripFormValues, AppError } from '@/types/ui';

interface UseGenerateOptions {
  onSuccess: (itinerary: Itinerary) => void;
  onError: (error: AppError) => void;
  onActivityRegenerated: (dayId: string, activityId: string, newActivity: Activity) => void;
}

/**
 * Race condition guard hook.
 * Every generate call creates a new requestId. The response is only accepted
 * if the captured requestId still matches the current one at response time.
 * This prevents stale responses from overwriting newer ones.
 */
export function useGenerate({ onSuccess, onError, onActivityRegenerated }: UseGenerateOptions) {
  const requestIdRef = useRef<string>('');
  const abortControllerRef = useRef<AbortController | null>(null);

  const generate = useCallback(
    async (formValues: TripFormValues) => {
      // Cancel any in-flight request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const requestId = crypto.randomUUID();
      requestIdRef.current = requestId;
      abortControllerRef.current = new AbortController();

      try {
        const itinerary = await generateItinerary(formValues, abortControllerRef.current.signal);

        // Stale response guard
        if (requestIdRef.current !== requestId) return;

        onSuccess(itinerary);
      } catch (err: unknown) {
        if (requestIdRef.current !== requestId) return;

        // Ignore abort errors (user-initiated cancel)
        if (err instanceof Error && err.name === 'AbortError') return;

        const appError = isAppError(err)
          ? err
          : { type: 'network' as const, message: 'Something went wrong.', retryable: true };
        onError(appError);
      }
    },
    [onSuccess, onError]
  );

  const regenerate = useCallback(
    async (
      formValues: TripFormValues,
      dayId: string,
      dayNumber: number,
      activity: Activity,
      existingNames: string[]
    ) => {
      try {
        const newActivity = await regenerateActivity(
          formValues,
          dayNumber,
          existingNames,
          activity.startTime,
          activity.endTime
        );
        onActivityRegenerated(dayId, activity.id, newActivity);
      } catch (err: unknown) {
        const appError = isAppError(err)
          ? err
          : { type: 'network' as const, message: 'Could not regenerate activity.', retryable: true };
        onError(appError);
      }
    },
    [onActivityRegenerated, onError]
  );

  const abort = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    requestIdRef.current = '';
  }, []);

  return { generate, regenerate, abort };
}

function isAppError(err: unknown): err is AppError {
  return (
    typeof err === 'object' &&
    err !== null &&
    'type' in err &&
    'message' in err &&
    'retryable' in err
  );
}
