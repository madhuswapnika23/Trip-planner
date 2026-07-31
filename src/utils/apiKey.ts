// src/utils/apiKey.ts
/**
 * Utility functions for retrieving and storing API keys for Gemini and OpenAI.
 * Keys can be provided via environment variables (VITE_GEMINI_API_KEY, VITE_OPENAI_API_KEY)
 * or via the in‑app API Key settings modal. The modal persists keys in localStorage.
 */

export type Provider = "gemini" | "openai";

/** Retrieve the API key for the given provider. */
export function getApiKey(provider: Provider): string | undefined {
  if (provider === "gemini") {
    // Vite exposes env vars prefixed with VITE_
    return import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem("geminiApiKey") || undefined;
  }
  if (provider === "openai") {
    return import.meta.env.VITE_OPENAI_API_KEY || localStorage.getItem("openaiApiKey") || undefined;
  }
  return undefined;
}

/** Store the API key for the given provider (used by the UI modal). */
export function setApiKey(provider: Provider, key: string): void {
  localStorage.setItem(provider === "gemini" ? "geminiApiKey" : "openaiApiKey", key);
}

/** Helper to determine which provider is configured. */
export function getConfiguredProvider(): Provider {
  const gemini = getApiKey("gemini");
  const openai = getApiKey("openai");
  if (gemini) return "gemini";
  if (openai) return "openai";
  // Default to Gemini if none set – callers will handle missing key.
  return "gemini";
}

/** Return provider and api key */
export function getApiKeyInfo(): { provider: Provider; key: string } {
  const provider = getConfiguredProvider();
  const key = getApiKey(provider);
  if (!key) {
    throw new Error(`API key for ${provider} not found`);
  }
  return { provider, key };
}
