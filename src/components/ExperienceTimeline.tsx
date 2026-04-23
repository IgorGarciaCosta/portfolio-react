import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

/* --------------------------------- types -------------------------------- */
type Experience = {
  role: string;
  company: string;
  period: string;
  bullets: string[];
  tags: string[];
};

/* --------------------------------- data --------------------------------- */
const experiences: Experience[] = [
  {
    role: "Virtual Reality Researcher",
    company: "Ford Motor Company",
    period: "Aug 2021 – Dec 2022",
    bullets: [
      "Spearheaded R&D for automotive VR applications, establishing workflows later adopted as the company standard for virtual prototyping.",
      "Translated physical requirements into virtual specifications, improving user assessment accuracy by 20%.",
      "Developed initial prototypes for virtual user-experience testing, validating key interaction concepts.",
    ],
    tags: ["VR", "Unreal Engine", "R&D", "Prototyping"],
  },
  {
    role: "Software Engineer",
    company: "Ford Motor Company",
    period: "Jan 2023 – Present",
    bullets: [
      "Engineered high-performance internal tooling and automated validation pipelines in C++, contributing to ~40% annual material cost reduction.",
      "Collaborated with Design and Engineering teams to build custom tools, reducing design iteration cycles by ~50%.",
      "Developed Python automation scripts for VRED workflows and built internal React/TypeScript dashboards to streamline team operations.",
    ],
    tags: ["C++", "Python", "React", "TypeScript", "Unreal Engine", "Tooling"],
  },
  {
    role: "Unreal Engine 5 Developer / C++",
    company: "Blue Gravity Studios",
    period: "Jan 2024 – Sep 2024",
    bullets: [
      "Engineered core network replication logic (TCP/UDP) for multiplayer architecture, optimising bandwidth usage by 25%.",
      "Developed modular software systems, reducing bug-fixing overhead by 20% for the engineering team.",
      "Implemented scalable input systems, cutting latency by 15 ms with 100% cross-platform compatibility.",
    ],
    tags: ["Unreal Engine", "C++", "Multiplayer", "Networking"],
  },
  {
    role: "Software Engineer / C#",
    company: "Cafundó Creative Studios",
    period: "Jun 2025 – Present",
    bullets: [
      "Architected an AI-powered interactive totem in Unity (C#) for high-traffic public environments, serving 500+ daily interactions with zero downtime.",
      "Integrated Azure Cognitive Services and OpenAI APIs, reducing voice-to-response latency by 30%.",
      "Designed intuitive UI/UX focused on accessibility and seamless real-time interaction.",
    ],
    tags: ["C#", "Unity", "Azure AI", "OpenAI"],
  },
];

/* ------------------------------ constants ------------------------------- */
const GW = 68;
const L0 = 20;
const L1 = 50;
const SW = 2;

const palette = {
  main: "#3b82f6",
  vr: "#8b5cf6",
  bg: "#f59e0b",
  cf: "#10b981",
} as const;

/* ----------------------------- graph helpers ----------------------------- */

/** Smooth S-curve from (fromX, yOff) to (toX, yOff + h) */
function sCurve(fromX: number, toX: number, h: number, yOff = 0) {
  const mid = yOff + h / 2;
  return `M${fromX},${yOff} C${fromX},${mid} ${toX},${mid} ${toX},${yOff + h}`;
}

function Lane({
  x,
  color,
  startAtDot,
}: {
  x: number;
  color: string;
  startAtDot?: boolean;
}) {
  return (
    <div
      className="absolute bottom-0 w-0.5"
      style={{ left: x - 1, top: startAtDot ? 33 : 0, backgroundColor: color }}
    />
  );
}

function Dot({ x, color }: { x: number; color: string }) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
      className="absolute top-6 z-10 flex h-[18px] w-[18px] items-center justify-center
                 rounded-full bg-white dark:bg-gray-900"
      style={{ left: x - 9, border: `2.5px solid ${color}` }}
    >
      <div
        className="h-2 w-2 rounded-full"
        style={{ backgroundColor: color }}
      />
    </motion.div>
  );
}

/* ----------------------------- card animation --------------------------- */
const cardVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 80, damping: 14 },
  },
};

