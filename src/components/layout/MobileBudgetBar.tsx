import { useState } from 'react';
import { ChevronUp, DollarSign } from 'lucide-react';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { BudgetPanel } from './BudgetPanel';
import { formatCurrency } from '@/utils/budget';
import type { BudgetMetrics } from '@/utils/budget';
import type { Itinerary } from '@/types/itinerary';

interface MobileBudgetBarProps {
  metrics: BudgetMetrics;
  itinerary: Itinerary;
}

export function MobileBudgetBar({ metrics, itinerary }: MobileBudgetBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Sticky footer bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
        {/* Progress bar at very top */}
        <ProgressBar value={metrics.percentUsed} className="rounded-none h-0.5" />

        <div className="bg-bg-surface border-t border-bg-border px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-text-tertiary" />
              <div>
                <span className="text-sm font-mono font-semibold text-text-primary">
                  {formatCurrency(metrics.totalPlanned, itinerary.currency)}
                </span>
                <span className="text-xs text-text-tertiary ml-1">
                  / {formatCurrency(itinerary.totalBudget, itinerary.currency)}
                </span>
              </div>
            </div>

            <button
              type="button"
              id="mobile-budget-btn"
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-bg-border bg-bg-elevated text-xs font-medium text-text-secondary hover:text-text-primary transition-all"
            >
              Budget
              <ChevronUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom sheet with full budget panel */}
      <BottomSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Budget Breakdown"
      >
        <div className="px-4 pb-6">
          <BudgetPanel
            metrics={metrics}
            itinerary={itinerary}
            compact
          />
        </div>
      </BottomSheet>
    </>
  );
}
