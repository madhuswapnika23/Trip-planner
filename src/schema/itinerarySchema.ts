import { z } from 'zod';

export const costTierSchema = z.enum(['free', 'budget', 'moderate', 'splurge']);

export const energyLevelSchema = z.enum(['low', 'medium', 'high']);

export const activityCategorySchema = z.enum([
  'culture',
  'food',
  'transport',
  'accommodation',
  'shopping',
  'nature',
  'nightlife',
  'wellness',
]);

const timeStringSchema = z.string().regex(/^\d{2}:\d{2}$/, 'Must be in HH:MM format');

export const rawActivitySchema = z.object({
  name: z.string().min(1).max(80),
  description: z.string().min(10).max(400),
  location: z.string().min(1).max(100),
  start_time: timeStringSchema,
  end_time: timeStringSchema,
  category: activityCategorySchema,
  cost_tier: costTierSchema,
  estimated_cost: z.number().min(0).max(10000),
  energy_level: energyLevelSchema,
  pro_tip: z.string().max(200).nullable(),
});

export const rawDaySchema = z.object({
  day_number: z.number().int().positive(),
  activities: z.array(rawActivitySchema).min(1).max(8),
});

export const rawAIResponseSchema = z.object({
  destination: z.string().min(1).max(100),
  currency: z.string().length(3),
  days: z.array(rawDaySchema).min(1).max(30),
});

export type RawActivityParsed = z.infer<typeof rawActivitySchema>;
export type RawDayParsed = z.infer<typeof rawDaySchema>;
export type RawAIResponseParsed = z.infer<typeof rawAIResponseSchema>;