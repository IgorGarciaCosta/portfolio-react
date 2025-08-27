/* -------------- Home.tsx (hover “wipe” no botão de CV) -------------- */
//import { Link } from "react-router-dom";
import ParticleBackground from "@/components/ParticleBackground";
import TypewriterText from "@/components/TypewriterText";

export default function Home() {
  return (
    <section className="relative grid min-h-[calc(100vh-6rem)] place-items-center">
      <ParticleBackground />

      <div className="relative z-10 flex max-w-xl flex-col items-center gap-6 px-8 py-12 text-center">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white md:text-6xl">
          Hi, I’m <span className="text-blue-600 dark:text-blue-400">Igor</span>
        </h1>

        <TypewriterText
          text="Software Engineer"
          speed={90}
          className="text-2xl text-blue-700 dark:text-blue-300 md:text-3xl"
        />

        <p className="text-lg text-slate-700 dark:text-slate-300">
          C++ engineer specialised in Games &amp; VR, now crafting
          high-performance web experiences.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {/* ---------------- botão Projects (inalterado) ---------------- */}
          <a
            href="#projects"
            className="inline-block rounded bg-blue-600 px-6 py-3 font-medium text-white
             transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
          >
            See Projects
          </a>

          {/* ---------------- botão Download CV com animação “wipe” ---------------- */}
          <a
            href="/IgorGarciaCV.pdf"
            download
            /* group = possibilita usar group-hover nos pseudo-elementos */
            className="
              group relative inline-block overflow-hidden rounded border-2
              border-blue-600 px-6 py-3 font-medium text-blue-600
              transition-colors dark:border-blue-400 dark:text-blue-400
            "
          >
            {/* pseudo-elemento 'before' faz o preenchimento da esquerda p/ a direita */}
            <span
              className="
                pointer-events-none absolute inset-0 -z-10
                origin-left scale-x-0
                bg-blue-600 transition-transform duration-300 ease-out
                group-hover:scale-x-100
                dark:bg-blue-400
              "
            />
            <span className="relative z-10 group-hover:text-white">
              Download CV
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
