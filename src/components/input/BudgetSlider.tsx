import { useState, useCallback } from 'react';
import { DollarSign } from 'lucide-react';
import { cn } from '@/utils/cn';
import { CONFIG } from '@/constants/config';
import { formatCurrency } from '@/utils/budget';

interface BudgetSliderProps {
  value: number;
  onChange: (value: number) => void;
  currency: string;
}

const ANCHORS = [
  { label: 'Budget', value: 500 },
  { label: 'Moderate', value: 2000 },
  { label: 'Splurge', value: 8000 },
];

function getThumbColor(value: number): string {
  if (value < 1000) return 'bg-voyagr-teal';
  if (value < 4000) return 'bg-voyagr-blue';
  if (value < 8000) return 'bg-voyagr-amber';
  return 'bg-voyagr-coral';
}

export function BudgetSlider({ value, onChange, currency }: BudgetSliderProps) {
  const [inputValue, setInputValue] = useState(String(value));
  const [focused, setFocused] = useState(false);

  const handleSliderChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const num = Number(e.target.value);
      onChange(num);
      setInputValue(String(num));
    },
    [onChange]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    setFocused(false);
    const num = parseInt(inputValue.replace(/[^0-9]/g, ''), 10);
    if (!isNaN(num)) {
      const clamped = Math.max(CONFIG.MIN_BUDGET, Math.min(CONFIG.MAX_BUDGET, num));
      onChange(clamped);
      setInputValue(String(clamped));
    } else {
      setInputValue(String(value));
    }
  };

  const pct = ((value - CONFIG.MIN_BUDGET) / (CONFIG.MAX_BUDGET - CONFIG.MIN_BUDGET)) * 100;

  return (
    <div>
      <label className="block text-sm font-medium text-text-secondary mb-1.5">
        Total Budget
      </label>

      {/* Number input */}
      <div
        className={cn(
          'flex items-center gap-2 px-3 py-2.5 rounded-xl border mb-4 transition-all duration-150',
          focused
            ? 'border-voyagr-blue bg-bg-elevated shadow-[0_0_0_3px_rgba(79,126,255,0.15)]'
            : 'border-bg-border bg-bg-surface'
        )}
      >
        <DollarSign className="w-4 h-4 text-text-tertiary" />
        <input
          type="text"
          inputMode="numeric"
          value={focused ? inputValue : value.toLocaleString()}
          onChange={handleInputChange}
          onFocus={() => { setFocused(true); setInputValue(String(value)); }}
          onBlur={handleInputBlur}
          className="flex-1 bg-transparent text-md font-mono text-text-primary outline-none min-w-0"
          aria-label="Budget amount"
        />
        <span className="text-sm text-text-tertiary font-mono">{currency}</span>
      </div>

      {/* Slider */}
      <div className="relative">
        <input
          type="range"
          min={CONFIG.MIN_BUDGET}
          max={CONFIG.MAX_BUDGET}
          step={50}
          value={value}
          onChange={handleSliderChange}
          className="w-full"
          style={{
            background: `linear-gradient(to right, #4F7EFF ${pct}%, #2A2A3A ${pct}%)`,
          }}
          aria-label="Budget slider"
        />
        {/* Anchor labels */}
        <div className="flex justify-between mt-2">
          {ANCHORS.map((anchor) => (
            <button
              key={anchor.label}
              type="button"
              onClick={() => { onChange(anchor.value); setInputValue(String(anchor.value)); }}
              className="text-xs text-text-tertiary hover:text-voyagr-blue transition-colors"
            >
              {anchor.label}
              <span className="block text-text-tertiary/60">{formatCurrency(anchor.value, currency)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Thumb color indicator */}
      <div className="mt-3 flex items-center gap-2">
        <div className={cn('w-2 h-2 rounded-full transition-colors duration-300', getThumbColor(value))} />
        <span className="text-xs text-text-tertiary">
          {value < 1000 ? 'Budget trip' : value < 4000 ? 'Moderate trip' : value < 8000 ? 'Premium trip' : 'Luxury trip'}
        </span>
      </div>
    </div>
  );
}
