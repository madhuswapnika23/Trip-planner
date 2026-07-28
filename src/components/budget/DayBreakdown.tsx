import { AlertTriangle } from 'lucide-react';
import { cn } from '@/utils/cn';
import { BudgetBar } from './BudgetBar';
import { formatCurrency } from '@/utils/budget';
import type { DayBudgetRow } from '@/utils/budget';

interface DayBreakdownProps {
  rows: DayBudgetRow[];
  totalPlanned: number;
  currency: string;
}

export function DayBreakdown({ rows, totalPlanned, currency }: DayBreakdownProps) {
  if (rows.length === 0) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider">
        By Day
      </h3>
      <div className="space-y-3">
        {rows.map((row) => (
          <div key={row.dayId}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-text-secondary">{row.dayLabel}</span>
                {row.isOverAverage && (
                  <AlertTriangle className="w-3 h-3 text-voyagr-amber" aria-label="Above average spend" />
                )}
              </div>
              <span className={cn(
                'text-xs font-mono',
                row.isOverAverage ? 'text-voyagr-amber' : 'text-text-secondary'
              )}>
                {formatCurrency(row.planned, currency)}
              </span>
            </div>
            <BudgetBar
              value={row.planned}
              max={totalPlanned || 1}
              height="h-1"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
