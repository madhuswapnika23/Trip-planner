import { cn } from '@/utils/cn';
import { TRAVEL_STYLES } from '@/constants/categories';
import { CONFIG } from '@/constants/config';

interface StylePickerProps {
  selected: string[];
  onChange: (selected: string[]) => void;
}

export function StylePicker({ selected, onChange }: StylePickerProps) {
  const toggle = (style: string) => {
    if (selected.includes(style)) {
      onChange(selected.filter((s) => s !== style));
    } else if (selected.length < CONFIG.MAX_TRAVEL_STYLES) {
      onChange([...selected, style]);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-text-secondary mb-1.5">
        Travel Style{' '}
        <span className="text-xs text-text-tertiary">
          (choose up to {CONFIG.MAX_TRAVEL_STYLES})
        </span>
      </label>
      <div className="flex flex-wrap gap-2">
        {TRAVEL_STYLES.map((style) => {
          const isSelected = selected.includes(style);
          const isDisabled = !isSelected && selected.length >= CONFIG.MAX_TRAVEL_STYLES;

          return (
            <button
              key={style}
              type="button"
              onClick={() => toggle(style)}
              disabled={isDisabled}
              className={cn(
                'h-9 px-4 rounded-full border text-sm font-medium transition-all duration-150',
                isSelected
                  ? 'bg-voyagr-blue/15 border-voyagr-blue text-voyagr-blue shadow-[0_0_12px_rgba(79,126,255,0.2)]'
                  : 'bg-bg-surface border-bg-border text-text-secondary hover:border-bg-border/80',
                isDisabled && 'opacity-40 cursor-not-allowed'
              )}
              aria-pressed={isSelected}
            >
              {style}
            </button>
          );
        })}
      </div>
    </div>
  );
}
