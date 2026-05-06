import type { Tag, ProjectLink } from "@/components/ProjectCard";

export interface Project {
  title: string;
  description: string;
  videoSrc?: string;
  images?: string[];
  tags: Tag[];
  links?: ProjectLink[];
}

export const PROJECTS: Project[] = [
  {
    title: "Interactive Totem — Selfie with Lis",
    description:
      "Interactive AI avatar totem developed at Estúdio Cafundó. Programmed in C#, the installation lets visitors interact with a real-time AI-driven character — blending generative AI and a custom kiosk interface into a seamless public experience.",
    videoSrc: "https://www.youtube.com/embed/OgaoAdtmf34",
    tags: ["C#"],
    links: [
      {
        label: "Product Page",
        url: "https://www.cafundo.tv/selfie-com-lis/",
        icon: "external",
      },
    ],
  },
  {
    title: "SkateNationXL",
    description:
      "Multiplayer skateboarding game where I worked as a C++ Software Engineer — contributing to core gameplay systems, network replication and online session management to deliver a smooth, responsive multiplayer experience.",
    videoSrc: "https://www.youtube.com/embed/_C7ui4kHskI",
    tags: ["Unreal / C++"],
  },
  {
    title: "Laser launcher robot",
    description:
      "Full-pipeline solo project: modeled, rigged, animated and programmed a laser-firing robot entirely from scratch in UE5. Showcases mastery of Niagara particle FX, Lumen global illumination and Nanite virtualized geometry in a single production-quality scene.",
    videoSrc: "https://www.youtube.com/embed/Qf3frW3jAWk",
    tags: ["Unreal / C++"],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/IgorGarciaCosta/MechaDevelopment",
        icon: "github",
      },
    ],
  },
  {
    title: "Skateboarding prototype",
    description:
      "Rapid-prototype built in 48 hours — demonstrates the ability to deliver a polished, playable game loop under tight deadlines. Features fluid movement, trick system, score tracking and full gamepad/keyboard input parity.",
    videoSrc: "https://www.youtube.com/embed/CL3kiYauUl0",
    tags: ["Unreal / C++"],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/IgorGarciaCosta/SkateboardingPrototype",
        icon: "github",
      },
    ],
  },
  {
    title: "Realtime mesh Exporter",
    description:
      "Fills a genuine market gap: the first publicly available UE tool capable of exporting fully skinned meshes at runtime. Published and sold on the official FAB marketplace, proving real-world production value and demand.",
    videoSrc: "https://www.youtube.com/embed/rJmea9DGjjo",
    tags: ["Unreal / C++", "Tools"],
  },
  {
    title: "Unreal Measurement Tool Plugin",
    description:
      "Spline-based measurement plugin for Unreal Engine 5.7 that measures distances and areas in-editor with real-time visual feedback. Features multiple units (cm, m, km, ft, in, yd), linear/curve splines, snap-to-geometry modes, cumulative & angle labels, area calculation via Shoelace formula, and a custom Editor Mode with a dedicated toolkit panel. Published on the FAB marketplace.",
    images: [
      "/projects/measurement-tool/overview.png",
      "/projects/measurement-tool/linearMeasurement.png",
      "/projects/measurement-tool/curveMeasurement.png",
      "/projects/measurement-tool/areaMeasurement.png",
      "/projects/measurement-tool/irregularAreaMeasurement.png",
      "/projects/measurement-tool/snapToSurface.png",
      "/projects/measurement-tool/cumulativeLabels.png",
      "/projects/measurement-tool/angleLabels.png",
    ],
    tags: ["Unreal / C++", "Tools"],
    links: [
      {
        label: "FAB Marketplace",
        url: "https://www.fab.com/listings/5c2a20d1-1537-4ca3-9255-405d38b79b05",
        icon: "external",
      },
      {
        label: "GitHub",
        url: "https://github.com/IgorGarciaCosta/UnrealMeasurementToolPlugin",
        icon: "github",
      },
    ],
  },
  {
    title: "OpenAI UE5 integration Plugin",
    description:
      "Editor plugin that embeds OpenAI's text, image and code-generation APIs directly inside Unreal Engine, turning the IDE into a unified AI-powered workspace and cutting context-switching time for the entire team.",
    videoSrc: "https://www.youtube.com/embed/SM36E1veQto",
    tags: ["Unreal / C++", "Tools"],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/IgorGarciaCosta/OpenAIPlugin",
        icon: "github",
      },
    ],
  },
  {
    title: "Keyboard Heatmap",
    description:
      "Data-driven UX analytics tool built in C++. Tracks every keystroke during gameplay, then visualises the aggregated data as interactive heatmaps and structured XML reports — enabling designers to make evidence-based input decisions.",
    videoSrc: "https://www.youtube.com/embed/eeszm5rO-bI",
    tags: ["Unreal / C++", "Tools"],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/IgorGarciaCosta/Unreal-Keyboard-Heatmap-Plugin",
        icon: "github",
      },
    ],
  },
  {
    title: "Unused plugins handler",
    description:
      "Born out of a real team pain point: a C++ editor plugin that audits, disables and manages unused UE plugins automatically — reducing compile times and keeping large projects lean without manual intervention.",
    videoSrc: "https://www.youtube.com/embed/KsBKdIevOns",
    tags: ["Unreal / C++", "Tools"],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/IgorGarciaCosta/UnusedPluginsLister",
        icon: "github",
      },
    ],
  },
  {
    title: "VR bedroom simulation",
    description:
      "Immersive XR experience built in UE5.5 for the Vive XR Elite — features physically interactive objects and cinematic lighting that demonstrate hands-on expertise with the full VR development pipeline.",
    videoSrc: "https://www.youtube.com/embed/VUssMq4qAyk",
    tags: ["VR", "Unreal / C++"],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/IgorGarciaCosta/VRRoom",
        icon: "github",
      },
    ],
  },
  {
    title: "Platform 2D game",
    description:
      "Weekend challenge that produced a complete 2D platformer in UE: fluid character movement, enemy AI, collectibles and a lives/score system — all built with Paper 2D and Flipbooks, proving fast iteration from zero to shippable.",
    videoSrc: "https://www.youtube.com/embed/HTJ7bF0yzVs",
    tags: ["Unreal / C++"],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/IgorGarciaCosta/Unreal_CPP_Platfprmer",
        icon: "github",
      },
    ],
  },
  {
    title: "Resume Matcher — AI Job Search Platform",
    description:
      "Full-stack application that aggregates remote job listings from 7+ job boards and uses Google Gemini AI to analyze resume-to-job match. Features user authentication with JWT HttpOnly cookies, saved analysis history, a 3D interactive globe, and PDF resume parsing — built with ASP.NET Core 9, React 19, TypeScript, PostgreSQL and deployed via Docker on Render.",
    videoSrc: "https://www.youtube.com/embed/BeA48l5wG2s",
    tags: ["Web", "Backend"],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/IgorGarciaCosta/Resume-Matcher-Job-Search-Platform",
        icon: "github",
      },
      {
        label: "Live Demo",
        url: "https://resume-matcher-job-search-platform.vercel.app/",
        icon: "external",
      },
    ],
  },
  {
    title: "Cripto Checker",
    description:
      "Full-stack React web app that monitors live crypto prices and fires personalised email alerts the moment user-defined thresholds are crossed — combining real-time API integration with a clean, responsive UI.",
    videoSrc: "https://www.youtube.com/embed/Tb5DNL9x4HQ",
    tags: ["Web", "Backend"],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/IgorGarciaCosta/crypto-alerts",
        icon: "github",
      },
      {
        label: "Live Demo",
        url: "https://crypto-alerts-flfcjagba-igorgarciacostas-projects.vercel.app/",
        icon: "external",
      },
    ],
  },
  {
    title: "PSN Price Tracker",
    description:
      "Full-stack price monitoring app built with ASP.NET Core (.NET 9) and an interactive Telegram bot. Tracks PlayStation Store prices in real time via web scraping and sends alerts when games hit your target — featuring automatic background monitoring, a REST API with key auth and rate limiting, Swagger docs, SQLite persistence, and Docker deployment.",
    images: [
      "https://raw.githubusercontent.com/IgorGarciaCosta/PSN-Price-Tracker/main/docs/swagger-overview.png",
      "https://raw.githubusercontent.com/IgorGarciaCosta/PSN-Price-Tracker/main/docs/swagger-schemas.png",
      "https://raw.githubusercontent.com/IgorGarciaCosta/PSN-Price-Tracker/main/docs/swagger-endpoint.png",
      "https://raw.githubusercontent.com/IgorGarciaCosta/PSN-Price-Tracker/main/docs/swagger-auth.png",
      "https://raw.githubusercontent.com/IgorGarciaCosta/PSN-Price-Tracker/main/docs/swagger-response.png",
    ],
    tags: ["Web", "Backend"],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/IgorGarciaCosta/PSN-Price-Tracker",
        icon: "github",
      },
      {
        label: "Telegram Bot",
        url: "https://t.me/PsnNotificationsSender_bot",
        icon: "telegram",
      },
    ],
  },
  {
    title: "Smart Mesh Cleaner Pro",
    description:
      "Blender add-on that streamlines asset maintenance with a Smart Trash Bin system — safely staging deletions, previewing impact and enabling one-click restore, so artists can clean scenes confidently without data loss.",
    videoSrc: "https://www.youtube.com/embed/c0-_-ubsPd8",
    tags: ["Tools"],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/IgorGarciaCosta/blender-smart-mesh-cleaner",
        icon: "github",
      },
    ],
  },
];

export const ALL_TAGS: readonly (Tag | "All")[] = [
  "All",
  "Unreal / C++",
  "C#",
  "Web",
  "Backend",
  "Tools",
  "VR",
] as const;
