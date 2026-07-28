import { ApiErrorState } from './ApiErrorState';
import { SchemaErrorState } from './SchemaErrorState';
import type { AppError } from '@/types/ui';

interface ErrorStateProps {
  error: AppError;
  onRetry: () => void;
  onStartOver: () => void;
  onEditPrompt: () => void;
}

/**
 * Router component — picks the correct error UI based on error.type.
 * Components upstream never need to know which error variant to render.
 */
export function ErrorState({ error, onRetry, onStartOver, onEditPrompt }: ErrorStateProps) {
  switch (error.type) {
    case 'schema':
      return <SchemaErrorState onRegenerate={onRetry} onEditPrompt={onEditPrompt} />;
    case 'network':
    case 'timeout':
    case 'rateLimit':
    default:
      return (
        <ApiErrorState
          message={error.message}
          onRetry={onRetry}
          onStartOver={onStartOver}
        />
      );
  }
}
