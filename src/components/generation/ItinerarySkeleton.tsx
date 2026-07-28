import { DaySkeleton } from './DaySkeleton';

interface ItinerarySkeletonProps {
  durationDays: number;
}

export function ItinerarySkeleton({ durationDays }: ItinerarySkeletonProps) {
  const count = Math.max(1, Math.min(durationDays, 14));
  return (
    <div className="space-y-2">
      {Array.from({ length: count }, (_, i) => (
        <DaySkeleton key={i} />
      ))}
    </div>
  );
}
