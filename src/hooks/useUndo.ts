import { useCallback, useRef } from 'react';
import type { UndoItem } from '@/types/itinerary';
import { CONFIG } from '@/constants/config';

interface UseUndoOptions {
  onPermanentRemove: (activityId: string, dayId: string) => void;
  onRestore: (activityId: string, dayId: string) => void;
}

/**
 * Manages a soft-delete undo queue.
 * Each removeActivity call starts a 5-second timer. Undo cancels the timer
 * and calls onRestore. If the timer fires, onPermanentRemove is called.
 */
export function useUndo({ onPermanentRemove, onRestore }: UseUndoOptions) {
  const queueRef = useRef<Map<string, UndoItem>>(new Map());

  const enqueue = useCallback(
    (activityId: string, dayId: string) => {
      // Cancel any existing timer for this activity (shouldn't happen, but be safe)
      const existing = queueRef.current.get(activityId);
      if (existing) clearTimeout(existing.timeoutId);

      const timeoutId = setTimeout(() => {
        queueRef.current.delete(activityId);
        onPermanentRemove(activityId, dayId);
      }, CONFIG.UNDO_WINDOW_MS);

      queueRef.current.set(activityId, { activityId, dayId, timeoutId });
    },
    [onPermanentRemove]
  );

  const dequeue = useCallback(
    (activityId: string) => {
      const item = queueRef.current.get(activityId);
      if (!item) return;
      clearTimeout(item.timeoutId);
      queueRef.current.delete(activityId);
      onRestore(activityId, item.dayId);
    },
    [onRestore]
  );

  const cancelAll = useCallback(() => {
    for (const item of queueRef.current.values()) {
      clearTimeout(item.timeoutId);
    }
    queueRef.current.clear();
  }, []);

  return { enqueue, dequeue, cancelAll };
}
