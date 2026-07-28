import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface PartialErrorBannerProps {
  failedDays: number[];
  onRegenerate?: () => void;
}

export function PartialErrorBanner({ failedDays, onRegenerate }: PartialErrorBannerProps) {
  const dayList =
    failedDays.length === 1
      ? `Day ${failedDays[0]}`
      : `Days ${failedDays.join(', ')}`;

  return (
    <div className="flex items-center gap-3 px-4 py-3 mb-4 rounded-xl bg-voyagr-amber/5 border border-voyagr-amber/25 animate-slideUp">
      <AlertCircle className="w-4 h-4 text-voyagr-amber shrink-0" />
      <p className="text-sm text-text-secondary flex-1">
        <span className="text-voyagr-amber font-semibold">{dayList} couldn't be generated</span>{' '}
        and are not shown. The rest of your itinerary is complete.
      </p>
      {onRegenerate && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onRegenerate}
          leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
          className="text-voyagr-amber hover:text-amber-300 shrink-0 text-xs"
        >
          Regenerate
        </Button>
      )}
    </div>
  );
}
