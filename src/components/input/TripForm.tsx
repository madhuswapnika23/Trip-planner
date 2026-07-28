import { useReducer, useState, useCallback } from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '@/utils/cn';
import { DestinationField } from './DestinationField';
import { DurationSelector } from './DurationSelector';
import { BudgetSlider } from './BudgetSlider';
import { StylePicker } from './StylePicker';
import { NotesField } from './NotesField';
import type { TripFormValues } from '@/types/ui';
import { CONFIG } from '@/constants/config';

// ─── Form State via useReducer (interview point: not per-field useState) ──────

type FormAction =
  | { type: 'SET_DESTINATION'; payload: string }
  | { type: 'SET_DURATION'; payload: number }
  | { type: 'SET_BUDGET'; payload: number }
  | { type: 'SET_CURRENCY'; payload: string }
  | { type: 'SET_STYLES'; payload: string[] }
  | { type: 'SET_NOTES'; payload: string }
  | { type: 'RESET' };

const DEFAULT_FORM: TripFormValues = {
  destination: '',
  durationDays: CONFIG.DEFAULT_DURATION_DAYS,
  budget: CONFIG.DEFAULT_BUDGET,
  currency: 'USD',
  travelStyles: [],
  notes: '',
};

function formReducer(state: TripFormValues, action: FormAction): TripFormValues {
  switch (action.type) {
    case 'SET_DESTINATION': return { ...state, destination: action.payload };
    case 'SET_DURATION':    return { ...state, durationDays: action.payload };
    case 'SET_BUDGET':      return { ...state, budget: action.payload };
    case 'SET_CURRENCY':    return { ...state, currency: action.payload };
    case 'SET_STYLES':      return { ...state, travelStyles: action.payload };
    case 'SET_NOTES':       return { ...state, notes: action.payload };
    case 'RESET':           return DEFAULT_FORM;
    default: return state;
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

interface TripFormProps {
  initialValues?: Partial<TripFormValues>;
  onSubmit: (values: TripFormValues) => void;
  isLoading?: boolean;
}

export function TripForm({ initialValues, onSubmit, isLoading }: TripFormProps) {
  const [form, dispatch] = useReducer(formReducer, { ...DEFAULT_FORM, ...initialValues });
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!form.destination.trim()) {
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 600);
        return;
      }
      onSubmit(form);
    },
    [form, onSubmit]
  );

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <DestinationField
        value={form.destination}
        onChange={(v) => dispatch({ type: 'SET_DESTINATION', payload: v })}
        isShaking={isShaking}
      />

      <DurationSelector
        value={form.durationDays}
        onChange={(v) => dispatch({ type: 'SET_DURATION', payload: v })}
      />

      <BudgetSlider
        value={form.budget}
        onChange={(v) => dispatch({ type: 'SET_BUDGET', payload: v })}
        currency={form.currency}
      />

      <StylePicker
        selected={form.travelStyles}
        onChange={(v) => dispatch({ type: 'SET_STYLES', payload: v })}
      />

      <NotesField
        value={form.notes}
        onChange={(v) => dispatch({ type: 'SET_NOTES', payload: v })}
      />

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className={cn(
          'w-full h-14 rounded-xl font-display font-bold text-md text-white',
          'bg-gradient-to-r from-voyagr-blue to-indigo-500',
          'relative overflow-hidden transition-all duration-200',
          'hover:shadow-lg hover:shadow-voyagr-blue/30 hover:scale-[1.01]',
          'active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed',
          'group'
        )}
      >
        {/* Shimmer overlay */}
        <span
          className={cn(
            'absolute inset-0 -translate-x-full group-hover:translate-x-full',
            'bg-gradient-to-r from-transparent via-white/15 to-transparent',
            'transition-transform duration-700 ease-in-out'
          )}
          aria-hidden="true"
        />
        <span className="relative flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5" />
          {isLoading ? 'Generating…' : 'Generate My Itinerary'}
        </span>
      </button>
    </form>
  );
}
