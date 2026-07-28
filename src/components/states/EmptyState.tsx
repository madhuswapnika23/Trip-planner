import { Plane } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface EmptyStateProps {
  onRetry: () => void;
}

export function EmptyState({ onRetry }: EmptyStateProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
      <div className="animate-drift mb-8 text-text-tertiary/50">
        <Plane className="w-16 h-16" />
      </div>
      <h2 className="text-xl font-display font-bold text-text-primary mb-3">
        No Itinerary Generated
      </h2>
      <p className="text-sm text-text-secondary max-w-sm mb-8 leading-relaxed">
        The AI couldn't plan this trip. Try being more specific about your
        destination, or adjust your budget and travel styles.
      </p>
      <Button variant="primary" size="lg" onClick={onRetry}>
        Try a Different Prompt
      </Button>
    </div>
  );
}
