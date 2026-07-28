import { useState } from 'react';
import { cn } from '@/utils/cn';

interface NotesFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export function NotesField({ value, onChange }: NotesFieldProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div>
      <label
        htmlFor="notes-input"
        className="block text-sm font-medium text-text-secondary mb-1.5"
      >
        Special Requests{' '}
        <span className="text-xs text-text-tertiary">(optional)</span>
      </label>
      <textarea
        id="notes-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={focused ? 5 : 3}
        placeholder="Dietary needs, accessibility, must-see places, anything I should know…"
        className={cn(
          'w-full px-4 py-3 rounded-xl border text-base text-text-primary placeholder:text-text-tertiary',
          'bg-bg-surface outline-none resize-none transition-all duration-200',
          focused
            ? 'border-voyagr-blue bg-bg-elevated shadow-[0_0_0_3px_rgba(79,126,255,0.15)]'
            : 'border-bg-border hover:border-bg-border/80'
        )}
      />
    </div>
  );
}
