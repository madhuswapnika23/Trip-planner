import {
  DndContext,
  DragOverlay,
  closestCenter,
} from '@dnd-kit/core';
import { cn } from '@/utils/cn';
import { DaySection } from './DaySection';
import { PartialErrorBanner } from '@/components/states/PartialErrorBanner';
import { useDragReorder } from '@/hooks/useDragReorder';
import type { Activity, Itinerary } from '@/types/itinerary';
import type { ItineraryActions } from '@/hooks/useItinerary';

interface ItineraryScreenProps {
  itinerary: Itinerary;
  expandedIds: Set<string>;
  regeneratingIds: Set<string>;
  revealedDayIds: Set<string>;
  actions: Pick<ItineraryActions, 'toggleExpanded' | 'removeActivity' | 'regenerateActivity' | 'reorderActivity'>;
  onEditActivity: (activity: Activity) => void;
}

export function ItineraryScreen({
  itinerary,
  expandedIds,
  regeneratingIds,
  revealedDayIds,
  actions,
  onEditActivity,
}: ItineraryScreenProps) {
  const { sensors, activeId, handleDragStart, handleDragEnd, handleDragCancel } =
    useDragReorder({
      onReorder: (dayId, activeActivityId, overActivityId) => {
        actions.reorderActivity(dayId, activeActivityId, overActivityId);
      },
    });  // Find dragging activity for overlay
  const draggingActivity = activeId
    ? itinerary.days.flatMap((d) => d.activities).find((a) => a.id === activeId)
    : null;

  return (
    <div className={cn('w-full')}>
      {itinerary.partialFailure && itinerary.partialFailure.failedDays.length > 0 && (
        <PartialErrorBanner failedDays={itinerary.partialFailure.failedDays} />
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <div className="space-y-1">
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

        {/* Drag overlay */}
        <DragOverlay>
          {draggingActivity && (
            <div className="mx-4 p-3 rounded-xl border border-voyagr-blue/50 bg-bg-elevated shadow-xl shadow-voyagr-blue/10 opacity-90">
              <p className="text-sm font-semibold text-text-primary">{draggingActivity.name}</p>
              <p className="text-xs text-text-tertiary mt-0.5">{draggingActivity.location}</p>
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
