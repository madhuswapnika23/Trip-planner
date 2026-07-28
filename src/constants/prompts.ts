import type { TripFormValues } from '@/types/ui';

const SYSTEM_PROMPT = `You are a travel planning expert. You return only valid JSON.
Never include markdown, code fences, explanations, or any text outside the JSON object.
The response must be parseable by JSON.parse() with no preprocessing.`;

const SCHEMA_DOCUMENTATION = `{
  "destination": string,
  "currency": string (3-letter uppercase code, e.g. USD),
  "days": [
    {
      "day_number": number (starting at 1),
      "activities": [
        {
          "name": string (max 80 chars),
          "description": string (10-400 chars),
          "location": string (max 100 chars),
          "start_time": string (HH:MM, 24hr format),
          "end_time": string (HH:MM, 24hr format),
          "category": one of "culture" | "food" | "transport" | "accommodation" | "shopping" | "nature" | "nightlife" | "wellness",
          "cost_tier": one of "free" | "budget" | "moderate" | "splurge",
          "estimated_cost": number (in the given currency, 0-10000),
          "energy_level": one of "low" | "medium" | "high",
          "pro_tip": string (max 200 chars) or null
        }
      ]
    }
  ]
}`;

export function buildItineraryPrompt(formValues: TripFormValues): string {
  const { destination, durationDays, budget, currency, travelStyles, notes } = formValues;

  return `${SYSTEM_PROMPT}

Plan a ${durationDays}-day trip to ${destination}.
Budget: ${budget} ${currency} total.
Travel styles: ${travelStyles.length > 0 ? travelStyles.join(', ') : 'general / balanced'}.
${notes.trim() ? `Additional requirements: ${notes.trim()}` : ''}

Return a JSON object matching EXACTLY this schema:
${SCHEMA_DOCUMENTATION}

Rules:
- estimated_cost values across all activities must sum to no more than ${budget} ${currency}
- Include 3-5 activities per day
- Distribute energy levels throughout each day (avoid all-high or all-low days)
- cost_tier must be one of: free, budget, moderate, splurge
- energy_level must be one of: low, medium, high
- start_time and end_time must be in HH:MM 24-hour format
- Activities within a day must be in chronological order
- Return ONLY the JSON object, nothing else`;
}

export function buildSingleActivityPrompt(
  formValues: TripFormValues,
  dayNumber: number,
  existingActivityNames: string[],
  slotStartTime: string,
  slotEndTime: string
): string {
  return `${SYSTEM_PROMPT}

Generate ONE replacement activity for day ${dayNumber} of a trip to ${formValues.destination}.
The activity must fit in the time slot ${slotStartTime} to ${slotEndTime}.
Travel styles: ${formValues.travelStyles.join(', ') || 'general / balanced'}.
Avoid repeating any of these existing activities: ${existingActivityNames.join(', ') || 'none'}.

Return a single JSON object (not an array) matching EXACTLY this schema:
{
  "name": string (max 80 chars),
  "description": string (10-400 chars),
  "location": string (max 100 chars),
  "start_time": "${slotStartTime}",
  "end_time": "${slotEndTime}",
  "category": one of "culture" | "food" | "transport" | "accommodation" | "shopping" | "nature" | "nightlife" | "wellness",
  "cost_tier": one of "free" | "budget" | "moderate" | "splurge",
  "estimated_cost": number,
  "energy_level": one of "low" | "medium" | "high",
  "pro_tip": string (max 200 chars) or null
}

Return ONLY the JSON object, nothing else.`;
}