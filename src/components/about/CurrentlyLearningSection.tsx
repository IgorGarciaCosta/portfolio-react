import { motion } from "framer-motion";
import { currentlyLearning } from "./skillsData";
import {
  learningContainerVariants,
  learningCardVariants,
} from "./animationVariants";

export default function CurrentlyLearningSection() {
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
        variants={learningContainerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ amount: 0.25 }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {currentlyLearning.map((item) => (
          <motion.div
            key={item.label}
            variants={learningCardVariants}
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
