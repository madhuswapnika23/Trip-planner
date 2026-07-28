import { DaySection } from '@/components/itinerary/DaySection';
import type { Activity, Itinerary } from '@/types/itinerary';
import type { ItineraryActions } from '@/hooks/useItinerary';

interface TimelinePanelProps {
  itinerary: Itinerary;
  expandedIds: Set<string>;
  regeneratingIds: Set<string>;
  revealedDayIds: Set<string>;
  actions: Pick<ItineraryActions, 'toggleExpanded' | 'removeActivity' | 'regenerateActivity' | 'reorderActivity'>;
  onEditActivity: (activity: Activity) => void;
}

export function TimelinePanel({
  itinerary,
  expandedIds,
  regeneratingIds,
  revealedDayIds,
  actions,
  onEditActivity,
}: TimelinePanelProps) {
  return (
    <div className="flex-1 min-h-0 overflow-y-auto px-4 py-6 pb-24 lg:pb-6">
      <div className="max-w-2xl mx-auto lg:max-w-none">
        {itinerary.days.map((day) => (
          <DaySection
            key={day.id}
            day={day}
            currency={itinerary.currency}
            expandedIds={expandedIds}
            regeneratingIds={regeneratingIds}
            revealedDayIds={revealedDayIds}
            onToggleExpand={actions.toggleExpanded}
            onRemove={actions.removeActivity}
            onRegenerate={actions.regenerateActivity}
            onEdit={onEditActivity}
          />
        ))}
      </div>
    </div>
  );
}
