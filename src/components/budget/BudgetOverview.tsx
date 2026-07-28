import { cn } from '@/utils/cn';
import { BudgetBar } from './BudgetBar';
import { formatCurrency } from '@/utils/budget';
import type { BudgetMetrics } from '@/utils/budget';

interface BudgetOverviewProps {
  metrics: BudgetMetrics;
  totalBudget: number;
  currency: string;
}

export function BudgetOverview({ metrics, totalBudget, currency }: BudgetOverviewProps) {
  const fmt = (n: number) => formatCurrency(n, currency);

  return (
    <div className="space-y-4">
      {/* Main numbers */}
      <div className="grid grid-cols-3 gap-3">
        <div className="text-center">
          <p className="text-xs text-text-tertiary mb-1">Budget</p>
          <p className="text-md font-mono font-semibold text-text-primary">{fmt(totalBudget)}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-text-tertiary mb-1">Planned</p>
          <p className={cn(
            'text-md font-mono font-semibold',
            metrics.isOverBudget ? 'text-voyagr-coral' : 'text-text-primary'
          )}>
            {fmt(metrics.totalPlanned)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-text-tertiary mb-1">Remaining</p>
          <p className={cn(
            'text-md font-mono font-semibold',
            metrics.remaining < 0 ? 'text-voyagr-coral' : 'text-voyagr-teal'
          )}>
            {metrics.remaining < 0 ? '-' : '+'}{fmt(Math.abs(metrics.remaining))}
          </p>
        </div>
      </div>

      {/* Budget bar */}
      <div>
        <div className="flex justify-between mb-1.5">
          <span className="text-xs text-text-tertiary">
            {Math.round(metrics.percentUsed)}% of budget
          </span>
          {metrics.isOverBudget && (
            <span className="text-xs text-voyagr-coral font-medium">Over budget</span>
          )}
        </div>
        <BudgetBar
          value={metrics.totalPlanned}
          max={totalBudget}
          height="h-2"
        />
      </div>
    </div>
  );
}
