import { useEffect, useRef, useState } from 'react';
import { Plane } from 'lucide-react';
import { cn } from '@/utils/cn';
import { TripForm } from './TripForm';
import type { TripFormValues } from '@/types/ui';

interface InputScreenProps {
  onSubmit: (values: TripFormValues) => void;
  initialValues?: Partial<TripFormValues>;
  isVisible: boolean;
}

const EXAMPLE_PROMPTS = [
  'Tokyo for 7 days…',
  'Bali on a $1,500 budget…',
  'Rome with culture & food…',
  'NYC adventure for 5 days…',
  'Kyoto with relaxation & art…',
];

export function InputScreen({ onSubmit, initialValues, isVisible }: InputScreenProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [promptIndex, setPromptIndex] = useState(0);
  const [promptVisible, setPromptVisible] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Cycle placeholder prompts with fade
  useEffect(() => {
    if (isExpanded) return;
    intervalRef.current = setInterval(() => {
      setPromptVisible(false);
      setTimeout(() => {
        setPromptIndex((i) => (i + 1) % EXAMPLE_PROMPTS.length);
        setPromptVisible(true);
      }, 400);
    }, 2800);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isExpanded]);

  if (!isVisible) return null;

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 min-h-screen">
      {/* Hero */}
      <div className={cn('text-center mb-12 transition-all duration-500', isExpanded && 'mb-8')}>
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-voyagr-blue to-indigo-600 flex items-center justify-center shadow-lg shadow-voyagr-blue/30">
            <Plane className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-3xl font-display font-bold text-text-primary tracking-tight">
            Voyagr
          </h1>
        </div>
        {!isExpanded && (
          <div className="animate-fadeIn">
            <p className="text-xl text-text-secondary font-body mb-2">
              Plan less. Experience more.
            </p>
            <p
              className={cn(
                'text-text-tertiary text-base transition-opacity duration-400',
                promptVisible ? 'opacity-100' : 'opacity-0'
              )}
            >
              {EXAMPLE_PROMPTS[promptIndex]}
            </p>
          </div>
        )}
      </div>

      {/* Card */}
      <div
        className={cn(
          'w-full transition-all duration-500',
          isExpanded ? 'max-w-2xl' : 'max-w-md'
        )}
      >
        {!isExpanded ? (
          /* Collapsed — single click-to-expand bar */
          <button
            type="button"
            id="start-planning-btn"
            onClick={() => setIsExpanded(true)}
            className={cn(
              'w-full h-14 rounded-2xl border border-bg-border bg-bg-surface',
              'flex items-center px-5 gap-3',
              'text-text-tertiary text-base text-left',
              'hover:border-voyagr-blue/50 hover:bg-bg-elevated hover:text-text-secondary',
              'transition-all duration-200 group shadow-sm'
            )}
          >
            <Plane className="w-4 h-4 shrink-0 group-hover:text-voyagr-blue transition-colors" />
            <span>Where are you going?</span>
          </button>
        ) : (
          /* Expanded — full form */
          <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 shadow-xl animate-slideUp">
            <TripForm
              initialValues={initialValues}
              onSubmit={onSubmit}
            />
          </div>
        )}
      </div>

      {/* Footer tagline */}
      {!isExpanded && (
        <p className="mt-8 text-xs text-text-tertiary text-center animate-fadeIn">
          AI-powered itineraries · Zero tab-switching · Real plans
        </p>
      )}
    </div>
  );
}
