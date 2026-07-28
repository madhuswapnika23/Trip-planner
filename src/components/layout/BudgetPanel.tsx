import { BudgetOverview } from '@/components/budget/BudgetOverview';
import { DayBreakdown } from '@/components/budget/DayBreakdown';
import { CategoryBreakdown } from '@/components/budget/CategoryBreakdown';
import { BudgetWarning } from '@/components/budget/BudgetWarning';
import type { BudgetMetrics } from '@/utils/budget';
import type { Itinerary } from '@/types/itinerary';

interface BudgetPanelProps {
  metrics: BudgetMetrics;
  itinerary: Itinerary;
  compact?: boolean;
}

export function BudgetPanel({ metrics, itinerary, compact }: BudgetPanelProps) {
  return (
    <div className="space-y-6 py-4">
      {metrics.isOverBudget && (
        <BudgetWarning
          overage={Math.abs(metrics.remaining)}
          currency={itinerary.currency}
        />
      )}

      <BudgetOverview
        metrics={metrics}
        totalBudget={itinerary.totalBudget}
        currency={itinerary.currency}
      />

      {!compact && <div className="h-px bg-bg-border" />}

      <DayBreakdown
        rows={metrics.byDay}
        totalPlanned={metrics.totalPlanned}
        currency={itinerary.currency}
      />

      {metrics.byCategory.length > 0 && (
        <>
          {!compact && <div className="h-px bg-bg-border" />}
          <CategoryBreakdown
            rows={metrics.byCategory}
            currency={itinerary.currency}
          />
        </>
      )}
    </div>
  );
}
