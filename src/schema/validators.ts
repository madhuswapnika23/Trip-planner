import { rawAIResponseSchema, rawDaySchema, type RawDayParsed } from './itinerarySchema';
import type { Activity, Day, Itinerary, TimeOfDay } from '@/types/itinerary';
import type { TripFormValues } from '@/types/ui';
import { generateId } from '@/utils/idGenerator';
import { deriveTimeOfDay } from '@/utils/time';

/**
 * Strips markdown code fences from an LLM response, defensively.
 * Even with response_format: json_object this can still happen with some providers.
 */
export function stripMarkdownFences(raw: string): string {
  const trimmed = raw.trim();
  const fenceMatch = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/);
  return fenceMatch ? fenceMatch[1].trim() : trimmed;
}

export interface ParseResult {
  success: boolean;
  itinerary: Itinerary | null;
  failedDayNumbers: number[];
}

/**
 * Parses and validates a raw JSON string from the AI, transforming it into
 * domain types. Runs Zod validation per-day so that a single malformed day
 * doesn't invalidate the entire itinerary (partial failure recovery).
 */
export function parseAndValidateItinerary(
  rawText: string,
  formValues: TripFormValues
): ParseResult {
  let parsedJson: unknown;

  try {
    const cleaned = stripMarkdownFences(rawText);
    parsedJson = JSON.parse(cleaned);
  } catch (err) {
    console.error('JSON.parse failed:', err, 'Raw text:', rawText);
    return { success: false, itinerary: null, failedDayNumbers: [] };
  }

  // First, try the full-document parse. If it fails, fall back to
  // per-day validation to salvage what we can (partial failure).
  const fullParse = rawAIResponseSchema.safeParse(parsedJson);

  if (fullParse.success) {
    const itinerary = transformToItinerary(fullParse.data, formValues);
    return { success: true, itinerary, failedDayNumbers: [] };
  }

  console.error('Full schema validation failed:', fullParse.error.issues);

  // Attempt per-day salvage if the top-level shape is at least plausible.
  const maybeDoc = parsedJson as { destination?: unknown; currency?: unknown; days?: unknown };
  if (!Array.isArray(maybeDoc.days)) {
    return { success: false, itinerary: null, failedDayNumbers: [] };
  }

  const validDays: RawDayParsed[] = [];
  const failedDayNumbers: number[] = [];

  for (const rawDay of maybeDoc.days as unknown[]) {
    const dayResult = rawDaySchema.safeParse(rawDay);
    if (dayResult.success) {
      validDays.push(dayResult.data);
    } else {
      const dayNumber =
        typeof (rawDay as { day_number?: unknown })?.day_number === 'number'
          ? (rawDay as { day_number: number }).day_number
          : -1;
      failedDayNumbers.push(dayNumber);
      console.error(`Day ${dayNumber} validation failed:`, dayResult.error.issues);
    }
  }

  if (validDays.length === 0) {
    return { success: false, itinerary: null, failedDayNumbers };
  }

  const destination =
    typeof maybeDoc.destination === 'string' ? maybeDoc.destination : formValues.destination;
  const currency = typeof maybeDoc.currency === 'string' ? maybeDoc.currency : formValues.currency;

  const itinerary = transformToItinerary({ destination, currency, days: validDays }, formValues);
  itinerary.partialFailure = { failedDays: failedDayNumbers.filter((n) => n > 0) };

  return { success: true, itinerary, failedDayNumbers };
}

function transformToItinerary(
  raw: { destination: string; currency: string; days: RawDayParsed[] },
  formValues: TripFormValues
): Itinerary {
  const days: Day[] = raw.days.map((rawDay) => transformDay(rawDay));

  return {
    id: generateId(),
    destination: raw.destination,
    totalDays: days.length,
    currency: raw.currency,
    totalBudget: formValues.budget,
    days,
    generatedAt: Date.now(),
  };
}

function transformDay(rawDay: RawDayParsed): Day {
  const activities: Activity[] = rawDay.activities.map((rawActivity) => {
    const timeOfDay: TimeOfDay = deriveTimeOfDay(rawActivity.start_time);
    const durationHrs = computeDurationHrs(rawActivity.start_time, rawActivity.end_time);

    return {
      id: generateId(),
      name: rawActivity.name,
      description: rawActivity.description,
      location: rawActivity.location,
      startTime: rawActivity.start_time,
      endTime: rawActivity.end_time,
      durationHrs,
      category: rawActivity.category,
      costTier: rawActivity.cost_tier,
      estimatedCost: rawActivity.estimated_cost,
      energyLevel: rawActivity.energy_level,
      timeOfDay,
      proTip: rawActivity.pro_tip,
      isRemoved: false,
    };
  });

  return {
    id: generateId(),
    dayNumber: rawDay.day_number,
    date: null,
    label: `Day ${rawDay.day_number}`,
    activities,
  };
}

function computeDurationHrs(startTime: string, endTime: string): number {
  const [startH, startM] = startTime.split(':').map(Number);
  const [endH, endM] = endTime.split(':').map(Number);
  const startMinutes = startH * 60 + startM;
  let endMinutes = endH * 60 + endM;
  if (endMinutes < startMinutes) {
    endMinutes += 24 * 60; // handles activities crossing midnight
  }
  return Math.round(((endMinutes - startMinutes) / 60) * 10) / 10;
}