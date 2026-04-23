import { motion } from "framer-motion";
import profileImg from "@/assets/profile.jpg";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import SkillSection from "@/components/about/SkillSection";
import CurrentlyLearningSection from "@/components/about/CurrentlyLearningSection";
import {
  cardVariants,
  photoVariants,
} from "@/components/about/animationVariants";
import { frontend, backend, tools } from "@/components/about/skillsData";

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
