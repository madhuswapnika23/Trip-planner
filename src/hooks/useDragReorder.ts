import { useCallback, useState } from 'react';
import {
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';

interface UseDragReorderOptions {
  onReorder: (dayId: string, activeId: string, overId: string) => void;
}

/**
 * Wraps @dnd-kit sensors and manages activeId for the drag overlay.
 * Translates DragEnd events into semantic reorder calls.
 * Keeps DnD complexity isolated from the component tree.
 */
export function useDragReorder({ onReorder }: UseDragReorderOptions) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeDayId, setActiveDayId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 250, tolerance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = useCallback((event: { active: { id: string | number; data?: { current?: { dayId?: string } } } }) => {
    setActiveId(String(event.active.id));
    setActiveDayId(event.active.data?.current?.dayId ?? null);
  }, []);

  const handleDragEnd = useCallback(
    (event: { active: { id: string | number }; over: { id: string | number } | null }) => {
      const { active, over } = event;
      setActiveId(null);
      setActiveDayId(null);

      if (!over || active.id === over.id || !activeDayId) return;
      onReorder(activeDayId, String(active.id), String(over.id));
    },
    [activeDayId, onReorder]
  );

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
    setActiveDayId(null);
  }, []);

  return {
    sensors,
    activeId,
    activeDayId,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
  };
}
