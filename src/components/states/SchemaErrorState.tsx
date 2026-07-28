import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface SchemaErrorStateProps {
  onRegenerate: () => void;
  onEditPrompt: () => void;
}

export function SchemaErrorState({ onRegenerate, onEditPrompt }: SchemaErrorStateProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
      <div className="w-16 h-16 rounded-2xl bg-voyagr-amber/10 border border-voyagr-amber/30 flex items-center justify-center mb-6">
        <AlertTriangle className="w-8 h-8 text-voyagr-amber" />
      </div>
      <h2 className="text-xl font-display font-bold text-text-primary mb-2">
        Unexpected Response
      </h2>
      <p className="text-sm text-text-secondary max-w-sm mb-8 leading-relaxed">
        The AI returned something we couldn't interpret. This is rare — try regenerating
        or adjusting your prompt.
      </p>
      <div className="flex gap-3">
        <Button variant="primary" size="md" onClick={onRegenerate}>
          Regenerate
        </Button>
        <Button variant="secondary" size="md" onClick={onEditPrompt}>
          Edit Prompt
        </Button>
      </div>
    </div>
  );
}
