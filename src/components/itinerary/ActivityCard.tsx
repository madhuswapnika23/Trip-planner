import { memo } from 'react';
import { ChevronDown, Clock, MapPin, GripVertical } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/utils/cn';
import { CostBadge, EnergyBadge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { ActivityDetail } from './ActivityDetail';
import { ActivityActions } from './ActivityActions';
import { CATEGORY_ICONS } from '@/constants/categories';
import { formatTimeRange } from '@/utils/time';
import type { Activity } from '@/types/itinerary';

interface ActivityCardProps {
  activity: Activity;
  dayId: string;
  dayNumber: number;
  isExpanded: boolean;
  isRegenerating: boolean;
  existingActivityNames: string[];
  onToggleExpand: () => void;
  onRemove: () => void;
  onRegenerate: () => void;
  onEdit: (activity: Activity) => void;
}

export const ActivityCard = memo(function ActivityCard({
  activity,
  isExpanded,
  isRegenerating,
  existingActivityNames: _existingActivityNames,
  onToggleExpand,
  onRemove,
  onRegenerate,
  onEdit,
}: ActivityCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: activity.id, data: { activity } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const CategoryIcon = CATEGORY_ICONS[activity.category];

  if (isRegenerating) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="mx-4 mb-3 rounded-xl border border-bg-border bg-bg-surface overflow-hidden animate-fadeIn"
      >
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-3">
            <Skeleton className="w-8 h-8 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="w-2/3 h-5" />
              <Skeleton className="w-1/2 h-4" />
            </div>
          </div>
          <Skeleton className="w-full h-4" />
          <div className="flex gap-2">
            <Skeleton className="w-16 h-5 rounded-full" />
            <Skeleton className="w-14 h-5 rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'mx-4 mb-3 rounded-xl border bg-bg-surface overflow-hidden',
        'transition-all duration-150 group',
        isDragging
          ? 'border-voyagr-blue/50 shadow-xl shadow-voyagr-blue/10 scale-[1.02] opacity-90 z-50'
          : 'border-bg-border hover:border-voyagr-blue/30 hover:bg-bg-elevated hover:shadow-md'
      )}
    >
      {/* Card header — always visible */}
      <div
        className="flex items-center gap-3 p-3 cursor-pointer select-none"
        onClick={onToggleExpand}
        role="button"
        aria-expanded={isExpanded}
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggleExpand(); } }}
      >
        {/* Drag handle */}
        <button
          type="button"
          {...attributes}
          {...listeners}
          className="opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity text-text-tertiary hover:text-text-secondary cursor-grab active:cursor-grabbing p-1 -ml-1 shrink-0"
          aria-label="Drag to reorder"
          onClick={(e) => e.stopPropagation()}
        >
          <GripVertical className="w-4 h-4" />
        </button>

        {/* Category icon */}
        <div className="w-8 h-8 rounded-lg bg-bg-elevated flex items-center justify-center shrink-0">
          <CategoryIcon className="w-4 h-4 text-text-secondary" />
        </div>

        {/* Main info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-semibold text-text-primary truncate">{activity.name}</h3>
            <CostBadge tier={activity.costTier} />
          </div>
          <div className="flex items-center gap-3 mt-0.5 flex-wrap">
            <div className="flex items-center gap-1 text-xs text-text-tertiary font-mono">
              <Clock className="w-3 h-3" />
              {formatTimeRange(activity.startTime, activity.endTime)}
            </div>
            <div className="flex items-center gap-1 text-xs text-text-tertiary">
              <MapPin className="w-3 h-3" />
              <span className="truncate max-w-[120px]">{activity.location}</span>
            </div>
            <EnergyBadge level={activity.energyLevel} />
          </div>
        </div>

        {/* Chevron */}
        <ChevronDown
          className={cn(
            'w-4 h-4 text-text-tertiary transition-transform duration-200 shrink-0',
            isExpanded && 'rotate-180'
          )}
        />
      </div>

      {/* Expanded content — CSS grid rows trick for smooth animation */}
      <div
        className={cn(
          'grid transition-all duration-200 ease-out',
          isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        )}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-4">
            <ActivityDetail activity={activity} />
            <ActivityActions
              activity={activity}
              onRemove={onRemove}
              onRegenerate={onRegenerate}
              onEdit={() => onEdit(activity)}
              isRegenerating={isRegenerating}
            />
          </div>
        </div>
      </div>
    </div>
  );
});
