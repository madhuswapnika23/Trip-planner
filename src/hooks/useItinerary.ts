import { useReducer, useCallback } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import type { AppStatus, AppError, TripFormValues } from '@/types/ui';
import type { Itinerary, Activity } from '@/types/itinerary';
import { useGenerate } from './useGenerate';
import { useUndo } from './useUndo';
import { CONFIG } from '@/constants/config';

// ─── State Shape ─────────────────────────────────────────────────────────────

interface ItineraryState {
  status: AppStatus;
  itinerary: Itinerary | null;
  error: AppError | null;
  formValues: TripFormValues;
  expandedIds: Set<string>;
  revealedDayIds: Set<string>;
  regeneratingIds: Set<string>;
}

const DEFAULT_FORM: TripFormValues = {
  destination: '',
  durationDays: CONFIG.DEFAULT_DURATION_DAYS,
  budget: CONFIG.DEFAULT_BUDGET,
  currency: 'USD',
  travelStyles: [],
  notes: '',
};

// ─── Actions ─────────────────────────────────────────────────────────────────

type Action =
  | { type: 'SET_LOADING' }
  | { type: 'SET_SUCCESS'; payload: Itinerary }
  | { type: 'SET_ERROR'; payload: AppError }
  | { type: 'SET_EMPTY' }
  | { type: 'SET_FORM_VALUES'; payload: TripFormValues }
  | { type: 'TOGGLE_EXPANDED'; payload: string }
  | { type: 'MARK_DAY_REVEALED'; payload: string }
  | { type: 'SOFT_REMOVE_ACTIVITY'; payload: { activityId: string; dayId: string } }
  | { type: 'RESTORE_ACTIVITY'; payload: { activityId: string; dayId: string } }
  | { type: 'PURGE_ACTIVITY'; payload: { activityId: string } }
  | { type: 'REORDER_ACTIVITIES'; payload: { dayId: string; activeId: string; overId: string } }
  | { type: 'UPDATE_ACTIVITY'; payload: { dayId: string; activityId: string; updates: Partial<Activity> } }
  | { type: 'REPLACE_ACTIVITY'; payload: { dayId: string; activityId: string; newActivity: Activity } }
  | { type: 'SET_REGENERATING'; payload: { activityId: string; isRegenerating: boolean } }
  | { type: 'HYDRATE'; payload: Itinerary }
  | { type: 'RESET' };

// ─── Reducer ─────────────────────────────────────────────────────────────────

function reducer(state: ItineraryState, action: Action): ItineraryState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, status: 'loading', error: null };

    case 'SET_SUCCESS': {
      const itinerary = action.payload;
      const isEmpty = itinerary.days.every((d) => d.activities.every((a) => a.isRemoved));
      return {
        ...state,
        status: isEmpty ? 'empty' : 'success',
        itinerary,
        error: null,
        revealedDayIds: new Set(itinerary.days.map((d) => d.id)),
      };
    }

    case 'SET_ERROR':
      return { ...state, status: 'error', error: action.payload };

    case 'SET_EMPTY':
      return { ...state, status: 'empty' };

    case 'SET_FORM_VALUES':
      return { ...state, formValues: action.payload };

    case 'TOGGLE_EXPANDED': {
      const next = new Set(state.expandedIds);
      if (next.has(action.payload)) {
        next.delete(action.payload);
      } else {
        next.add(action.payload);
      }
      return { ...state, expandedIds: next };
    }

    case 'MARK_DAY_REVEALED': {
      const next = new Set(state.revealedDayIds);
      next.add(action.payload);
      return { ...state, revealedDayIds: next };
    }

    case 'SOFT_REMOVE_ACTIVITY':
      return updateActivity(state, action.payload.dayId, action.payload.activityId, {
        isRemoved: true,
      });

    case 'RESTORE_ACTIVITY':
      return updateActivity(state, action.payload.dayId, action.payload.activityId, {
        isRemoved: false,
      });

    case 'PURGE_ACTIVITY':
      return {
        ...state,
        itinerary: state.itinerary
          ? {
              ...state.itinerary,
              days: state.itinerary.days.map((day) => ({
                ...day,
                activities: day.activities.filter((a) => a.id !== action.payload.activityId),
              })),
            }
          : null,
      };

    case 'REORDER_ACTIVITIES': {
      if (!state.itinerary) return state;
      const { dayId, activeId, overId } = action.payload;
      const days = state.itinerary.days.map((day) => {
        if (day.id !== dayId) return day;
        const oldIndex = day.activities.findIndex((a) => a.id === activeId);
        const newIndex = day.activities.findIndex((a) => a.id === overId);
        if (oldIndex === -1 || newIndex === -1) return day;
        return { ...day, activities: arrayMove(day.activities, oldIndex, newIndex) };
      });
      return { ...state, itinerary: { ...state.itinerary, days } };
    }

    case 'UPDATE_ACTIVITY':
      return updateActivity(state, action.payload.dayId, action.payload.activityId, action.payload.updates);

    case 'REPLACE_ACTIVITY': {
      if (!state.itinerary) return state;
      const { dayId, activityId, newActivity } = action.payload;
      const days = state.itinerary.days.map((day) => {
        if (day.id !== dayId) return day;
        return {
          ...day,
          activities: day.activities.map((a) => (a.id === activityId ? newActivity : a)),
        };
      });
      return { ...state, itinerary: { ...state.itinerary, days } };
    }

    case 'SET_REGENERATING': {
      const next = new Set(state.regeneratingIds);
      if (action.payload.isRegenerating) {
        next.add(action.payload.activityId);
      } else {
        next.delete(action.payload.activityId);
      }
      return { ...state, regeneratingIds: next };
    }

    case 'HYDRATE':
      return {
        ...state,
        status: 'success',
        itinerary: action.payload,
        error: null,
        revealedDayIds: new Set(action.payload.days.map((d) => d.id)),
      };

    case 'RESET':
      return {
        ...INITIAL_STATE,
        formValues: state.formValues,
      };

    default:
      return state;
  }
}

