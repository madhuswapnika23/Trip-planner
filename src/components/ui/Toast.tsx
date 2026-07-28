import React, { createContext, useCallback, useContext, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/utils/cn';
import type { ToastState } from '@/types/ui';
import { generateId } from '@/utils/idGenerator';

// ─── Context ─────────────────────────────────────────────────────────────────

interface ToastContextValue {
  showToast: (toast: Omit<ToastState, 'id'>) => void;
  dismissToast: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

// ─── Provider ────────────────────────────────────────────────────────────────

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<(ToastState & { visible: boolean }) | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismissToast = useCallback(() => {
    setToast((prev) => (prev ? { ...prev, visible: false } : null));
    setTimeout(() => setToast(null), 300); // Wait for slide-down animation
  }, []);

  const showToast = useCallback(
    ({ message, action, duration = 5000 }: Omit<ToastState, 'id'>) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      setToast({ id: generateId(), message, action, duration, visible: true });
      timerRef.current = setTimeout(() => {
        dismissToast();
      }, duration);
    },
    [dismissToast]
  );

  return (
    <ToastContext.Provider value={{ showToast, dismissToast }}>
      {children}
      {toast && createPortal(<Toast toast={toast} onDismiss={dismissToast} />, document.body)}
    </ToastContext.Provider>
  );
}

// ─── Toast Component ──────────────────────────────────────────────────────────

interface ToastProps {
  toast: ToastState & { visible: boolean };
  onDismiss: () => void;
}

function Toast({ toast, onDismiss }: ToastProps) {
  return (
    <div
      className={cn(
        'fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999]',
        'flex items-center gap-3 px-4 py-3 rounded-xl',
        'bg-bg-elevated border border-bg-border shadow-2xl',
        'min-w-[280px] max-w-[420px]',
        'transition-all duration-300',
        toast.visible ? 'translate-y-0 opacity-100 animate-slideUp' : 'translate-y-4 opacity-0'
      )}
      role="alert"
      aria-live="polite"
    >
      <p className="flex-1 text-sm text-text-primary">{toast.message}</p>
      {toast.action && (
        <button
          type="button"
          onClick={() => {
            toast.action!.onClick();
            onDismiss();
          }}
          className="text-sm font-semibold text-voyagr-blue hover:text-blue-400 transition-colors shrink-0"
        >
          {toast.action.label}
        </button>
      )}
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss"
        className="text-text-tertiary hover:text-text-secondary transition-colors shrink-0"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
