/* --------------------- pages/Projects.tsx --------------------- */
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProjectCard } from "@/components/ProjectCard";

/* ------------------- lista de projetos ------------------- */
const PROJECTS = [
  {
    title: "Realtime mesh Exporter",
    description:
      "Unreal engine application of a new technology that still didnt exist on the market that allows users to export skinned meshes in runtime. Published on unreal marketplace.",
    videoSrc: "https://www.youtube.com/embed/rJmea9DGjjo",
  },
  {
    title: "OpenAI UE5 integration Plugin",
    description:
      "UE pluhin of integration between the editor and OepnAI services, allowing users to generate text, images and code using AI.",
    videoSrc: "https://www.youtube.com/embed/SM36E1veQto",
  },
  {
    title: "VR bedroom simulation",
    description:
      "Simulation of a bedroom in VR using Unreal Engine, with interactive objects and realistic lighting.",
    videoSrc: "https://www.youtube.com/embed/VUssMq4qAyk",
  },
  {
    title: "Platform 2D game",
    description:
      "Project featuring a 2D platform game with character movement, animations, enemies, collectibles, and differnet level mechanics.",
    videoSrc: "https://www.youtube.com/embed/HTJ7bF0yzVs",
  },
  {
    title: "Laser launcher robot",
    description:
      "Multidisplinary project where I designed 3D modleed, texturized and built a robot capable of moving and shooting a laser at targets. With realistic lighting and destrcution effects",
    videoSrc: "https://www.youtube.com/embed/Qf3frW3jAWk",
  },
  {
    title: "Skateboarding prototype",
    description:
      "Implemented core skating mechanics, responsive UI for gamepad / keyboard as a 2 days challenge.",
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
