import { cn } from '@/utils/cn';

interface ProgressBarProps {
  value: number; // 0–100
  className?: string;
  showGlow?: boolean;
}

export function ProgressBar({ value, className, showGlow = false }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));

  const fillColor =
    clamped >= 100
      ? 'bg-voyagr-coral'
      : clamped >= 80
      ? 'bg-voyagr-amber'
      : 'bg-voyagr-blue';

  const glowColor =
    clamped >= 100
      ? 'shadow-[0_0_8px_rgba(255,107,107,0.6)]'
      : clamped >= 80
      ? 'shadow-[0_0_8px_rgba(245,166,35,0.5)]'
      : 'shadow-[0_0_8px_rgba(79,126,255,0.4)]';

  return (
    <div className={cn('w-full h-1.5 bg-bg-border rounded-full overflow-hidden', className)}>
      <div
        className={cn('h-full rounded-full budget-bar-fill', fillColor, showGlow && glowColor)}
        style={{ width: `${clamped}%` }}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
}