function EntryCard({ exp }: { exp: Experience }) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="rounded-xl border border-gray-200 bg-gray-100 p-5 shadow-sm
                 transition-shadow hover:shadow-md
                 dark:border-gray-700 dark:bg-gray-800/80"
    >
      {/* header row */}
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {exp.role}{" "}
          <span className="font-normal text-gray-500 dark:text-gray-400">
            @ {exp.company}
          </span>
        </h3>
        <span
          className="whitespace-nowrap rounded-full bg-blue-100 px-3 py-0.5 text-xs font-medium
                     text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
        >
          {exp.period}
        </span>
      </div>

      {/* bullets */}
      <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        {exp.bullets.map((b, i) => (
          <li key={i} className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400 dark:bg-blue-500" />
            {b}
          </li>
        ))}
      </ul>

      {/* tech badges */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {exp.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium
                       text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/* ----------------------------- main component --------------------------- */
export default function ExperienceTimeline() {
  const CH = 48;
  const MF = 56;

  return (
    <div className="flex flex-col">
      {/* ─── Entry 0: VR Researcher ─── */}
      <div className="flex items-stretch gap-3">
        <div className="relative shrink-0" style={{ width: GW }}>
          <Lane x={L0} color={palette.main} startAtDot />
          <Dot x={L0} color={palette.vr} />
        </div>
        <div className="flex-1 py-1">
          <EntryCard exp={experiences[0]} />
        </div>
      </div>

      {/* Connector 0 → 1 */}
      <div>
        <svg width={GW} height={CH} aria-hidden="true">
          <line
            x1={L0}
            y1={0}
            x2={L0}
            y2={CH}
            stroke={palette.main}
            strokeWidth={SW}
          />
        </svg>
      </div>

      {/* ─── Entry 1: Ford SE ─── */}
      <div className="flex items-stretch gap-3">
        <div className="relative shrink-0" style={{ width: GW }}>
          <Lane x={L0} color={palette.main} />
          <Dot x={L0} color={palette.main} />
        </div>
        <div className="flex-1 py-1">
          <EntryCard exp={experiences[1]} />
        </div>
      </div>

      {/* Connector 1 → 2: fork to Blue Gravity */}
      <div>
        <svg width={GW} height={CH} aria-hidden="true">
          <line
            x1={L0}
            y1={0}
            x2={L0}
            y2={CH}
            stroke={palette.main}
            strokeWidth={SW}
          />
          <path
            d={sCurve(L0, L1, CH)}
            stroke={palette.bg}
            strokeWidth={SW}
            fill="none"
          />
        </svg>
      </div>

      {/* ─── Entry 2: Blue Gravity ─── */}
      <div className="flex items-stretch gap-3">
        <div className="relative shrink-0" style={{ width: GW }}>
          <Lane x={L0} color={palette.main} />
          <Lane x={L1} color={palette.bg} />
          <Dot x={L1} color={palette.bg} />
        </div>
        <div className="flex-1 py-1">
          <EntryCard exp={experiences[2]} />
        </div>
      </div>

      {/* Connector 2 → 3: merge BG back + fork to Cafundó */}
      <div>
        <svg width={GW} height={MF} aria-hidden="true">
          <line
            x1={L0}
            y1={0}
            x2={L0}
            y2={MF}
            stroke={palette.main}
            strokeWidth={SW}
          />
          <path
            d={sCurve(L1, L0, MF / 2, 0)}
            stroke={palette.bg}
            strokeWidth={SW}
            fill="none"
          />
          <path
            d={sCurve(L0, L1, MF / 2, MF / 2)}
            stroke={palette.cf}
            strokeWidth={SW}
            fill="none"
          />
        </svg>
      </div>

      {/* ─── Entry 3: Cafundó ─── */}
      <div className="flex items-stretch gap-3">
        <div className="relative shrink-0" style={{ width: GW }}>
          <Lane x={L0} color={palette.main} />
          <Lane x={L1} color={palette.cf} />
          <Dot x={L1} color={palette.cf} />
        </div>
        <div className="flex-1 py-1">
          <EntryCard exp={experiences[3]} />
        </div>
      </div>

      {/* Tail: both lanes fade out */}
      <div>
        <svg width={GW} height={24} aria-hidden="true">
          <defs>
            <linearGradient id="fade-main" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={palette.main} />
              <stop offset="100%" stopColor={palette.main} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="fade-cf" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={palette.cf} />
              <stop offset="100%" stopColor={palette.cf} stopOpacity={0} />
            </linearGradient>
          </defs>
          <line
            x1={L0}
            y1={0}
            x2={L0}
            y2={24}
            stroke="url(#fade-main)"
            strokeWidth={SW}
          />
          <line
            x1={L1}
            y1={0}
            x2={L1}
            y2={24}
            stroke="url(#fade-cf)"
            strokeWidth={SW}
          />
        </svg>
      </div>
    </div>
  );
}
