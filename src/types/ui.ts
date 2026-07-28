export type AppStatus =
  | 'idle'
  | 'loading'
  | 'streaming'
  | 'success'
  | 'empty'
  | 'error';

export type ErrorType = 'network' | 'schema' | 'timeout' | 'partial' | 'rateLimit';

export interface AppError {
  type: ErrorType;
  message: string;
  retryable: boolean;
}

export interface TripFormValues {
  destination: string;
  durationDays: number;
  budget: number;
  currency: string;
  travelStyles: string[];
  notes: string;
}

export interface GenerationRequest {
  formValues: TripFormValues;
  requestId: string;
}

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ToastState {
  id: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  duration?: number;
}