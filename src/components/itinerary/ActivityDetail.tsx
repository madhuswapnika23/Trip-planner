import { Lightbulb } from 'lucide-react';
import type { Activity } from '@/types/itinerary';

interface ActivityDetailProps {
  activity: Activity;
}

export function ActivityDetail({ activity }: ActivityDetailProps) {
  return (
    <div className="pt-3 space-y-3">
      {/* Description */}
      <p className="text-sm text-text-secondary leading-relaxed">{activity.description}</p>

      {/* Pro tip */}
      {activity.proTip && (
        <div className="flex gap-2.5 p-3 rounded-lg bg-voyagr-amber/5 border border-voyagr-amber/20">
          <Lightbulb className="w-4 h-4 text-voyagr-amber shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-semibold text-voyagr-amber uppercase tracking-wider block mb-1">
              Pro Tip
            </span>
            <p className="text-xs text-text-secondary leading-relaxed">{activity.proTip}</p>
          </div>
        </div>
      )}
    </div>
  );
}
