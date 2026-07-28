import type { Itinerary, Day, ActivityCategory } from '@/types/itinerary';
import { CONFIG } from '@/constants/config';

export interface DayBudgetRow {
  dayId: string;
  dayLabel: string;
  planned: number;
  isOverAverage: boolean;
}

export interface CategoryBudgetRow {
  category: ActivityCategory;
  total: number;
  percentage: number;
}

export interface BudgetMetrics {
  totalPlanned: number;
  remaining: number;
  percentUsed: number;
  isOverBudget: boolean;
  byDay: DayBudgetRow[];
  byCategory: CategoryBudgetRow[];
  warningDayIds: string[];
}

function activeActivities(day: Day) {
  return day.activities.filter((a) => !a.isRemoved);
}

function dayTotal(day: Day): number {
  return activeActivities(day).reduce((sum, a) => sum + a.estimatedCost, 0);
}

/**
 * Pure derivation of all budget metrics from an itinerary. No side effects.
 * Called from useBudget, which wraps this in useMemo keyed on the itinerary reference.
 */
export function calculateBudgetMetrics(itinerary: Itinerary): BudgetMetrics {
  const dayTotals = itinerary.days.map((day) => ({ day, total: dayTotal(day) }));
  const totalPlanned = dayTotals.reduce((sum, d) => sum + d.total, 0);
  const averageDaily = dayTotals.length > 0 ? totalPlanned / dayTotals.length : 0;

  const byDay: DayBudgetRow[] = dayTotals.map(({ day, total }) => ({
    dayId: day.id,
    dayLabel: day.label,
    planned: total,
    isOverAverage: total > averageDaily * CONFIG.BUDGET_WARNING_THRESHOLD && averageDaily > 0,
  }));

  const warningDayIds = byDay.filter((d) => d.isOverAverage).map((d) => d.dayId);

  const categoryTotals = new Map<ActivityCategory, number>();
  for (const day of itinerary.days) {
    for (const activity of activeActivities(day)) {
      categoryTotals.set(
        activity.category,
        (categoryTotals.get(activity.category) ?? 0) + activity.estimatedCost
      );
    }
  }

  const byCategory: CategoryBudgetRow[] = Array.from(categoryTotals.entries())
    .map(([category, total]) => ({
      category,
      total,
      percentage: totalPlanned > 0 ? (total / totalPlanned) * 100 : 0,
    }))
    .sort((a, b) => b.total - a.total);

  const remaining = itinerary.totalBudget - totalPlanned;
  const percentUsed =
    itinerary.totalBudget > 0 ? (totalPlanned / itinerary.totalBudget) * 100 : 0;

  return {
    totalPlanned,
    remaining,
    percentUsed,
    isOverBudget: totalPlanned > itinerary.totalBudget,
    byDay,
    byCategory,
    warningDayIds,
  };
}

export function formatCurrency(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    // Fallback if currency code is somehow invalid
    return `${currency} ${amount.toFixed(0)}`;
  }
}