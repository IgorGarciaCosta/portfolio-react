/* --------------------- pages/Projects.tsx --------------------- */
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { ProjectCard } from "@/components/ProjectCard";

/* ------------------- lista de projetos ------------------- */
const PROJECTS = [
  {
    title: "Realtime mesh Exporter",
    description:
      "Unreal Engine application that exports skinned meshes at runtime (Marketplace).",
    videoSrc: "https://www.youtube.com/embed/rJmea9DGjjo",
  },
  {
    title: "OpenAI UE5 integration Plugin",
    description:
      "Plugin that connects the Unreal editor with OpenAI services for text, image and code generation.",
    videoSrc: "https://www.youtube.com/embed/SM36E1veQto",
  },
  {
    title: "VR bedroom simulation",
    description:
      "Bedroom simulation in VR with interactive objects and realistic lighting.",
    videoSrc: "https://www.youtube.com/embed/VUssMq4qAyk",
  },
  {
    title: "Platform 2D game",
    description:
      "2-day prototype: movement, enemies, collectibles and multiple mechanics.",
    videoSrc: "https://www.youtube.com/embed/HTJ7bF0yzVs",
  },
  {
    title: "Laser launcher robot",
    description:
      "Robot that moves and fires a laser at targets, with lighting & destruction FX.",
    videoSrc: "https://www.youtube.com/embed/Qf3frW3jAWk",
  },
  {
    title: "Skateboarding prototype",
    description:
      "Implemented core skating mechanics and responsive UI for gamepad / keyboard.",
    videoSrc: "https://www.youtube.com/embed/CL3kiYauUl0",
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
          {/* seta (mobile only) */}
          <FaChevronLeft
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl
                       text-blue-600 sm:hidden pointer-events-none"
          />
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
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
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
          {/* seta (mobile only) */}
          <FaChevronRight
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl
                       text-blue-600 sm:hidden pointer-events-none"
          />
          <ProjectCard {...PROJECTS[nextIdx]} shrink />
        </div>
      </div>
    </section>
  );
}
