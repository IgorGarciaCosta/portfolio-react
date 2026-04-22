/* --------------------------- src/App.tsx --------------------------- */
import { useEffect, useRef, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { Chatbot } from "@/components/Chatbot";
import { ScrollProgress } from "@/components/ScrollProgress";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Projects from "@/pages/Projects";
import Contact from "@/pages/Contact";

type SectionKey = "home" | "about" | "projects" | "contact";
type SectionRefs = { [K in SectionKey]: React.RefObject<HTMLElement | null> };

export default function App() {
  const homeRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const refs: SectionRefs = {
    home: homeRef,
    about: aboutRef,
    projects: projectsRef,
    contact: contactRef,
  };

  const [current, setCurrent] = useState<SectionKey>("home");

  /* IntersectionObserver que marca a seção atual ------------------ */
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

    Object.values(refs).forEach(
      (r) => r.current && observer.observe(r.current),
    );
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollTo = (key: SectionKey) =>
    refs[key].current?.scrollIntoView({ behavior: "smooth" });

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
      <Header current={current} onNav={scrollTo} />

      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 pt-24 outline-none"
      >
        {/* ---------- Home (sem pontinhos) ---------- */}
        <section ref={refs.home} data-section="home" id="home">
          <Home />
        </section>

        {/* ---------- Demais seções ---------- */}
        <div
          className="
            bg-dots                    /* padrão pontilhado */
            mask-fade-top              /* gradiente de opacidade no topo */
            flex flex-col space-y-32 md:space-y-48
          "
        >
          <section
            ref={refs.about}
            data-section="about"
            id="about"
            className="pt-32 md:pt-48"
          >
            <About />
          </section>

          <section ref={refs.projects} data-section="projects" id="projects">
            <Projects />
          </section>

          <section ref={refs.contact} data-section="contact" id="contact">
            <Contact />
          </section>
        </div>
      </main>

      <BackToTop />
      <Chatbot />
      <Footer />
    </div>
  );
}
