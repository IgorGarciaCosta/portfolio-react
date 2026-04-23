import { motion } from "framer-motion";
import type { Skill } from "./skillsData";
import { skillContainerVariants, skillItemVariants } from "./animationVariants";

interface SkillSectionProps {
  title: string;
  skills: Skill[];
}

export default function SkillSection({ title, skills }: SkillSectionProps) {
  return (
    <div className="md:grid md:grid-cols-[150px_1fr] md:items-start md:gap-10 space-y-4 md:space-y-0">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        {title}
      </h3>

      <motion.ul
        variants={skillContainerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ amount: 0.25 }}
        className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 md:grid-cols-4"
      >
        {skills.map((s) => (
          <motion.li
            key={s.label}
            variants={skillItemVariants}
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
