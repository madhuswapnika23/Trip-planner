import { useState } from 'react';
import { cn } from '@/utils/cn';
import { DURATION_OPTIONS } from '@/constants/config';

interface DurationSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

export function DurationSelector({ value, onChange }: DurationSelectorProps) {
  const [isCustom, setIsCustom] = useState(
    !DURATION_OPTIONS.includes(value as typeof DURATION_OPTIONS[number])
  );
  const [customValue, setCustomValue] = useState(
    DURATION_OPTIONS.includes(value as typeof DURATION_OPTIONS[number]) ? '7' : String(value)
  );

  const handlePresetClick = (days: number) => {
    setIsCustom(false);
    onChange(days);
  };

  const handleCustomClick = () => {
    setIsCustom(true);
    const num = parseInt(customValue, 10);
    if (!isNaN(num) && num >= 1 && num <= 30) onChange(num);
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setCustomValue(raw);
    const num = parseInt(raw, 10);
    if (!isNaN(num) && num >= 1 && num <= 30) onChange(num);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-text-secondary mb-1.5">
        Duration
      </label>
      <div className="flex gap-2 flex-wrap">
        {DURATION_OPTIONS.map((days) => (
          <button
            key={days}
            type="button"
            onClick={() => handlePresetClick(days)}
            className={cn(
              'h-10 px-4 rounded-xl border text-sm font-medium transition-all duration-150',
              !isCustom && value === days
                ? 'bg-voyagr-blue border-voyagr-blue text-white shadow-sm shadow-voyagr-blue/30'
                : 'bg-bg-surface border-bg-border text-text-secondary hover:border-voyagr-blue/40 hover:text-text-primary'
            )}
          >
            {days} days
          </button>
        ))}
        <button
          type="button"
          onClick={handleCustomClick}
          className={cn(
            'h-10 px-4 rounded-xl border text-sm font-medium transition-all duration-150',
            isCustom
              ? 'bg-voyagr-blue border-voyagr-blue text-white shadow-sm shadow-voyagr-blue/30'
              : 'bg-bg-surface border-bg-border text-text-secondary hover:border-voyagr-blue/40 hover:text-text-primary'
          )}
        >
          Custom
        </button>
        {isCustom && (
          <input
            type="number"
            min={1}
            max={30}
            value={customValue}
            onChange={handleCustomChange}
            placeholder="Days"
            className={cn(
              'h-10 w-20 px-3 rounded-xl border text-sm text-text-primary',
              'bg-bg-elevated border-voyagr-blue outline-none',
              'focus:shadow-[0_0_0_3px_rgba(79,126,255,0.15)] animate-fadeIn'
            )}
          />
        )}
      </div>
    </div>
  );
}
