/**
 * src/api/geminiClient.ts
 * Minimal client for Google Gemini REST API (v1beta). Supports JSON mode.
 */

import { getApiKeyInfo } from '@/utils/apiKey';

export async function callGeminiDirect(prompt: string, signal?: AbortSignal): Promise<string> {
  const { provider, key } = getApiKeyInfo();
  if (provider !== 'gemini' || !key) {
    throw new Error('Gemini API key not configured');
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`;

  const body = {
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 4096,
      responseMimeType: 'application/json', // request JSON response
    },
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal,
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error('Gemini API error', response.status, errText);
    throw new Error('Gemini API error');
  }

  const data = await response.json();
  // Gemini returns candidates[].content.parts[].text
  const content = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
  return content;
}
