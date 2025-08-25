/* --------------------------- src/App.tsx --------------------------- */
import { useEffect, useMemo, useState, createRef } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Projects from "@/pages/Projects";
import Contact from "@/pages/Contact";

/* ------------------------------------------------------------------ */
/* tipos                                                               */
/* ------------------------------------------------------------------ */
type SectionKey = "home" | "about" | "projects" | "contact";
type SectionRefs = { [K in SectionKey]: React.RefObject<HTMLElement | null> };

/* ------------------------------------------------------------------ */
/* componente principal                                                */
/* ------------------------------------------------------------------ */
export default function App() {
  /* refs estáveis para cada <section> */
  const refs: SectionRefs = useMemo(
    () => ({
      home: createRef<HTMLElement>(),
      about: createRef<HTMLElement>(),
      projects: createRef<HTMLElement>(),
      contact: createRef<HTMLElement>(),
    }),
    []
  );

  const [current, setCurrent] = useState<SectionKey>("home");

  /* detecta qual seção domina o viewport */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const best = entries.reduce((p, c) =>
          p.intersectionRatio > c.intersectionRatio ? p : c
        );
        const key = best.target.getAttribute("data-section") as SectionKey;
        if (key) setCurrent(key);
      },
      { rootMargin: "-40% 0% -40% 0%", threshold: [0, 0.4, 0.6, 1] }
    );

    Object.values(refs).forEach(
      (r) => r.current && observer.observe(r.current)
    );
    return () => observer.disconnect();
  }, [refs]); // refs é memoizado (estável)

  /* scroll suave até a seção */
  const scrollTo = (key: SectionKey) =>
    refs[key].current?.scrollIntoView({ behavior: "smooth" });

  /* --------------------------- layout --------------------------- */
  return (
    <div className="flex min-h-screen flex-col">
      <Header current={current} onNav={scrollTo} />

      <main className="flex-1 pt-24">
        {/* ---------- Home sem pontinhos ---------- */}
        <section ref={refs.home} data-section="home" id="home">
          <Home />
        </section>

        {/* ---------- Demais seções com fundo contínuo ---------- */}
        <div className="bg-dots flex flex-col space-y-32 md:space-y-48">
          <section ref={refs.about} data-section="about" id="about">
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

      <Footer />
    </div>
  );
}
