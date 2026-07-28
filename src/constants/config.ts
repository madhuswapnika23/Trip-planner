export const CONFIG = {
  API_TIMEOUT_MS: 30_000,
  UNDO_WINDOW_MS: 5_000,
  MIN_DURATION_DAYS: 1,
  MAX_DURATION_DAYS: 30,
  DEFAULT_DURATION_DAYS: 5,
  DEFAULT_BUDGET: 1500,
  MIN_BUDGET: 0,
  MAX_BUDGET: 20000,
  MAX_TRAVEL_STYLES: 3,
  STATUS_MESSAGE_INTERVAL_MS: 2000,
  DAY_REVEAL_BASE_DELAY_MS: 120,
  DAY_REVEAL_STAGGER_MS: 80,
  BUDGET_WARNING_THRESHOLD: 1.0, // day spend exceeding this multiple of daily average is flagged
  LOCAL_STORAGE_KEY: 'voyagr:last-itinerary',
  LOCAL_STORAGE_FORM_KEY: 'voyagr:last-form',
} as const;

export const DURATION_OPTIONS = [3, 5, 7, 10] as const;

export const CURRENCY_OPTIONS = ['USD', 'EUR', 'GBP', 'JPY', 'INR', 'AUD', 'CAD'] as const;

export const STATUS_MESSAGES = [
  'Researching neighborhoods…',
  'Mapping your budget…',
  'Finding hidden gems…',
  'Checking travel times…',
  'Balancing your pace…',
  'Almost there…',
] as const;