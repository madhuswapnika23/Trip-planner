import { z } from 'zod';
import {
  costTierSchema,
  energyLevelSchema,
  activityCategorySchema,
} from '@/schema/itinerarySchema';

// A lenient schema for validating deserialized (already-domain-shaped) itinerary
// state coming back from a shared URL. Distinct from the raw AI response schema.
const activityStateSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  location: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  durationHrs: z.number(),
  category: activityCategorySchema,
  costTier: costTierSchema,
  estimatedCost: z.number(),
  energyLevel: energyLevelSchema,
  timeOfDay: z.enum(['morning', 'afternoon', 'evening']),
  proTip: z.string().nullable(),
  isRemoved: z.boolean(),
  isHiddenGem: z.boolean().optional(),
});

const dayStateSchema = z.object({
  id: z.string(),
  dayNumber: z.number(),
  date: z.string().nullable(),
  label: z.string(),
  activities: z.array(activityStateSchema),
});

export const itineraryStateSchema = z.object({
  id: z.string(),
  destination: z.string(),
  totalDays: z.number(),
  currency: z.string(),
  totalBudget: z.number(),
  days: z.array(dayStateSchema),
  generatedAt: z.number(),
  partialFailure: z
    .object({
      failedDays: z.array(z.number()),
    })
    .optional(),
});