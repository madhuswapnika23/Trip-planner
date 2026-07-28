import { fetchWithTimeout } from './client';
import { rawActivitySchema } from '@/schema/itinerarySchema';
import { buildSingleActivityPrompt } from '@/constants/prompts';
import { generateId } from '@/utils/idGenerator';
import { deriveTimeOfDay } from '@/utils/time';
import { stripMarkdownFences } from '@/schema/validators';
import type { Activity } from '@/types/itinerary';
import type { TripFormValues, AppError } from '@/types/ui';

/**
 * Regenerates a single activity in-place.
 * Returns a typed Activity or throws a typed AppError.
 */
export async function regenerateActivity(
  formValues: TripFormValues,
  dayNumber: number,
  existingActivityNames: string[],
  slotStartTime: string,
  slotEndTime: string,
  signal?: AbortSignal
): Promise<Activity> {
  const prompt = buildSingleActivityPrompt(
    formValues,
    dayNumber,
    existingActivityNames,
    slotStartTime,
    slotEndTime
  );

  let rawContent = '';

  // Try serverless proxy first, fall back to direct OpenAI
  try {
    const response = await fetchWithTimeout(
      '/api/generate',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      },
      signal
    );
    const data = await response.json();
    rawContent = data.content ?? '';
  } catch {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY as string | undefined;
    if (apiKey) {
      const response = await fetchWithTimeout(
        'https://api.openai.com/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            response_format: { type: 'json_object' },
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.8,
            max_tokens: 600,
          }),
        },
        signal
      );
      const data = await response.json();
      rawContent = data.choices?.[0]?.message?.content ?? '';
    } else {
      // Mock: return a dynamic alternative activity matching destination
      const city = formValues.destination ? formValues.destination.split(',')[0].trim() : 'Local';
      const altNames = [
        `Exclusive ${city} Hidden Gem Experience`,
        `${city} Artisan Workshop & Tasting`,
        `${city} Panoramic Sunset Viewpoint`,
        `Historic ${city} Neighborhood Stroll`,
        `${city} Traditional Teahouse & Treats`,
      ];
      const selectedName = altNames[(dayNumber + existingActivityNames.length) % altNames.length];

      rawContent = JSON.stringify({
        name: selectedName,
        description: `A hand-picked alternative experience in ${city} for day ${dayNumber} of your trip. Thoughtfully selected to replace your previous activity.`,
        location: formValues.destination || `${city} Center`,
        start_time: slotStartTime,
        end_time: slotEndTime,
        category: 'culture',
        cost_tier: 'budget',
        estimated_cost: Math.max(15, Math.floor(formValues.budget / ((formValues.durationDays || 3) * 4))),
        energy_level: 'medium',
        pro_tip: 'Ask local staff for their favorite secret spot nearby.',
      });
    }
  }

  const cleaned = stripMarkdownFences(rawContent);
  let parsedJson: unknown;
  try {
    parsedJson = JSON.parse(cleaned);
  } catch {
    throw {
      type: 'schema',
      message: 'Could not parse the regenerated activity.',
      retryable: true,
    } satisfies AppError;
  }

  const result = rawActivitySchema.safeParse(parsedJson);
  if (!result.success) {
    throw {
      type: 'schema',
      message: 'The regenerated activity had an invalid format.',
      retryable: true,
    } satisfies AppError;
  }

  const raw = result.data;
  const durationHrs = computeDuration(raw.start_time, raw.end_time);

  return {
    id: generateId(),
    name: raw.name,
    description: raw.description,
    location: raw.location,
    startTime: raw.start_time,
    endTime: raw.end_time,
    durationHrs,
    category: raw.category,
    costTier: raw.cost_tier,
    estimatedCost: raw.estimated_cost,
    energyLevel: raw.energy_level,
    timeOfDay: deriveTimeOfDay(raw.start_time),
    proTip: raw.pro_tip,
    isRemoved: false,
  };
}

function computeDuration(startTime: string, endTime: string): number {
  const [sh, sm] = startTime.split(':').map(Number);
  const [eh, em] = endTime.split(':').map(Number);
  let start = sh * 60 + sm;
  let end = eh * 60 + em;
  if (end < start) end += 24 * 60;
  return Math.round(((end - start) / 60) * 10) / 10;
}
