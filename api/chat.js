// api/chat.js
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse/lib/pdf-parse.js');

/* ------------------------------------------------------------------ */
/*  Hardcoded instructions (always present, regardless of PDF status)  */
/* ------------------------------------------------------------------ */
const INSTRUCTIONS = `You are the virtual assistant for Igor Garcia's portfolio website. Your role is to answer questions about Igor's career, skills, projects, and experience in a friendly and professional tone. Always answer in the same language the user writes in.

## Contact & Links
- LinkedIn: https://www.linkedin.com/in/igor-garcia-5a449a1b5/
- GitHub: https://github.com/IgorGarciaCosta
- ArtStation: https://igorgarcia6.artstation.com/

## Behavior
- If asked about something unrelated to Igor's career or portfolio, politely redirect the conversation.
- Keep answers concise but informative.
- You may suggest the user check specific sections of the portfolio or download Igor's CV for more details.
- Base your answers primarily on the CV content provided below. If the CVs don't cover a topic, say you don't have that information.`;

/* ------------------------------------------------------------------ */
/*  Fallback prompt (used when PDF extraction fails)                   */
/* ------------------------------------------------------------------ */
const FALLBACK_CV = `## About Igor Garcia
- Software Engineer / Computer Engineer with 4+ years of experience
- Currently at Ford Motor Company — building virtual prototypes to cut physical mock-up costs and speed design decisions
- Previously at Blue Gravity Studios — delivered multiplayer gameplay and responsive UI for SkateNation XL

## Technical Skills
**Frontend**: JavaScript, TypeScript, React, Tailwind CSS, CSS3, HTML5
**Backend**: C++, Python, Node.js
**Tools**: Unreal Engine, GitHub, Git, Figma, Jira, NPM, Vite, Blender, Substance Painter 3D, ZBrush`;

/* ------------------------------------------------------------------ */
/*  PDF helpers + module-level cache                                   */
/* ------------------------------------------------------------------ */
const PDF_FILES = [
  { label: 'Real-Time Systems Engineer CV', file: 'IgorGarcia_RealTime_Systems_Engineer.pdf' },
  { label: 'Software Development Engineer CV', file: 'IgorGarcia_Software_Development_Engineer.pdf' },
];

let cachedPrompt = null;

function getBaseUrl() {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:5173';
}

async function fetchPdfText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`PDF fetch failed: ${res.status} ${url}`);
  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const { text } = await pdfParse(buffer);
  return text.trim();
}

async function getSystemPrompt() {
  if (cachedPrompt) return cachedPrompt;

  const base = getBaseUrl();

  try {
    const cvTexts = await Promise.all(
      PDF_FILES.map(async ({ label, file }) => {
        const text = await fetchPdfText(`${base}/${file}`);
        return `## ${label}\n${text}`;
      }),
    );

    cachedPrompt = `${INSTRUCTIONS}\n\n${cvTexts.join('\n\n')}`;
  } catch (err) {
    console.error('PDF extraction failed, using fallback:', err.message);
    cachedPrompt = `${INSTRUCTIONS}\n\n${FALLBACK_CV}`;
  }

  return cachedPrompt;
}

/* ------------------------------------------------------------------ */
/*  Handler                                                            */
/* ------------------------------------------------------------------ */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, history } = req.body || {};
  if (!message) {
    return res.status(400).json({ error: 'Missing message' });
  }

  const systemPrompt = await getSystemPrompt();

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
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemPrompt }] },
          contents,
        }),
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
