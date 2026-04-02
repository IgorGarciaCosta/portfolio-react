/* --------------------- pages/Projects.tsx --------------------- */
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { ProjectCard } from "@/components/ProjectCard";

/* ------------------- lista de projetos ------------------- */
const PROJECTS = [
  {
    title: "Laser launcher robot",
    description:
      "Full-pipeline solo project: modeled, rigged, animated and programmed a laser-firing robot entirely from scratch in UE5. Showcases mastery of Niagara particle FX, Lumen global illumination and Nanite virtualized geometry in a single production-quality scene.",
    videoSrc: "https://www.youtube.com/embed/Qf3frW3jAWk",
  },
  {
    title: "Skateboarding prototype",
    description:
      "Rapid-prototype built in 48 hours — demonstrates the ability to deliver a polished, playable game loop under tight deadlines. Features fluid movement, trick system, score tracking and full gamepad/keyboard input parity.",
    videoSrc: "https://www.youtube.com/embed/CL3kiYauUl0",
  },
  {
    title: "Realtime mesh Exporter",
    description:
      "Fills a genuine market gap: the first publicly available UE tool capable of exporting fully skinned meshes at runtime. Published and sold on the official FAB marketplace, proving real-world production value and demand.",
    videoSrc: "https://www.youtube.com/embed/rJmea9DGjjo",
  },
  {
    title: "OpenAI UE5 integration Plugin",
    description:
      "Editor plugin that embeds OpenAI's text, image and code-generation APIs directly inside Unreal Engine, turning the IDE into a unified AI-powered workspace and cutting context-switching time for the entire team.",
    videoSrc: "https://www.youtube.com/embed/SM36E1veQto",
  },

  {
    title: "Keyboard Heatmap",
    description:
      "Data-driven UX analytics tool built in C++. Tracks every keystroke during gameplay, then visualises the aggregated data as interactive heatmaps and structured XML reports — enabling designers to make evidence-based input decisions.",
    videoSrc: "https://www.youtube.com/embed/eeszm5rO-bI",
  },
  {
    title: "Unused plugins handler",
    description:
      "Born out of a real team pain point: a C++ editor plugin that audits, disables and manages unused UE plugins automatically — reducing compile times and keeping large projects lean without manual intervention.",
    videoSrc: "https://www.youtube.com/embed/KsBKdIevOns",
  },
  {
    title: "VR bedroom simulation",
    description:
      "Immersive XR experience built in UE5.5 for the Vive XR Elite — features physically interactive objects and cinematic lighting that demonstrate hands-on expertise with the full VR development pipeline.",
    videoSrc: "https://www.youtube.com/embed/VUssMq4qAyk",
  },
  {
    title: "Platform 2D game",
    description:
      "Weekend challenge that produced a complete 2D platformer in UE: fluid character movement, enemy AI, collectibles and a lives/score system — all built with Paper 2D and Flipbooks, proving fast iteration from zero to shippable.",
    videoSrc: "https://www.youtube.com/embed/HTJ7bF0yzVs",
  },
  {
    title: "Cripto Checker",
    description:
      "Full-stack React web app that monitors live crypto prices and fires personalised email alerts the moment user-defined thresholds are crossed — combining real-time API integration with a clean, responsive UI.",
    videoSrc: "https://www.youtube.com/embed/Tb5DNL9x4HQ",
  },
  {
    title: "Smart Mesh Cleaner Pro",
    description:
      "Blender add-on that streamlines asset maintenance with a Smart Trash Bin system — safely staging deletions, previewing impact and enabling one-click restore, so artists can clean scenes confidently without data loss.",
    videoSrc: "https://www.youtube.com/embed/c0-_-ubsPd8",
  },
];

const wrap = (i: number, len: number) => (i + len) % len;

export default function Projects() {
  const [index, setIndex] = useState(0); // cartão central
  const [direction, setDirection] = useState(0); // -1 ⟵ | +1 ⟶
  const len = PROJECTS.length;

  /* animação do cartão ativo */
  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      scale: 0.8,
      opacity: 0,
    }),
    center: { x: 0, scale: 1, opacity: 1, zIndex: 20 },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      scale: 0.8,
      opacity: 0,
      zIndex: 0,
    }),
  };

  const go = (newIdx: number, dir: number) => {
    setIndex(wrap(newIdx, len));
    setDirection(dir);
  };
  const prev = () => go(index - 1, -1);
  const next = () => go(index + 1, +1);

  const prevIdx = wrap(index - 1, len);
  const nextIdx = wrap(index + 1, len);

  return (
    <section id="projects" className="mx-auto max-w-6xl space-y-10 px-4">
      {/* ----------- título ----------- */}
      <h2 className="mb-8 pl-4 text-center text-3xl font-bold sm:pl-0 sm:text-left sm:text-4xl">
        Highlight Projects
      </h2>

      {/* --------------- carrossel --------------- */}
      <div className="relative flex items-center justify-center overflow-hidden">
        {/* ---------- lado esquerdo ---------- */}
        <div
          className="relative inset-y-0 left-0 z-10 flex w-28 items-center sm:w-56 lg:w-64
                     cursor-pointer select-none"
          onClick={prev}
        >
          {/* seta + halo (mobile only) */}
          <span
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
               flex items-center justify-center sm:hidden pointer-events-none
               h-12 w-12" /* área total do halo */
          >
            {/* halo borrado */}
            <span className="absolute inset-0 rounded-full bg-black/100 blur-sm" />
            {/* seta branca 100 % */}
            <FaChevronLeft size={20} className="relative z-10 text-white" />
          </span>
          <ProjectCard {...PROJECTS[prevIdx]} shrink />
        </div>

        {/* ---------- cartão ativo ---------- */}
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
            className="relative z-20 w-[85%] sm:w-[70%] lg:w-[60%]"
          >
            <ProjectCard {...PROJECTS[index]} active />
          </motion.div>
        </AnimatePresence>

        {/* ---------- lado direito ---------- */}
        <div
          className="relative inset-y-0 right-0 z-10 flex w-28 items-center justify-end
                     sm:w-56 lg:w-64 cursor-pointer select-none"
          onClick={next}
        >
          {/* seta + halo (mobile only) */}
          <span
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
               flex items-center justify-center sm:hidden pointer-events-none
               h-12 w-12"
          >
            <span className="absolute inset-0 rounded-full bg-black/100 blur-sm" />
            <FaChevronRight size={20} className="relative z-10 text-white" />
          </span>
          <ProjectCard {...PROJECTS[nextIdx]} shrink />
        </div>
      </div>
    </section>
  );
}
