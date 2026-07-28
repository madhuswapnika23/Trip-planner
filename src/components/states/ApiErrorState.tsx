import { WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ApiErrorStateProps {
  message: string;
  onRetry: () => void;
  onStartOver: () => void;
}

export function ApiErrorState({ message, onRetry, onStartOver }: ApiErrorStateProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
      <div className="animate-pulse-slow mb-6">
        <div className="w-16 h-16 rounded-full bg-voyagr-coral/10 border border-voyagr-coral/30 flex items-center justify-center">
          <WifiOff className="w-8 h-8 text-voyagr-coral" />
        </div>
      </div>
      <h2 className="text-xl font-display font-bold text-text-primary mb-2">
        Couldn't Reach the AI
      </h2>
      <p className="text-sm text-text-secondary max-w-sm mb-2 leading-relaxed">
        {message}
      </p>
      <p className="text-xs text-text-tertiary mb-8">
        Your trip details are saved.
      </p>
      <div className="flex gap-3">
        <Button variant="primary" size="md" onClick={onRetry}>
          Try Again
        </Button>
        <Button variant="secondary" size="md" onClick={onStartOver}>
          Start Over
        </Button>
      </div>
    </div>
  );
}
