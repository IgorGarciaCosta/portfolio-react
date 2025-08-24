// src/components/ParticleBackground.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import Particles from "@tsparticles/react";
import { loadAll } from "@tsparticles/all";
import {
  tsParticles,
  type Engine,
  type ISourceOptions,
} from "@tsparticles/engine";

/* ---------- detecção inicial robusta ---------- */
function getInitialIsDark(): boolean {
  if (typeof document === "undefined") return false;

  const root = document.documentElement;

  /* 1. se a classe já está lá, é o critério mais confiável */
  if (root.classList.contains("dark")) return true;
  if (root.classList.contains("light")) return false;

  /* 2. senão, vê o valor salvo no localStorage (mesma chave do hook) */
  const stored = localStorage.getItem("theme"); // 'dark' | 'light' | 'system' | null
  if (stored === "dark") return true;
  if (stored === "light") return false;

  /* 3. fallback: preferência do SO */
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export default function ParticleBackground() {
  /* 1. carrega o pacote de plugins 1x */
  const loaded = useRef(false);
  useEffect(() => {
    if (!loaded.current) {
      loadAll(tsParticles as unknown as Engine).finally(() => {
        loaded.current = true;
      });
    }
  }, []);

  /* 2. estado do tema, com detecção inicial aprimorada */
  const [isDark, setIsDark] = useState(getInitialIsDark);

  /* 3. observa mudanças na classe <html> (ThemeToggle altera lá) */
  useEffect(() => {
    const root = document.documentElement;
    const update = () => setIsDark(root.classList.contains("dark"));

    /* chamada imediata em caso de “flash” após o load */
    update();

    const obs = new MutationObserver(update);
    obs.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => obs.disconnect();
  }, []);

  /* 4. opções do tsParticles – recompõe sempre que isDark muda */
  const options = useMemo<ISourceOptions>(() => {
    const color = isDark ? "#ffffff" : "#0f172a"; // claras ou escuras
    return {
      fullScreen: { enable: true, zIndex: -1 },
      fpsLimit: 60,
      particles: {
        number: { value: 120, density: { enable: true, width: 900 } },
        color: { value: color },
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
    };
  }, [isDark]);

  /* 5. key diferente força recriar o canvas quando o tema muda */
  return (
    <Particles
      id="tsparticles"
      options={options}
      key={isDark ? "dark" : "light"}
    />
  );
}
