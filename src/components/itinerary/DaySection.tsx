import { useState } from 'react';
import { cn } from '@/utils/cn';
import { DayHeader } from './DayHeader';
import { ActivityList } from './ActivityList';
import type { Activity, Day } from '@/types/itinerary';

interface DaySectionProps {
  day: Day;
  currency: string;
  expandedIds: Set<string>;
  regeneratingIds: Set<string>;
  revealedDayIds: Set<string>;
  onToggleExpand: (id: string) => void;
  onRemove: (activityId: string, dayId: string) => void;
  onRegenerate: (dayId: string, dayNumber: number, activity: Activity, existingNames: string[]) => void;
  onEdit: (activity: Activity) => void;
}

export function DaySection({
  day,
  currency,
  expandedIds,
  regeneratingIds,
  revealedDayIds,
  onToggleExpand,
  onRemove,
  onRegenerate,
  onEdit,
}: DaySectionProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isRevealed = revealedDayIds.size === 0 || revealedDayIds.has(day.id);

  const dailyTotal = day.activities
    .filter((a) => !a.isRemoved)
    .reduce((sum, a) => sum + a.estimatedCost, 0);

  return (
    <div
      className={cn(
        'rounded-2xl border border-bg-border overflow-hidden mb-4',
        'transition-all duration-300',
        isRevealed ? 'opacity-100 translate-y-0 animate-slideUp' : 'opacity-0 translate-y-2'
      )}
    >
      <DayHeader
        day={day}
        currency={currency}
        dailyTotal={dailyTotal}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed((c) => !c)}
      />

      {/* Collapsible activities */}
      <div
        className={cn(
          'grid transition-all duration-250 ease-out',
          isCollapsed ? 'grid-rows-[0fr]' : 'grid-rows-[1fr]'
        )}
      >
        <div className="overflow-hidden">
          <ActivityList
            day={day}
            expandedIds={expandedIds}
            regeneratingIds={regeneratingIds}
            onToggleExpand={onToggleExpand}
            onRemove={onRemove}
            onRegenerate={onRegenerate}
            onEdit={onEdit}
          />
        </div>
      </div>
    </div>
  );
}
