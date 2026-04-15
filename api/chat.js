// api/chat.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, history } = req.body || {};
  if (!message) {
    return res.status(400).json({ error: 'Missing message' });
  }

  // Build contents array for multi-turn conversation
  const contents = [
    ...(history || []),
    { role: 'user', parts: [{ text: message }] },
  ];

  try {
    const resp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents }),
      },
    );

    if (!resp.ok) {
      const err = await resp.text();
      console.error('Gemini API error:', err);
      return res.status(502).json({ error: 'Gemini request failed' });
    }

    const data = await resp.json();
    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ?? 'No response.';

    return res.status(200).json({ reply });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal error' });
  }
}
