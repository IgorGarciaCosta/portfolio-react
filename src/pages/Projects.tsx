/* --------------------- pages/Projects.tsx --------------------- */
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProjectCard } from "@/components/ProjectCard";
import type { Tag } from "@/components/ProjectCard";
import { PROJECTS, ALL_TAGS } from "@/data/projectsData";

export default function Projects() {
  const [activeTag, setActiveTag] = useState<Tag | "All">("All");

  const filtered = useMemo(
    () =>
      activeTag === "All"
        ? PROJECTS
        : PROJECTS.filter((p) => p.tags.includes(activeTag)),
    [activeTag],
  );

  return (
    <section id="projects" className="mx-auto max-w-6xl space-y-10 px-4">
      {/* ----------- título ----------- */}
      <h2 className="mb-8 pl-4 text-center text-3xl font-bold sm:pl-0 sm:text-left sm:text-4xl">
        Highlight Projects
      </h2>

      {/* ----------- filtro ----------- */}
      <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
        {ALL_TAGS.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActiveTag(tag)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors
              ${
                activeTag === tag
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* ----------- grid animado ----------- */}
      <motion.div
        layout
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
