import { cn } from '@/utils/cn';

interface BudgetBarProps {
  value: number;
  max: number;
  className?: string;
  height?: string;
}

export function BudgetBar({ value, max, className, height = 'h-1.5' }: BudgetBarProps) {
  const pct = max > 0 ? Math.max(0, Math.min(100, (value / max) * 100)) : 0;

  const fillColor =
    pct >= 100 ? 'bg-voyagr-coral' :
    pct >= 80  ? 'bg-voyagr-amber' :
    'bg-voyagr-teal';

  return (
    <div className={cn('w-full rounded-full overflow-hidden bg-bg-border', height, className)}>
      <div
        className={cn('h-full rounded-full budget-bar-fill', fillColor)}
        style={{ width: `${pct}%` }}
        role="progressbar"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
}
