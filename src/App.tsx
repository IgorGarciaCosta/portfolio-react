/* --------------------------- src/App.tsx --------------------------- */
import { lazy, Suspense, useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { ScrollProgress } from "@/components/ScrollProgress";

import Home from "@/pages/Home";

const About = lazy(() => import("@/pages/About"));
const Projects = lazy(() => import("@/pages/Projects"));
const Contact = lazy(() => import("@/pages/Contact"));
const Chatbot = lazy(() =>
  import("@/components/Chatbot").then((m) => ({ default: m.Chatbot })),
);

type SectionKey = "home" | "about" | "projects" | "contact";
export default function App() {
  const [current, setCurrent] = useState<SectionKey>("home");

  /* IntersectionObserver that tracks the current section ------------------ */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const best = entries.reduce((p, c) =>
          p.intersectionRatio > c.intersectionRatio ? p : c,
        );
        const key = best.target.getAttribute("data-section") as SectionKey;
        if (key) setCurrent(key);
      },
      { rootMargin: "-40% 0% -40% 0%", threshold: [0, 0.4, 0.6, 1] },
    );

    document
      .querySelectorAll<HTMLElement>("[data-section]")
      .forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  /* ----------------------------- layout --------------------------- */
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-white focus:shadow-lg"
      >
        Skip to main content
      </a>

      <ScrollProgress />
      <Header current={current} />

      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 pt-24 outline-none"
      >
        {/* ---------- Home (no dots) ---------- */}
        <section data-section="home" id="home">
          <Home />
        </section>

        {/* ---------- Other sections ---------- */}
        <div
          className="
            bg-dots                    /* dotted pattern */
            mask-fade-top              /* opacity gradient at the top */
            flex flex-col space-y-32 md:space-y-48
          "
        >
          <section data-section="about" id="about" className="pt-32 md:pt-48">
            <Suspense fallback={<div className="min-h-[50vh]" />}>
              <About />
            </Suspense>
          </section>

          <section data-section="projects" id="projects">
            <Suspense fallback={<div className="min-h-[50vh]" />}>
              <Projects />
            </Suspense>
          </section>

          <section data-section="contact" id="contact">
            <Suspense fallback={<div className="min-h-[50vh]" />}>
              <Contact />
            </Suspense>
          </section>
        </div>
      </main>

      <BackToTop />
      <Suspense fallback={null}>
        <Chatbot />
      </Suspense>
      <Footer />
    </div>
  );
}
