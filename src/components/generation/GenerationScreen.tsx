import { useEffect, useRef, useState } from 'react';
import { X, MapPin, Calendar, DollarSign } from 'lucide-react';
import { StatusMessage } from './StatusMessage';
import { ItinerarySkeleton } from './ItinerarySkeleton';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import { STATUS_MESSAGES } from '@/constants/config';
import type { TripFormValues } from '@/types/ui';
import { formatCurrency } from '@/utils/budget';

interface GenerationScreenProps {
  formValues: TripFormValues;
  onCancel: () => void;
}

export function GenerationScreen({ formValues, onCancel }: GenerationScreenProps) {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  // Animate progress to 85% — never lies, snaps to 100% externally on completion
  useEffect(() => {
    const target = 85;
    const duration = 12000; // 12 seconds
    const start = Date.now();

    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / duration) * target, target);
      setProgress(pct);
      if (pct < target) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  const customMessages = STATUS_MESSAGES.map((msg) =>
    msg.replace('neighborhoods', `${formValues.destination} neighborhoods`)
      .replace('Mapping your budget…', `Mapping ${formValues.durationDays} days across ${formatCurrency(formValues.budget, formValues.currency)}…`)
  );

  return (
    <div className="flex-1 flex flex-col">
      {/* Status strip */}
      <div className="sticky top-0 z-10 bg-bg-surface border-b border-bg-border px-4 py-3">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-1.5 text-sm text-text-secondary">
                <MapPin className="w-3.5 h-3.5 text-voyagr-blue" />
                <span className="text-text-primary font-medium">{formValues.destination || 'Your destination'}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-text-secondary">
                <Calendar className="w-3.5 h-3.5" />
                <span>{formValues.durationDays} days</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-text-secondary">
                <DollarSign className="w-3.5 h-3.5" />
                <span>{formatCurrency(formValues.budget, formValues.currency)}</span>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={onCancel}
              leftIcon={<X className="w-4 h-4" />}
            >
              Cancel
            </Button>
          </div>

          <ProgressBar value={progress} />

          <div className="mt-2 text-xs text-text-tertiary">
            <StatusMessage messages={customMessages} />
          </div>
        </div>
      </div>

      {/* Skeleton preview below */}
      <div className="flex-1 px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <ItinerarySkeleton durationDays={formValues.durationDays} />
        </div>
      </div>
    </div>
  );
}
