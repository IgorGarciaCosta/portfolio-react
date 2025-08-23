import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="flex flex-col items-center gap-4 text-center">
      <h1 className="text-4xl font-extrabold md:text-6xl">
        Hi, I’m <span className="text-blue-500">Igor Garcia</span>.
      </h1>

      <p className="max-w-xl text-lg text-gray-600 dark:text-gray-300">
        C++ engineer specialised in Games &amp; VR, now crafting
        high-performance web experiences.
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-4">
        {/* Navigate to the Projects page */}
        <Link
          to="/projects"
          className="inline-block rounded bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
        >
          See Projects
        </Link>

        {/* Direct CV download (file placed in /public) */}
        <a
          href="/SoftwareEngineerCV.pdf"
          download
          className="inline-block rounded border-2 border-blue-600 px-6 py-3 font-medium text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-500 dark:text-blue-400 dark:hover:bg-blue-500 dark:hover:text-white"
        >
          Download CV
        </a>
      </div>
    </section>
  );
}
