import { rawAIResponseSchema, rawDaySchema, type RawDayParsed } from './itinerarySchema';
import type { Activity, Day, Itinerary, TimeOfDay } from '@/types/itinerary';
import type { TripFormValues } from '@/types/ui';
import { generateId } from '@/utils/idGenerator';
import { deriveTimeOfDay } from '@/utils/time';

/**
 * Strips markdown code fences from an LLM response, defensively.
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

function normalizeTimeString(val: unknown): string {
  if (typeof val !== 'string') return '09:00';
  let s = val.trim();
  const ampmMatch = s.match(/^(\d{1,2}):(\d{2})(?::\d{2})?\s*([AP]M)?$/i);
  if (ampmMatch) {
    let hours = parseInt(ampmMatch[1], 10);
    const minutes = ampmMatch[2];
    const ampm = ampmMatch[3]?.toUpperCase();
    if (ampm === 'PM' && hours < 12) hours += 12;
    if (ampm === 'AM' && hours === 12) hours = 0;
    return `${hours.toString().padStart(2, '0')}:${minutes}`;
  }
  return '09:00';
}

function normalizeCategory(val: unknown) {
  if (typeof val !== 'string') return 'culture';
  const s = val.toLowerCase().trim();
  const valid = ['culture', 'food', 'transport', 'accommodation', 'shopping', 'nature', 'nightlife', 'wellness'];
  if (valid.includes(s)) return s;
  if (s.includes('food') || s.includes('eat') || s.includes('din') || s.includes('culinary') || s.includes('restaurant')) return 'food';
  if (s.includes('nature') || s.includes('outdoor') || s.includes('beach') || s.includes('park') || s.includes('sight') || s.includes('tour')) return 'nature';
  if (s.includes('shop') || s.includes('market') || s.includes('store')) return 'shopping';
  if (s.includes('night') || s.includes('bar') || s.includes('club') || s.includes('pub')) return 'nightlife';
  if (s.includes('well') || s.includes('relax') || s.includes('spa') || s.includes('massage')) return 'wellness';
  if (s.includes('hotel') || s.includes('stay') || s.includes('resort')) return 'accommodation';
  if (s.includes('transport') || s.includes('travel') || s.includes('flight') || s.includes('ride')) return 'transport';
  return 'culture';
}

function normalizeCostTier(val: unknown) {
  if (typeof val !== 'string') return 'budget';
  const s = val.toLowerCase().trim();
  if (['free', 'budget', 'moderate', 'splurge'].includes(s)) return s;
  if (s.includes('free') || s === '0') return 'free';
  if (s.includes('cheap') || s.includes('low') || s.includes('budget')) return 'budget';
  if (s.includes('high') || s.includes('expensive') || s.includes('splurge') || s.includes('luxury')) return 'splurge';
  return 'moderate';
}

function normalizeEnergyLevel(val: unknown) {
  if (typeof val !== 'string') return 'medium';
  const s = val.toLowerCase().trim();
  if (['low', 'medium', 'high'].includes(s)) return s;
  if (s.includes('low') || s.includes('easy') || s.includes('relax')) return 'low';
  if (s.includes('high') || s.includes('intense') || s.includes('active') || s.includes('hard')) return 'high';
  return 'medium';
}

function sanitizeRawJson(parsed: unknown, formValues: TripFormValues): any {
  if (!parsed || typeof parsed !== 'object') return parsed;
  const doc = parsed as Record<string, any>;

  const destination = typeof doc.destination === 'string' && doc.destination.trim()
    ? doc.destination.trim()
    : formValues.destination || 'Destination';
  const currency = typeof doc.currency === 'string' && doc.currency.length === 3
    ? doc.currency.toUpperCase()
    : formValues.currency || 'USD';

  let rawDays = Array.isArray(doc.days) ? doc.days : [];
  if (rawDays.length === 0 && Array.isArray(doc.itinerary)) {
    rawDays = doc.itinerary;
  }

  const days = rawDays.map((day: any, idx: number) => {
    if (!day || typeof day !== 'object') {
      return { day_number: idx + 1, activities: [] };
    }
    const dayNumber = typeof day.day_number === 'number' && day.day_number > 0
      ? day.day_number
      : (parseInt(String(day.day_number || '').replace(/\D/g, ''), 10) || (idx + 1));

    const rawActs = Array.isArray(day.activities) ? day.activities : [];
    const activities = rawActs.map((act: any) => {
      if (!act || typeof act !== 'object') return null;
      const name = typeof act.name === 'string' && act.name.trim() ? act.name.trim() : 'Activity';
      let description = typeof act.description === 'string' ? act.description.trim() : '';
      if (description.length < 10) {
        description = `${name} - Enjoy this experience in ${destination}.`;
      }
      if (description.length > 400) {
        description = description.slice(0, 397) + '...';
      }
      const location = typeof act.location === 'string' && act.location.trim() ? act.location.trim() : destination;
      const start_time = normalizeTimeString(act.start_time || act.startTime);
      const end_time = normalizeTimeString(act.end_time || act.endTime);
      const category = normalizeCategory(act.category);
      const cost_tier = normalizeCostTier(act.cost_tier || act.costTier);
      let estimated_cost = typeof act.estimated_cost === 'number'
        ? act.estimated_cost
        : (parseFloat(String(act.estimated_cost || act.cost || 0)) || 0);
      if (isNaN(estimated_cost) || estimated_cost < 0) estimated_cost = 0;
      const energy_level = normalizeEnergyLevel(act.energy_level || act.energyLevel);
      let pro_tip = typeof act.pro_tip === 'string' ? act.pro_tip.trim() : null;
      if (pro_tip && pro_tip.length > 200) pro_tip = pro_tip.slice(0, 197) + '...';

      return {
        name,
        description,
        location,
        start_time,
        end_time,
        category,
        cost_tier,
        estimated_cost,
        energy_level,
        pro_tip,
      };
    }).filter(Boolean);

    return {
      day_number: dayNumber,
      activities,
    };
  }).filter((d: any) => d.activities.length > 0);

  return {
    destination,
    currency,
    days,
  };
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

  // Sanitize the raw JSON to handle loose/flexible LLM formats
  const sanitized = sanitizeRawJson(parsedJson, formValues);

  // First, try the full-document parse.
  const fullParse = rawAIResponseSchema.safeParse(sanitized);

  if (fullParse.success) {
    const itinerary = transformToItinerary(fullParse.data, formValues);
    return { success: true, itinerary, failedDayNumbers: [] };
  }

  console.error('Full schema validation failed:', fullParse.error.issues);

  // Attempt per-day salvage if full parse still failed
  const maybeDoc = sanitized as { destination?: unknown; currency?: unknown; days?: unknown };
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
  // Re-index days sequentially (Day 1, Day 2, Day 3, ...)
  const days: Day[] = raw.days.map((rawDay, idx) => {
    const dayNumber = idx + 1;
    const day = transformDay(rawDay);
    day.dayNumber = dayNumber;
    day.label = `Day ${dayNumber}`;
    return day;
  });

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