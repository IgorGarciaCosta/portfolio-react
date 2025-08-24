import { Link } from "react-router-dom";
import ParticleBackground from "@/components/ParticleBackground";

export default function Home() {
  return (
    /*
      section: centraliza o conteúdo;
      ParticleBackground fica full-screen atrás graças ao z-index -1.
    */
    <section className="relative grid min-h-[calc(100vh-6rem)] place-items-center">
      {/* Fundo animado de partículas */}
      <ParticleBackground />

      {/* Conteúdo principal */}
      <div className="relative z-10 flex max-w-xl flex-col items-center gap-6 rounded-3xl bg-black/60 px-8 py-12 text-center backdrop-blur-md">
        <h1 className="text-4xl font-extrabold text-white md:text-6xl">
          Hi, I’m <span className="text-blue-400">Igor Garcia</span>.
        </h1>

        <p className="text-lg text-gray-200">
          C++ engineer specialised in Games &amp; VR, now crafting
          high-performance web experiences.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/projects"
            className="inline-block rounded bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
          >
            See Projects
          </Link>

          <a
            href="/SoftwareEngineerCV.pdf"
            download
            className="inline-block rounded border-2 border-blue-400 px-6 py-3 font-medium text-blue-400 hover:bg-blue-500 hover:text-white"
          >
            Download CV
          </a>
        </div>
      </div>
    </section>
  );
}
