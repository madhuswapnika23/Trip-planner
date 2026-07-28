import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';
import { formatCurrency } from '@/utils/budget';
import type { Day } from '@/types/itinerary';

interface DayHeaderProps {
  day: Day;
  currency: string;
  dailyTotal: number;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const DAY_COLORS = [
  'from-voyagr-blue/10 to-indigo-500/5',
  'from-voyagr-teal/10 to-emerald-500/5',
  'from-voyagr-amber/10 to-orange-500/5',
  'from-voyagr-coral/10 to-pink-500/5',
  'from-purple-500/10 to-violet-500/5',
  'from-cyan-500/10 to-sky-500/5',
  'from-green-500/10 to-emerald-500/5',
];

export function DayHeader({ day, currency, dailyTotal, isCollapsed, onToggleCollapse }: DayHeaderProps) {
  const [isHovered, setIsHovered] = useState(false);
  const colorClass = DAY_COLORS[(day.dayNumber - 1) % DAY_COLORS.length];
  const visibleCount = day.activities.filter((a) => !a.isRemoved).length;

  return (
    <div
      className={cn(
        'sticky top-0 z-10 px-4 py-3',
        'bg-gradient-to-r', colorClass,
        'border-b border-bg-border/50',
        'backdrop-blur-md bg-bg-surface/90',
        'flex items-center justify-between',
        'cursor-pointer select-none group',
        'transition-all duration-150',
        isHovered && 'bg-bg-elevated/90'
      )}
      onClick={onToggleCollapse}
      role="button"
      tabIndex={0}
      aria-expanded={!isCollapsed}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggleCollapse(); } }}
    >
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 rounded-full bg-voyagr-blue/20 flex items-center justify-center">
          <span className="text-xs font-bold text-voyagr-blue font-mono">{day.dayNumber}</span>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-text-primary">{day.label}</h2>
          <p className="text-xs text-text-tertiary">
            {visibleCount} activit{visibleCount !== 1 ? 'ies' : 'y'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {dailyTotal > 0 && (
          <span className="text-xs font-mono text-text-secondary">
            {formatCurrency(dailyTotal, currency)}
          </span>
        )}
        <ChevronDown
          className={cn(
            'w-4 h-4 text-text-tertiary transition-transform duration-200',
            isCollapsed && '-rotate-90'
          )}
        />
      </div>
    </div>
  );
}
