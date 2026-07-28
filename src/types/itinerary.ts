export type CostTier = 'free' | 'budget' | 'moderate' | 'splurge';

export type EnergyLevel = 'low' | 'medium' | 'high';

export type TimeOfDay = 'morning' | 'afternoon' | 'evening';

export type ActivityCategory =
  | 'culture'
  | 'food'
  | 'transport'
  | 'accommodation'
  | 'shopping'
  | 'nature'
  | 'nightlife'
  | 'wellness';

export interface Activity {
  id: string;
  name: string;
  description: string;
  location: string;
  startTime: string; // HH:MM, 24hr
  endTime: string; // HH:MM, 24hr
  durationHrs: number;
  category: ActivityCategory;
  costTier: CostTier;
  estimatedCost: number;
  energyLevel: EnergyLevel;
  timeOfDay: TimeOfDay;
  proTip: string | null;
  isRemoved: boolean;
  isHiddenGem?: boolean;
}

export interface Day {
  id: string;
  dayNumber: number;
  date: string | null;
  label: string;
  activities: Activity[];
}

export interface Itinerary {
  id: string;
  destination: string;
  totalDays: number;
  currency: string;
  totalBudget: number;
  days: Day[];
  generatedAt: number;
  partialFailure?: {
    failedDays: number[];
  };
}

export interface UndoItem {
  activityId: string;
  dayId: string;
  timeoutId: ReturnType<typeof setTimeout>;
}