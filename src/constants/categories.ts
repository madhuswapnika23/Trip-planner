import type { ActivityCategory, CostTier, EnergyLevel } from '@/types/itinerary';
import {
  Landmark,
  Utensils,
  Bus,
  Building2,
  ShoppingBag,
  Mountain,
  Music,
  Sparkles,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const TRAVEL_STYLES = [
  'Culture',
  'Food',
  'Adventure',
  'Relaxation',
  'Art',
  'Shopping',
  'Nightlife',
  'Family',
] as const;

export const CATEGORY_ICONS: Record<ActivityCategory, LucideIcon> = {
  culture: Landmark,
  food: Utensils,
  transport: Bus,
  accommodation: Building2,
  shopping: ShoppingBag,
  nature: Mountain,
  nightlife: Music,
  wellness: Sparkles,
};

export const CATEGORY_LABELS: Record<ActivityCategory, string> = {
  culture: 'Culture',
  food: 'Food',
  transport: 'Transport',
  accommodation: 'Accommodation',
  shopping: 'Shopping',
  nature: 'Nature',
  nightlife: 'Nightlife',
  wellness: 'Wellness',
};

export const COST_TIER_LABELS: Record<CostTier, string> = {
  free: 'Free',
  budget: 'Budget',
  moderate: 'Moderate',
  splurge: 'Splurge',
};

export const COST_TIER_COLORS: Record<CostTier, string> = {
  free: 'text-voyagr-teal border-voyagr-teal/40 bg-voyagr-teal/10',
  budget: 'text-voyagr-blue border-voyagr-blue/40 bg-voyagr-blue/10',
  moderate: 'text-voyagr-amber border-voyagr-amber/40 bg-voyagr-amber/10',
  splurge: 'text-voyagr-coral border-voyagr-coral/40 bg-voyagr-coral/10',
};

export const ENERGY_LEVEL_LABELS: Record<EnergyLevel, string> = {
  low: '⚡ Low',
  medium: '⚡⚡ Medium',
  high: '⚡⚡⚡ High',
};

export const ENERGY_LEVEL_COLORS: Record<EnergyLevel, string> = {
  low: 'text-voyagr-teal',
  medium: 'text-voyagr-amber',
  high: 'text-voyagr-coral',
};