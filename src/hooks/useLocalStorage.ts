import { useState, useEffect, useCallback } from 'react';

/**
 * Generic hook that syncs state to localStorage.
 * Reads on mount, writes on every change.
 * Wrapped in try/catch because localStorage throws in private browsing mode.
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    try {
      setStoredValue((prev) => {
        const next = typeof value === 'function' ? (value as (prev: T) => T)(prev) : value;
        window.localStorage.setItem(key, JSON.stringify(next));
        return next;
      });
    } catch {
      // localStorage unavailable — state still updates in-memory
    }
  }, [key]);

  // Sync if key changes
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item) as T);
      }
    } catch {
      // ignore
    }
  }, [key]);

  return [storedValue, setValue];
}
