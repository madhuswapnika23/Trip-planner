import { MapPin, RefreshCw, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Tooltip } from '@/components/ui/Tooltip';
import type { Activity } from '@/types/itinerary';

interface ActivityActionsProps {
  activity: Activity;
  onRemove: () => void;
  onRegenerate: () => void;
  onEdit: () => void;
  isRegenerating?: boolean;
}

export function ActivityActions({
  activity,
  onRemove,
  onRegenerate,
  onEdit,
  isRegenerating,
}: ActivityActionsProps) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.location)}`;

  return (
    <div className="flex items-center gap-1 pt-3 border-t border-bg-border/50 mt-3">
      <Tooltip content="Open in Maps">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg text-xs font-medium text-text-secondary hover:text-text-primary hover:bg-bg-elevated transition-all duration-150"
        >
          <MapPin className="w-3.5 h-3.5" />
          Map
        </a>
      </Tooltip>

      <Tooltip content="Edit activity">
        <Button
          variant="ghost"
          size="sm"
          onClick={onEdit}
          className="text-xs h-8 px-3"
        >
          Edit
        </Button>
      </Tooltip>

      <Tooltip content="Replace this activity">
        <Button
          variant="ghost"
          size="sm"
          onClick={onRegenerate}
          isLoading={isRegenerating}
          leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
          className="text-xs h-8 px-3 text-voyagr-blue hover:text-blue-400"
        >
          Regen
        </Button>
      </Tooltip>

      <div className="ml-auto">
        <Tooltip content="Remove activity (with undo)">
          <Button
            variant="danger"
            size="sm"
            onClick={onRemove}
            leftIcon={<Trash2 className="w-3.5 h-3.5" />}
            className="text-xs h-8 px-3"
          >
            Remove
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}
