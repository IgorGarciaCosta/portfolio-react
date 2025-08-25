/* --------------------- pages/Projects.tsx --------------------- */
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProjectCard } from "@/components/ProjectCard";

/* ------------------- lista de projetos ------------------- */
const PROJECTS = [
  {
    title: "Realtime mesh Exporter",
    description:
      "Interactive Unreal Engine application used at Ford to validate interior ergonomics and reduce physical mock-up cost.",
    videoSrc: "https://www.youtube.com/embed/rJmea9DGjjo",
  },
  {
    title: "OpenAI UE5 integration Plugin",
    description:
      "Implemented core skating mechanics, responsive UI for gamepad / keyboard and network optimisation for smooth online sessions.",
    videoSrc: "https://www.youtube.com/embed/SM36E1veQto",
  },
  {
    title: "VR bedroom simulation",
    description:
      "Interactive Unreal Engine application used at Ford to validate interior ergonomics and reduce physical mock-up cost.",
    videoSrc: "https://www.youtube.com/embed/VUssMq4qAyk",
  },
  {
    title: "Platform 2D game",
    description:
      "Implemented core skating mechanics, responsive UI for gamepad / keyboard and network optimisation for smooth online sessions.",
    videoSrc: "https://www.youtube.com/embed/HTJ7bF0yzVs",
  },
  {
    title: "Laser launcher robot",
    description:
      "Interactive Unreal Engine application used at Ford to validate interior ergonomics and reduce physical mock-up cost.",
    videoSrc: "https://www.youtube.com/embed/Qf3frW3jAWk",
  },
  {
    title: "Skateboarding prototype",
    description:
      "Implemented core skating mechanics, responsive UI for gamepad / keyboard and network optimisation for smooth online sessions.",
    videoSrc: "https://www.youtube.com/embed/CL3kiYauUl0",
  },
];

const wrap = (i: number, len: number) => (i + len) % len;

export default function Projects() {
  const [index, setIndex] = useState(0); // ativo
  const [direction, setDirection] = useState(0); // -1 ⟵ | +1 ⟶
  const len = PROJECTS.length;

  /* animação */
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
    <section id="projects" className="mx-auto max-w-6xl space-y-10">
      <h2 className="mb-8 text-3xl font-bold">Highlight Projects</h2>

      {/* -------------------- CARROSSEL -------------------- */}
      <div className="relative flex items-center justify-center overflow-hidden">
        {/* lado esquerdo */}
        <div
          className="absolute inset-y-0 left-0 z-10 flex items-center pl-4
                     w-40 sm:w-56 lg:w-64 cursor-pointer select-none"
          onClick={prev}
        >
          <ProjectCard {...PROJECTS[prevIdx]} shrink />
        </div>

        {/* cartão ativo */}
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="relative z-20 w-full sm:w-[70%] lg:w-[60%]"
          >
            <ProjectCard {...PROJECTS[index]} active />
          </motion.div>
        </AnimatePresence>

        {/* lado direito */}
        <div
          className="absolute inset-y-0 right-0 z-10 flex items-center pr-4
                     w-40 sm:w-56 lg:w-64 cursor-pointer select-none"
          onClick={next}
        >
          <ProjectCard {...PROJECTS[nextIdx]} shrink />
        </div>
      </div>
    </section>
  );
}
