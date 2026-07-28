import type { Itinerary } from '@/types/itinerary';
import { itineraryStateSchema } from './serializationSchema';

/**
 * Serializes an itinerary to a URL-safe base64 string.
 * JSON.stringify → encodeURIComponent-safe base64 via btoa.
 */
export function serializeItinerary(itinerary: Itinerary): string {
  const json = JSON.stringify(itinerary);
  const base64 = btoa(unescape(encodeURIComponent(json)));
  return base64;
}

/**
 * Deserializes a base64 string back into an Itinerary. Never throws —
 * returns null on any failure (corrupt data, invalid JSON, schema mismatch).
 */
export function deserializeItinerary(str: string): Itinerary | null {
  try {
    const json = decodeURIComponent(escape(atob(str)));
    const parsed = JSON.parse(json);
    const result = itineraryStateSchema.safeParse(parsed);
    if (!result.success) {
      console.error('Deserialized itinerary failed schema check:', result.error.issues);
      return null;
    }
    return result.data as Itinerary;
  } catch (err) {
    console.error('Failed to deserialize itinerary from URL:', err);
    return null;
  }
}

export function buildShareUrl(itinerary: Itinerary): string {
  const serialized = serializeItinerary(itinerary);
  const url = new URL(window.location.href);
  url.searchParams.set('trip', serialized);
  return url.toString();
}

export function getTripParamFromUrl(): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get('trip');
}