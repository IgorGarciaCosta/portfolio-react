/* ---------------------- About.tsx (split-slide + skills) ---------------------- */
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import profileImg from "@/assets/profile.jpg";
import ExperienceTimeline from "@/components/ExperienceTimeline";

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
  SiSharp,
  SiPython,
  SiNodedotjs,
  SiDotnet,
  SiPostgresql,
  SiSqlite,
  SiFirebase,
  SiDocker,
  SiGit,
  /* tools */
  SiUnrealengine,
  SiUnity,
  SiGithub,
  SiGithubactions,
  SiFigma,
  SiJirasoftware,
  SiNpm,
  SiVite,
  /* currently learning */
  SiAmazonwebservices,
  SiOracle,
} from "react-icons/si";

import {
  FaDatabase, // SQL generic
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

/* ----------------------------- currently learning --------------------------- */
type LearningItem = { icon: React.ReactNode; label: string; desc: string };

const currentlyLearning: LearningItem[] = [
  {
    icon: <SiAmazonwebservices />,
    label: "AWS",
    desc: "Lambda, API Gateway, DynamoDB, SQS & CloudWatch",
  },
  {
    icon: <SiOracle />,
    label: "Oracle Cloud",
    desc: "OCI infrastructure & cloud deployments",
  },
];

function CurrentlyLearningSection() {
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  };
  const card: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 80, damping: 14 },
    },
  };

  return (
    <div className="space-y-6">
      {/* título com dot pulsante */}
      <div className="flex items-center gap-3">
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
        </span>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Currently Learning
        </h2>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ amount: 0.25 }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {currentlyLearning.map((item) => (
          <motion.div
            key={item.label}
            variants={card}
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-xl border border-transparent
                       bg-gradient-to-br from-blue-50 to-purple-50
                       p-5 shadow-sm transition-shadow hover:shadow-md
                       dark:from-gray-800 dark:to-gray-700/60 dark:hover:shadow-lg"
          >
            {/* gradient accent bar */}
            <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

            <div className="flex items-center gap-3">
              <span className="text-3xl text-blue-600 dark:text-blue-400 transition-transform group-hover:scale-110">
                {item.icon}
              </span>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  {item.label}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.desc}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
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
  { icon: <SiSharp />, label: "C#" },
  { icon: <SiCplusplus />, label: "C++" },
  { icon: <SiPython />, label: "Python" },
  { icon: <SiDotnet />, label: "ASP.NET Core" },
  { icon: <SiNodedotjs />, label: "Node.js" },
  { icon: <FaDatabase />, label: "SQL" },
  { icon: <SiPostgresql />, label: "PostgreSQL" },
  { icon: <SiSqlite />, label: "SQLite" },
  { icon: <SiFirebase />, label: "Firebase" },
  { icon: <SiDocker />, label: "Docker" },
];

const tools: Skill[] = [
  { icon: <SiGit />, label: "Git" },
  { icon: <SiGithub />, label: "GitHub" },
  { icon: <SiGithubactions />, label: "GitHub Actions" },
  { icon: <SiVite />, label: "Vite" },
  { icon: <SiNpm />, label: "NPM" },
  { icon: <SiFigma />, label: "Figma" },
  { icon: <SiJirasoftware />, label: "Jira" },
  { icon: <SiUnrealengine />, label: "Unreal Engine" },
  { icon: <SiUnity />, label: "Unity" },
];

/* --------------------------- componente principal --------------------------- */
export default function About() {
  const summary = (
    <div className="space-y-4 text-justify leading-7">
      <p>
        I’m <strong>Igor Garcia</strong>, a Computer Engineer with 4 + years
        crafting real-time experiences in <strong>C++ / Unreal Engine</strong>.
        My work also spans web engineering, with a strong focus on backend
        development using <strong>C#</strong>, <strong>ASP.NET</strong>, and
        <strong> Python</strong>, plus frontend delivery with
        <strong> JavaScript</strong>, <strong>React</strong>, and
        <strong> Tailwind CSS</strong> where needed.
      </p>

      <p>
        I've shipped real-time products across industries — from virtual
        prototyping at <strong>Ford</strong> to multiplayer gameplay at{" "}
        <strong>Blue Gravity Studios</strong> and interactive AI installations
        at <strong>Cafundó Creative Studios</strong>. More recently, I've also
        been expanding into backend engineering with
        <strong> C# / ASP.NET</strong>, designing APIs and production-minded
        services.
      </p>

      <p>
        I use AI assistants as a productivity aid, mainly{" "}
        <strong>Claude Opus 4.6</strong> and <strong>Codex</strong>, so I can
        stay focused on architecture and problem solving.
      </p>

      <p>
        Beyond coding, I explore <strong>3D modelling</strong> with Blender,
        ZBrush, Maya and CATIA, mixing art and engineering to create engaging
        experiences.
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

        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="w-full rounded-lg p-6 md:flex-1 bg-gray-100 text-gray-900 dark:bg-gray-800/80 dark:text-gray-100"
        >
          {summary}
        </motion.div>
      </div>

      {/* ----------------------------- experience ----------------------------- */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        Experience
      </h2>
      <ExperienceTimeline />

      {/* --------------------------- technical skills --------------------------- */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        Technical Skills
      </h2>

      <div className="space-y-12">
        <SkillSection title="Frontend" skills={frontend} />
        <SkillSection title="Backend" skills={backend} />
        <SkillSection title="Tools" skills={tools} />
      </div>

      {/* ----------------------- currently learning ----------------------- */}
      <CurrentlyLearningSection />
    </motion.section>
  );
}
