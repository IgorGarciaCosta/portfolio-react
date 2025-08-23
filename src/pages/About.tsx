import { motion } from "framer-motion";
import profileImg from "@/assets/profile.jpg";

export default function About() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-3xl space-y-6"
    >
      <h1 className="text-3xl font-extrabold">About me</h1>

      {/* Profile picture */}
      <img
        src={profileImg}
        alt="Igor Garcia profile portrait"
        className="mx-auto h-40 w-40 rounded-full object-cover shadow-lg dark:shadow-gray-800"
      />

      {/* ─────────────────────────── */}
      {/* Professional summary */}
      {/* ─────────────────────────── */}
      <p className="leading-7 text-gray-600 dark:text-gray-300">
        I’m <strong>Igor Garcia</strong>, a Computer Engineer with 4+ years of
        professional experience building interactive software and VR solutions.
        My core stack is <strong>C++ / Unreal Engine</strong>, where I architect
        systems, implement game mechanics and optimise performance for real-time
        applications.
      </p>

      <p className="leading-7 text-gray-600 dark:text-gray-300">
        At <strong>Ford Motor Company</strong> I develop virtual prototypes that
        reduce physical mock-up costs, speed up design decisions and provide
        realistic visualisation of upcoming vehicles. I’ve also delivered
        multiplayer gameplay and responsive UI for
        <em className="italic"> SkateNation XL</em> during my tenure at
        <strong> Blue Gravity Studios</strong>.
      </p>

      <p className="leading-7 text-gray-600 dark:text-gray-300">
        Beyond coding I enjoy <strong>3D modelling</strong> with Blender,
        ZBrush, Maya and CATIA, consistently blending art and engineering to
        craft compelling user experiences. I thrive in multidisciplinary teams,
        embrace Agile practices and keep my toolbox sharp with continuous
        learning.
      </p>

      {/* ─────────────────────────── */}
      {/* Quick skills cloud */}
      {/* ─────────────────────────── */}
      <div className="flex flex-wrap gap-3 pt-2">
        {[
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
        ].map((skill) => (
          <span
            key={skill}
            className="rounded bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900/40 dark:text-blue-300"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.section>
  );
}
