/**
 * Vercel Serverless Function — runs on Node.js, never in the browser.
 * Reads OPENAI_API_KEY from process.env (set in Vercel dashboard, never in the bundle).
 * Forwards the prompt to OpenAI and returns the raw content string.
 */
export default async function handler(
  req: { method?: string; body?: { prompt?: string } },
  res: {
    status: (code: number) => { json: (body: unknown) => void; end: () => void };
    setHeader: (name: string, value: string) => void;
  }
) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'API key not configured' });
    return;
  }

  const { prompt } = req.body ?? {};
  if (!prompt || typeof prompt !== 'string') {
    res.status(400).json({ error: 'Missing prompt in request body' });
    return;
  }

  try {
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        response_format: { type: 'json_object' },
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    });

    if (!openAIResponse.ok) {
      const errorText = await openAIResponse.text();
      console.error('OpenAI API error:', openAIResponse.status, errorText);
      res.status(openAIResponse.status).json({ error: 'OpenAI API error' });
      return;
    }

    const data = await openAIResponse.json() as {
      choices?: Array<{ message?: { content?: string } }>;
    };

    const content = data.choices?.[0]?.message?.content ?? '';
    res.status(200).json({ content });
  } catch (err) {
    console.error('Serverless function error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
