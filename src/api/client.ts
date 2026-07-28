import type { AppError } from '@/types/ui';
import { CONFIG } from '@/constants/config';

/**
 * Fetches a URL with a 30-second timeout via AbortController.
 * Throws a typed AppError on any failure — network, timeout, or non-2xx.
 * Components never touch raw Response objects.
 */
export async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  signal?: AbortSignal
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), CONFIG.API_TIMEOUT_MS);

  // If an external signal is provided, chain it
  const combinedSignal = signal
    ? AbortSignal.any([controller.signal, signal])
    : controller.signal;

  try {
    const response = await fetch(url, { ...options, signal: combinedSignal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      const error = mapHttpError(response.status);
      throw error;
    }

    return response;
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    if (err instanceof Error && err.name === 'AbortError') {
      throw {
        type: 'timeout',
        message: 'The request took too long. Please try again.',
        retryable: true,
      } satisfies AppError;
    }
    if (err && typeof err === 'object' && 'type' in err) {
      // Already a typed AppError — rethrow
      throw err;
    }
    throw {
      type: 'network',
      message: 'Connection failed. Check your network and try again.',
      retryable: true,
    } satisfies AppError;
  }
}

function mapHttpError(status: number): AppError {
  if (status === 429) {
    return { type: 'rateLimit', message: 'Too many requests. Wait a moment and try again.', retryable: true };
  }
  if (status === 401 || status === 403) {
    return { type: 'network', message: 'Configuration error. Please contact support.', retryable: false };
  }
  return { type: 'network', message: `Server error (${status}). Please try again.`, retryable: true };
}
