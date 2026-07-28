import { useRef, useState } from 'react';
import { MapPin } from 'lucide-react';
import { cn } from '@/utils/cn';

interface DestinationFieldProps {
  value: string;
  onChange: (value: string) => void;
  isShaking?: boolean;
}

export function DestinationField({ value, onChange, isShaking }: DestinationFieldProps) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative group">
      <label
        htmlFor="destination-input"
        className="block text-sm font-medium text-text-secondary mb-1.5"
      >
        Destination <span className="text-voyagr-coral">*</span>
      </label>
      <div
        className={cn(
          'relative flex items-center rounded-xl border transition-all duration-150',
          focused
            ? 'border-voyagr-blue bg-bg-elevated shadow-[0_0_0_3px_rgba(79,126,255,0.15)]'
            : 'border-bg-border bg-bg-surface hover:border-bg-border/80',
          isShaking && 'border-voyagr-coral shadow-[0_0_0_3px_rgba(255,107,107,0.15)] animate-shake'
        )}
      >
        <MapPin className="absolute left-3 w-4 h-4 text-text-tertiary pointer-events-none" />
        <input
          ref={inputRef}
          id="destination-input"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Tokyo, Bali, New York City…"
          autoComplete="off"
          className="w-full bg-transparent pl-10 pr-4 py-3 text-md text-text-primary placeholder:text-text-tertiary outline-none rounded-xl"
        />
      </div>
      {isShaking && (
        <p className="mt-1 text-sm text-voyagr-coral animate-fadeIn">
          Please enter a destination
        </p>
      )}
    </div>
  );
}
