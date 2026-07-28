import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { ActivityCard } from './ActivityCard';
import type { Activity, Day } from '@/types/itinerary';

interface ActivityListProps {
  day: Day;
  expandedIds: Set<string>;
  regeneratingIds: Set<string>;
  onToggleExpand: (id: string) => void;
  onRemove: (activityId: string, dayId: string) => void;
  onRegenerate: (dayId: string, dayNumber: number, activity: Activity, existingNames: string[]) => void;
  onEdit: (activity: Activity) => void;
}

export function ActivityList({
  day,
  expandedIds,
  regeneratingIds,
  onToggleExpand,
  onRemove,
  onRegenerate,
  onEdit,
}: ActivityListProps) {
  const visibleActivities = day.activities.filter((a) => !a.isRemoved);
  const allNames = day.activities.map((a) => a.name);

  if (visibleActivities.length === 0) {
    return (
      <div className="mx-4 py-8 text-center text-sm text-text-tertiary">
        No activities remaining for this day.
      </div>
    );
  }

  return (
    <SortableContext
      items={visibleActivities.map((a) => a.id)}
      strategy={verticalListSortingStrategy}
    >
      <div className="py-2">
        {visibleActivities.map((activity) => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            dayId={day.id}
            dayNumber={day.dayNumber}
            isExpanded={expandedIds.has(activity.id)}
            isRegenerating={regeneratingIds.has(activity.id)}
            existingActivityNames={allNames}
            onToggleExpand={() => onToggleExpand(activity.id)}
            onRemove={() => onRemove(activity.id, day.id)}
            onRegenerate={() => onRegenerate(day.id, day.dayNumber, activity, allNames.filter((n) => n !== activity.name))}
            onEdit={onEdit}
          />
        ))}
      </div>
    </SortableContext>
  );
}
