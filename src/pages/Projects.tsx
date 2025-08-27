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
      "Unreal Engine application that exports skinned meshes at runtime feature, still inexistent in market. Available on FAB official marketplace: https://www.fab.com/listings/7f713413-e4d3-4ac8-9c53-975fb70b1170.",
    videoSrc: "https://www.youtube.com/embed/rJmea9DGjjo",
  },
  {
    title: "OpenAI UE5 integration Plugin",
    description:
      "Plugin that integrates the Unreal editor with OpenAI services for text, image and code generation and creates an all in one environment.",
    videoSrc: "https://www.youtube.com/embed/SM36E1veQto",
  },
  {
    title: "Keyboard Heatmap",
    description:
      "C++ UE plugin that monitorizes every user keyboard input during game execution and generates heatmap graphics and .xml lists with the extracted data.",
    videoSrc: "https://www.youtube.com/embed/eeszm5rO-bI",
  },
  {
    title: "Unused plugins handler",
    description:
      "UE full C++ plugin that born from a user necessity of my team to manage and disable unnecessary plugins in a project automatically",
    videoSrc: "https://www.youtube.com/embed/KsBKdIevOns",
  },
  {
    title: "VR bedroom simulation",
    description:
      "Bedroom simulation in VR with interactive objects and realistic lighting implemented in UE5.5 using a Vive XR Elite.",
    videoSrc: "https://www.youtube.com/embed/VUssMq4qAyk",
  },
  {
    title: "Platform 2D game",
    description:
      "Weekend prototype of a 2D game implemented in UE using BPs, paper 2D and FLipbooks, featuring some core mechanics, like: movement, jumping, enemies, collectibles and points/life system.",
    videoSrc: "https://www.youtube.com/embed/HTJ7bF0yzVs",
  },
  {
    title: "Laser launcher robot",
    description:
      "Robot that moves and fires a laser at targets, with lighting & destruction FX. Implemented in UE5 using technologies as Niagara, Lumen and Nanite. Made the whole process from scratch: modeling, texturing, rigging, animating and programming.",
    videoSrc: "https://www.youtube.com/embed/Qf3frW3jAWk",
  },
  {
    title: "Skateboarding prototype",
    description:
      "Skateboarding game with core mechanichs like move, sprint, jump and count points with responsive UI for gamepad / keyboard implemented as a 2 day challenge",
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
