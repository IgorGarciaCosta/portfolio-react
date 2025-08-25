/* ---------------------- About.tsx (split-slide + skills) ---------------------- */
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import profileImg from "@/assets/profile.jpg";

/* ------------------------- ICONES -------------------------- */
import {
  /* frontend (simple-icons) */
  SiJavascript,
  SiTypescript,
  SiReact,
  SiTailwindcss,
  SiCss3,
  SiHtml5,
  /* backend */
  SiCplusplus,
  SiPython,
  SiNodedotjs,
  SiGit,
  /* tools */
  SiUnrealengine,
  SiGithub,
  SiFigma,
  SiJirasoftware,
  SiNpm,
  SiVite,
  SiBlender,
} from "react-icons/si";

import {
  /* ícones genéricos (fontawesome) como fallback */
  FaPaintBrush, // ZBrush
  FaCube, // Substance Painter 3D
} from "react-icons/fa";

/* -------------------------- variantes de animação --------------------------- */
const cardVariants: Variants = {
  hidden: { x: -50, opacity: 0 },
  show: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 80, damping: 14 },
  },
} as const;

const photoVariants: Variants = {
  hidden: { x: 50, opacity: 0 },
  show: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 80, damping: 14, delay: 0.08 },
  },
} as const;

/* --------------------------- seção de skills animada ------------------------ */
type Skill = { icon: React.ReactNode; label: string };

function SkillSection({ title, skills }: { title: string; skills: Skill[] }) {
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  };

  return (
    <div className="md:grid md:grid-cols-[150px_1fr] md:items-start md:gap-10 space-y-4 md:space-y-0">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        {title}
      </h3>

      <motion.ul
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ amount: 0.25 }}
        className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 md:grid-cols-4"
      >
        {skills.map((s) => (
          <motion.li
            key={s.label}
            variants={item}
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
          >
            <span className="text-xl">{s.icon}</span>
            <span className="text-sm">{s.label}</span>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}

/* ----------------------------- listas de skills ----------------------------- */
const frontend: Skill[] = [
  { icon: <SiJavascript />, label: "JavaScript" },
  { icon: <SiTypescript />, label: "TypeScript" },
  { icon: <SiReact />, label: "React" },
  { icon: <SiTailwindcss />, label: "Tailwind CSS" },
  { icon: <SiCss3 />, label: "CSS3" },
  { icon: <SiHtml5 />, label: "HTML5" },
];

const backend: Skill[] = [
  { icon: <SiCplusplus />, label: "C++" },
  { icon: <SiPython />, label: "Python" },
  { icon: <SiNodedotjs />, label: "Node.js" },
  { icon: <SiGit />, label: "Git" },
];

const tools: Skill[] = [
  { icon: <SiUnrealengine />, label: "Unreal Engine" },
  { icon: <SiGithub />, label: "GitHub" },
  { icon: <SiGit />, label: "Git" },
  { icon: <SiFigma />, label: "Figma" },
  { icon: <SiJirasoftware />, label: "Jira" },
  { icon: <SiNpm />, label: "NPM" },
  { icon: <SiVite />, label: "Vite" },
  { icon: <SiBlender />, label: "Blender" },
  { icon: <FaCube />, label: "Substance Painter 3D" },
  { icon: <FaPaintBrush />, label: "ZBrush" },
];

/* --------------------------- componente principal --------------------------- */
export default function About() {
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
        craft compelling user experiences.
      </p>
    </div>
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto mt-12 flex max-w-5xl flex-col gap-12 px-4"
    >
      {/* --------------------------- card + foto --------------------------- */}
      <div className="flex flex-col items-center gap-10 md:flex-row">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="w-full rounded-lg p-6 md:flex-1 bg-gray-100 text-gray-900 dark:bg-gray-800/80 dark:text-gray-100"
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
          <span className="absolute top-4 left-4 h-full w-full -rotate-3 rounded-lg bg-blue-100 dark:bg-blue-900/30" />

          <motion.img
            src={profileImg}
            alt="Igor Garcia portrait"
            whileHover={{ scale: 1.08 }}
            transition={{ type: "spring", stiffness: 150, damping: 12 }}
            className="relative h-full w-full rounded-lg object-cover shadow-lg"
          />
        </motion.div>
      </div>

      {/* --------------------------- technical skills --------------------------- */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        Technical Skills
      </h2>

      <div className="space-y-12">
        <SkillSection title="Frontend" skills={frontend} />
        <SkillSection title="Backend" skills={backend} />
        <SkillSection title="Tools" skills={tools} />
      </div>
    </motion.section>
  );
}
