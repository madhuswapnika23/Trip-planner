import { BudgetBar } from './BudgetBar';
import { formatCurrency } from '@/utils/budget';
import { CATEGORY_ICONS, CATEGORY_LABELS } from '@/constants/categories';
import type { CategoryBudgetRow } from '@/utils/budget';

interface CategoryBreakdownProps {
  rows: CategoryBudgetRow[];
  currency: string;
}

export function CategoryBreakdown({ rows, currency }: CategoryBreakdownProps) {
  if (rows.length === 0) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider">
        By Category
      </h3>
      <div className="space-y-3">
        {rows.map((row) => {
          const Icon = CATEGORY_ICONS[row.category];
          const label = CATEGORY_LABELS[row.category];

          return (
            <div key={row.category}>
              <div className="flex items-center gap-2 mb-1">
                <Icon className="w-3.5 h-3.5 text-text-tertiary shrink-0" />
                <span className="text-xs text-text-secondary flex-1">{label}</span>
                {row.total > 0 ? (
                  <span className="text-xs font-mono text-text-secondary">
                    {formatCurrency(row.total, currency)}
                  </span>
                ) : (
                  <span className="text-xs text-text-tertiary">—</span>
                )}
              </div>
              {row.total > 0 ? (
                <BudgetBar
                  value={row.total}
                  max={rows[0]?.total || 1}
                  height="h-1"
                />
              ) : (
                <div className="h-1 w-full rounded-full bg-bg-border/50" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
