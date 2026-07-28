import type { Activity, TimeOfDay } from '@/types/itinerary';

/**
 * Maps a 24hr HH:MM start time to a coarse time-of-day bucket.
 * Used during raw → domain transformation.
 */
export function deriveTimeOfDay(startTime: string): TimeOfDay {
  const hour = parseInt(startTime.split(':')[0], 10);
  if (hour < 12) return 'morning';
  if (hour < 17) return 'afternoon';
  return 'evening';
}

/**
 * Sorts activities by start time. HH:MM strings sort correctly with
 * lexicographic comparison since they're zero-padded and fixed-width.
 */
export function sortActivitiesByTime(activities: Activity[]): Activity[] {
  return [...activities].sort((a, b) => a.startTime.localeCompare(b.startTime));
}

export function groupActivitiesByTimeOfDay(
  activities: Activity[]
): Record<TimeOfDay, Activity[]> {
  const groups: Record<TimeOfDay, Activity[]> = {
    morning: [],
    afternoon: [],
    evening: [],
  };

  for (const activity of sortActivitiesByTime(activities)) {
    if (activity.isRemoved) continue;
    groups[activity.timeOfDay].push(activity);
  }

  return groups;
}

export function formatTimeRange(startTime: string, endTime: string): string {
  return `${formatTime(startTime)} – ${formatTime(endTime)}`;
}

function formatTime(time: string): string {
  const [hourStr, minute] = time.split(':');
  const hour = parseInt(hourStr, 10);
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour}:${minute} ${period}`;
}

export function formatDuration(durationHrs: number): string {
  if (durationHrs < 1) {
    return `${Math.round(durationHrs * 60)} min`;
  }
  const whole = Math.floor(durationHrs);
  const fraction = durationHrs - whole;
  if (fraction === 0) return `${whole} hr${whole !== 1 ? 's' : ''}`;
  return `${durationHrs} hrs`;
}