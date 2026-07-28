import { AlertTriangle } from 'lucide-react';
import { formatCurrency } from '@/utils/budget';

interface BudgetWarningProps {
  overage: number;
  currency: string;
}

export function BudgetWarning({ overage, currency }: BudgetWarningProps) {
  return (
    <div className="flex items-start gap-2.5 p-3 rounded-xl bg-voyagr-coral/5 border border-voyagr-coral/20">
      <AlertTriangle className="w-4 h-4 text-voyagr-coral shrink-0 mt-0.5" />
      <div>
        <p className="text-xs font-semibold text-voyagr-coral mb-0.5">Over Budget</p>
        <p className="text-xs text-text-secondary">
          Your planned activities exceed your budget by{' '}
          <span className="font-mono font-semibold text-voyagr-coral">
            {formatCurrency(overage, currency)}
          </span>
          . Remove or adjust activities to get back on track.
        </p>
      </div>
    </div>
  );
}
