import heroBg from "@/assets/bg-hero.jpg";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="relative grid min-h-[calc(100vh-6rem)] place-items-center">
      {/* 1) BACKGROUND EM FULLSCREEN (com fade vertical) */}
      <div
        className="pointer-events-none fixed inset-0 -z-30 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroBg})`,
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)",
        }}
      />

      {/* 2) PAINEL PRETO TRANSLÚCIDO
            • ocupa 100 vw (w-screen) e 45 vh de altura
            • acompanha o scroll (absolute, não fixed)
            • encosta nas laterais
            • fade só em cima e embaixo */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-20 h-[45vh] w-screen -translate-x-1/2 -translate-y-1/2 bg-black/50"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
        }}
      />

      {/* 3) CONTEÚDO CENTRAL */}
      <div className="relative z-10 flex max-w-xl flex-col items-center gap-6 rounded-3xl px-8 py-12 text-center">
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
