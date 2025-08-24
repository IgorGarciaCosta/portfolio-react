// src/components/ParticleBackground.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import Particles from "@tsparticles/react";
import { loadAll } from "@tsparticles/all";
import {
  tsParticles,
  type Engine,
  type ISourceOptions,
} from "@tsparticles/engine";

export default function ParticleBackground() {
  /* 1. carrega o preset uma única vez */
  const presetLoaded = useRef(false);
  useEffect(() => {
    if (!presetLoaded.current) {
      loadAll(tsParticles as unknown as Engine).finally(() => {
        presetLoaded.current = true;
      });
    }
  }, []);

  /* 2. detecta tema (dark class em <html>) */
  const [isDark, setIsDark] = useState<boolean>(
    () =>
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() =>
      setIsDark(document.documentElement.classList.contains("dark"))
    );
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  /* 3. opções do tsParticles (re-cria quando a cor muda) */
  const options = useMemo<ISourceOptions>(() => {
    const darkColor = "#ffffff"; // partículas claras p/ fundo escuro
    const lightColor = "#0f172a"; // partículas escuras p/ fundo claro

    return {
      fullScreen: { enable: true, zIndex: -1 },
      fpsLimit: 60,
      particles: {
        number: { value: 120, density: { enable: true, width: 900 } },
        color: { value: isDark ? darkColor : lightColor },
        opacity: { value: { min: 0.4, max: 0.8 } },
        size: { value: { min: 1, max: 4 } },
        shape: { type: "circle" },
        move: {
          enable: true,
          speed: 0.6,
          direction: "none",
          outModes: { default: "bounce" },
        },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: "repulse" },
          onClick: { enable: true, mode: "push" },
          resize: { enable: true },
        },
        modes: {
          repulse: { distance: 120, duration: 0.4 },
          push: { quantity: 4 },
        },
      },
      detectRetina: true,
    } satisfies ISourceOptions;
  }, [isDark]);

  /* 4. key={isDark} força recriação do canvas quando o tema muda */
  return (
    <Particles
      id="tsparticles"
      options={options}
      key={isDark ? "dark" : "light"}
    />
  );
}
