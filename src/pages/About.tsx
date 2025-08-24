/* -------------- About.tsx (split-slide + tilt) -------------- */
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import profileImg from "@/assets/profile.jpg";

export default function About() {
  /* ---------- Framer-motion variants ---------- */
  const cardVariants: Variants = {
    hidden: { x: -50, opacity: 0 },
    show: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 80, damping: 14 },
    },
  };

  const photoVariants: Variants = {
    hidden: { x: 50, opacity: 0 },
    show: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 14,
        delay: 0.08,
      },
    },
  };

  /* ---------- summary text ---------- */
  const summary = (
    <div className="space-y-4 text-justify leading-7">
      <p>
        I’m <strong>Igor Garcia</strong>, a Computer Engineer with 4+ years of
        professional experience building interactive software and VR solutions.
        My core stack is <strong>C++ / Unreal Engine</strong>, where I architect
        systems, implement game mechanics and optimise performance for real-time
        applications.
      </p>

      <p>
        At <strong>Ford Motor Company</strong> I develop virtual prototypes that
        reduce physical mock-up costs, speed up design decisions and provide
        realistic visualisation of upcoming vehicles. I’ve also delivered
        multiplayer gameplay and responsive UI for
        <em className="italic"> SkateNation XL</em> during my tenure at
        <strong> Blue Gravity Studios</strong>.
      </p>

      <p>
        Beyond coding I enjoy <strong>3D modelling</strong> with Blender,
        ZBrush, Maya and CATIA, consistently blending art and engineering to
        craft compelling user experiences. I thrive in multidisciplinary teams,
        embrace Agile practices and keep my toolbox sharp with continuous
        learning.
      </p>
    </div>
  );

  const skills = [
    "C++",
    "Unreal Engine",
    "Blueprint",
    "VR Development",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Blender",
    "Git",
    "AWS",
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto mt-12 flex max-w-5xl flex-col gap-12 px-4"
    >
      {/* ---------- card + foto ---------- */}
      <div className="flex flex-col items-center gap-10 md:flex-row">
        {/* ---- CARD (split-slide da esquerda) ---- */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="
            w-full rounded-lg p-6 md:flex-1
            bg-gray-100 text-gray-900
            dark:bg-gray-800/80 dark:text-gray-100
          "
        >
          {summary}
        </motion.div>
        <motion.div
          variants={photoVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="relative h-64 w-64 shrink-0 md:h-80 md:w-80"
        >
          {/* carta atrás */}
          <span
            className="
      absolute top-4 left-4 h-full w-full -rotate-3 rounded-lg
      bg-blue-100 dark:bg-blue-900/30
    "
          />

          {/* foto com zoom */}
          <motion.img
            src={profileImg}
            alt="Igor Garcia portrait"
            whileHover={{ scale: 1.08 }}
            transition={{ type: "spring", stiffness: 150, damping: 12 }}
            className="relative h-full w-full rounded-lg object-cover shadow-lg"
          />
        </motion.div>
      </div>

      {/* ---------- skills ---------- */}
      <h2 className="text-2xl font-bold">Technical Skills</h2>

      <div className="flex flex-wrap gap-3">
        {skills.map((s) => (
          <span
            key={s}
            className="rounded bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900/40 dark:text-blue-300"
          >
            {s}
          </span>
        ))}
      </div>
    </motion.section>
  );
}
