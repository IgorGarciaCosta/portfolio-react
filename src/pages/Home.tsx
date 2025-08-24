/* -------------- Home.tsx -------------- */
import { Link } from "react-router-dom";
import ParticleBackground from "@/components/ParticleBackground";
import TypewriterText from "@/components/TypewriterText";

export default function Home() {
  return (
    <section className="relative grid min-h-[calc(100vh-6rem)] place-items-center">
      <ParticleBackground />

      <div className="relative z-10 flex max-w-xl flex-col items-center gap-6 px-8 py-12 text-center">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white md:text-6xl">
          Hi, I’m <span className="text-blue-600 dark:text-blue-400">Igor</span>
          .
        </h1>

        {/* ----------- texto com animação de digitação ----------- */}
        <TypewriterText
          text="Software Engineer"
          speed={90} /* ajuste a gosto */
          className="text-2xl md:text-3xl text-blue-700 dark:text-blue-300"
        />

        <p className="text-lg text-slate-700 dark:text-slate-300">
          C++ engineer specialised in Games &amp; VR, now crafting
          high-performance web experiences.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/projects"
            className="
              inline-block rounded bg-blue-600 px-6 py-3 font-medium text-white
              hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400
              transition-colors
            "
          >
            See Projects
          </Link>

          <a
            href="/SoftwareEngineerCV.pdf"
            download
            className="
              inline-block rounded border-2 border-blue-600 px-6 py-3 font-medium
              text-blue-600 hover:bg-blue-600 hover:text-white
              dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-white
              transition-colors
            "
          >
            Download CV
          </a>
        </div>
      </div>
    </section>
  );
}
