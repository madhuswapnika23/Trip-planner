import { useReducer } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { CostBadge } from '@/components/ui/Badge';
import type { Activity, CostTier, EnergyLevel } from '@/types/itinerary';

interface EditActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  activity: Activity | null;
  onSave: (dayId: string, activityId: string, updates: Partial<Activity>) => void;
  dayId: string;
}

type EditState = {
  name: string;
  description: string;
  location: string;
  proTip: string;
  costTier: CostTier;
  estimatedCost: number;
  energyLevel: EnergyLevel;
};

type EditAction =
  | { type: 'SET_FIELD'; field: keyof EditState; value: string | number };

function editReducer(state: EditState, action: EditAction): EditState {
  if (action.type === 'SET_FIELD') {
    return { ...state, [action.field]: action.value };
  }
  return state;
}

export function EditActivityModal({ isOpen, onClose, activity, onSave, dayId }: EditActivityModalProps) {
  const [form, dispatch] = useReducer(
    editReducer,
    {
      name: activity?.name ?? '',
      description: activity?.description ?? '',
      location: activity?.location ?? '',
      proTip: activity?.proTip ?? '',
      costTier: activity?.costTier ?? 'budget',
      estimatedCost: activity?.estimatedCost ?? 0,
      energyLevel: activity?.energyLevel ?? 'medium',
    }
  );

  if (!activity) return null;

  const handleSave = () => {
    onSave(dayId, activity.id, {
      name: form.name,
      description: form.description,
      location: form.location,
      proTip: form.proTip || null,
      costTier: form.costTier,
      estimatedCost: Number(form.estimatedCost),
      energyLevel: form.energyLevel,
    });
    onClose();
  };

  const field = (
    label: string,
    key: keyof EditState,
    multiline?: boolean
  ) => (
    <div>
      <label className="block text-xs font-medium text-text-tertiary mb-1">{label}</label>
      {multiline ? (
        <textarea
          value={String(form[key])}
          onChange={(e) => dispatch({ type: 'SET_FIELD', field: key, value: e.target.value })}
          rows={3}
          className="w-full px-3 py-2 rounded-lg border border-bg-border bg-bg-surface text-sm text-text-primary outline-none focus:border-voyagr-blue resize-none"
        />
      ) : (
        <input
          type="text"
          value={String(form[key])}
          onChange={(e) => dispatch({ type: 'SET_FIELD', field: key, value: e.target.value })}
          className="w-full px-3 py-2 rounded-lg border border-bg-border bg-bg-surface text-sm text-text-primary outline-none focus:border-voyagr-blue"
        />
      )}
    </div>
  );

  const COST_TIERS: CostTier[] = ['free', 'budget', 'moderate', 'splurge'];
  const ENERGY_LEVELS: EnergyLevel[] = ['low', 'medium', 'high'];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Activity">
      <div className="p-6 space-y-4">
        {field('Name', 'name')}
        {field('Location', 'location')}
        {field('Description', 'description', true)}
        {field('Pro Tip', 'proTip', true)}

        <div>
          <label className="block text-xs font-medium text-text-tertiary mb-2">Cost Tier</label>
          <div className="flex gap-2 flex-wrap">
            {COST_TIERS.map((tier) => (
              <button
                key={tier}
                type="button"
                onClick={() => dispatch({ type: 'SET_FIELD', field: 'costTier', value: tier })}
                className={form.costTier === tier ? 'ring-2 ring-voyagr-blue rounded-full' : ''}
              >
                <CostBadge tier={tier} />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-text-tertiary mb-2">Energy Level</label>
          <div className="flex gap-2">
            {ENERGY_LEVELS.map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => dispatch({ type: 'SET_FIELD', field: 'energyLevel', value: level })}
                className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                  form.energyLevel === level
                    ? 'border-voyagr-blue bg-voyagr-blue/10 text-voyagr-blue'
                    : 'border-bg-border text-text-secondary'
                }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-text-tertiary mb-1">Estimated Cost</label>
          <input
            type="number"
            min={0}
            value={form.estimatedCost}
            onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'estimatedCost', value: Number(e.target.value) })}
            className="w-full px-3 py-2 rounded-lg border border-bg-border bg-bg-surface text-sm text-text-primary outline-none focus:border-voyagr-blue font-mono"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <Button variant="primary" size="md" className="flex-1" onClick={handleSave}>
            Save Changes
          </Button>
          <Button variant="secondary" size="md" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
}