function updateActivity(
  state: ItineraryState,
  dayId: string,
  activityId: string,
  updates: Partial<Activity>
): ItineraryState {
  if (!state.itinerary) return state;
  const days = state.itinerary.days.map((day) => {
    if (day.id !== dayId) return day;
    return {
      ...day,
      activities: day.activities.map((a) => (a.id === activityId ? { ...a, ...updates } : a)),
    };
  });
  return { ...state, itinerary: { ...state.itinerary, days } };
}

const INITIAL_STATE: ItineraryState = {
  status: 'idle',
  itinerary: null,
  error: null,
  formValues: DEFAULT_FORM,
  expandedIds: new Set(),
  revealedDayIds: new Set(),
  regeneratingIds: new Set(),
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useItinerary() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const undo = useUndo({
    onPermanentRemove: (activityId) => {
      dispatch({ type: 'PURGE_ACTIVITY', payload: { activityId } });
    },
    onRestore: (activityId, dayId) => {
      dispatch({ type: 'RESTORE_ACTIVITY', payload: { activityId, dayId } });
    },
  });

  const { generate: generateFn, regenerate: regenerateFn, abort } = useGenerate({
    onSuccess: (itinerary) => {
      dispatch({ type: 'SET_SUCCESS', payload: itinerary });
      // Stagger day reveal
      itinerary.days.forEach((day, i) => {
        const delay = CONFIG.DAY_REVEAL_BASE_DELAY_MS + i * CONFIG.DAY_REVEAL_STAGGER_MS;
        setTimeout(() => {
          dispatch({ type: 'MARK_DAY_REVEALED', payload: day.id });
        }, delay);
      });
    },
    onError: (error) => {
      dispatch({ type: 'SET_ERROR', payload: error });
    },
    onActivityRegenerated: (dayId, activityId, newActivity) => {
      dispatch({ type: 'REPLACE_ACTIVITY', payload: { dayId, activityId, newActivity } });
      dispatch({ type: 'SET_REGENERATING', payload: { activityId, isRegenerating: false } });
    },
  });

  const generate = useCallback(
    (formValues: TripFormValues) => {
      dispatch({ type: 'SET_LOADING' });
      dispatch({ type: 'SET_FORM_VALUES', payload: formValues });
      undo.cancelAll();
      generateFn(formValues);
    },
    [generateFn, undo]
  );

  const removeActivity = useCallback(
    (activityId: string, dayId: string) => {
      dispatch({ type: 'SOFT_REMOVE_ACTIVITY', payload: { activityId, dayId } });
      undo.enqueue(activityId, dayId);
    },
    [undo]
  );

  const undoRemove = useCallback(
    (activityId: string) => {
      undo.dequeue(activityId);
    },
    [undo]
  );

  const reorderActivity = useCallback((dayId: string, activeId: string, overId: string) => {
    dispatch({ type: 'REORDER_ACTIVITIES', payload: { dayId, activeId, overId } });
  }, []);

  const updateActivity = useCallback(
    (dayId: string, activityId: string, updates: Partial<Activity>) => {
      dispatch({ type: 'UPDATE_ACTIVITY', payload: { dayId, activityId, updates } });
    },
    []
  );

  const regenerateActivityFn = useCallback(
    (dayId: string, dayNumber: number, activity: Activity, existingNames: string[]) => {
      dispatch({ type: 'SET_REGENERATING', payload: { activityId: activity.id, isRegenerating: true } });
      regenerateFn(state.formValues, dayId, dayNumber, activity, existingNames);
    },
    [regenerateFn, state.formValues]
  );

  const toggleExpanded = useCallback((activityId: string) => {
    dispatch({ type: 'TOGGLE_EXPANDED', payload: activityId });
  }, []);

  const hydrateFromShare = useCallback((itinerary: Itinerary) => {
    dispatch({ type: 'HYDRATE', payload: itinerary });
  }, []);

  const reset = useCallback(() => {
    abort();
    undo.cancelAll();
    dispatch({ type: 'RESET' });
  }, [abort, undo]);

  const setFormValues = useCallback((values: TripFormValues) => {
    dispatch({ type: 'SET_FORM_VALUES', payload: values });
  }, []);

  return {
    // State
    status: state.status,
    itinerary: state.itinerary,
    error: state.error,
    formValues: state.formValues,
    expandedIds: state.expandedIds,
    revealedDayIds: state.revealedDayIds,
    regeneratingIds: state.regeneratingIds,
    // Actions
    generate,
    removeActivity,
    undoRemove,
    reorderActivity,
    updateActivity,
    regenerateActivity: regenerateActivityFn,
    toggleExpanded,
    hydrateFromShare,
    reset,
    setFormValues,
    abort,
  };
}

export type ItineraryActions = ReturnType<typeof useItinerary>;
