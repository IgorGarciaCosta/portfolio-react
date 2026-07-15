const INSTRUCTIONS = `You are the virtual assistant for Igor Garcia's portfolio website. Your role is to answer questions about Igor's career, skills, projects, and experience in a friendly and professional tone. Always answer in the same language the user writes in.

## Contact & Links
- LinkedIn: https://www.linkedin.com/in/igor-garcia-5a449a1b5/
- GitHub: https://github.com/IgorGarciaCosta
- ArtStation: https://igorgarcia6.artstation.com/

## Behavior
- If asked about something unrelated to Igor's career or portfolio, politely redirect the conversation.
- Keep answers concise but informative.
- You may suggest the user check specific sections of the portfolio or download Igor's CV for more details.
- Base your answers only on the portfolio context below. If it doesn't cover a topic, say you don't have that information.`;

const PORTFOLIO_CONTEXT = `## Profile
- Software Engineer and Computer Engineer with 4+ years of experience.
- Strong background in C++, C#, Python, ASP.NET Core, React, TypeScript, backend architecture, real-time 3D, automation, and cloud infrastructure.
- EU citizen open to remote work or relocation in Ireland, the UK, or the EU.

## Experience
- Ford Motor Company — Software Engineer / C++ Developer (Jan 2023–Present): high-performance internal tooling, automated validation pipelines, Python/VRED automation, and React/TypeScript dashboards. Work contributed to approximately 40% annual material cost reduction and 50% faster design iteration.
- Ford Motor Company — Virtual Reality Researcher (Aug 2021–Dec 2022): automotive VR R&D and virtual-prototyping workflows, improving assessment accuracy by 20%.
- Blue Gravity Studios — Unreal Engine 5 / C++ Developer (Jan 2024–Sep 2024): multiplayer replication, network optimization, modular gameplay systems, and cross-platform input for SkateNation XL.
- Cafundó Creative Studios — Software Engineer / C# (Jun 2025–Present): AI-powered Unity installation integrating Azure Cognitive Services and OpenAI, serving 500+ daily interactions.

## Skills
- Frontend: JavaScript, TypeScript, React, Tailwind CSS, HTML, CSS.
- Backend: C#, C++, Python, ASP.NET Core, Node.js, SQL, PostgreSQL, SQLite, Firebase, Docker.
- Tools: Git, GitHub, GitHub Actions, Vite, Figma, Jira, Unreal Engine, Unity.
- Currently learning: AWS and Oracle Cloud Infrastructure.

## Selected projects
- VRED MCP Server: Python MCP server for controlling Autodesk VRED scenes, materials, rendering, animations, and variants.
- Unreal Measurement Tool Plugin: Unreal Engine 5.7 editor plugin for measuring distances and areas; published on FAB.
- Realtime Mesh Exporter: runtime skinned-mesh exporter for Unreal Engine; published on FAB.
- Resume Matcher: ASP.NET Core 9, React 19, PostgreSQL, Docker, and Gemini application that matches resumes to jobs.
- PSN Price Tracker: ASP.NET Core service and Telegram bot with scraping, alerts, SQLite, Swagger, rate limiting, and Docker.
- Additional work includes SkateNation XL, Unreal/OpenAI integration, VR experiences, gameplay prototypes, editor tools, Crypto Checker, and a Blender mesh-cleaning add-on.`;

const SYSTEM_PROMPT = `${INSTRUCTIONS}\n\n${PORTFOLIO_CONTEXT}`;

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
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
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
