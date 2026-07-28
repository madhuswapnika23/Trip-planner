import { cn } from '@/utils/cn';
import type { CostTier, EnergyLevel } from '@/types/itinerary';
import { COST_TIER_LABELS, COST_TIER_COLORS, ENERGY_LEVEL_LABELS, ENERGY_LEVEL_COLORS } from '@/constants/categories';

interface CostBadgeProps {
  tier: CostTier;
  className?: string;
}

interface EnergyBadgeProps {
  level: EnergyLevel;
  className?: string;
}

export function CostBadge({ tier, className }: CostBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border',
        COST_TIER_COLORS[tier],
        className
      )}
    >
      {COST_TIER_LABELS[tier]}
    </span>
  );
}

export function EnergyBadge({ level, className }: EnergyBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center text-xs font-medium',
        ENERGY_LEVEL_COLORS[level],
        className
      )}
    >
      {ENERGY_LEVEL_LABELS[level]}
    </span>
  );
}
