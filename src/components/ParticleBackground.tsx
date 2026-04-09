// src/components/ParticleBackground.tsx
import { useEffect, useMemo, useRef } from "react";
import Particles from "@tsparticles/react";
import { loadAll } from "@tsparticles/all";
import {
  tsParticles,
  type Engine,
  type ISourceOptions,
} from "@tsparticles/engine";
import { useTheme } from "@/hooks/useTheme";

export default function ParticleBackground() {
  /* 1. carrega plugins 1× */
  const loaded = useRef(false);
  useEffect(() => {
    if (!loaded.current) {
      loadAll(tsParticles as unknown as Engine).finally(() => {
        loaded.current = true;
      });
    }
  }, []);

  /* 2. tema via contexto */
  const { applied } = useTheme();
  const isDark = applied === "dark";

  /* 4. opções — SEM fullScreen  */
  const options = useMemo<ISourceOptions>(() => {
    const color = isDark ? "#ffffff" : "#0f172a";
    return {
      /* fullScreen desativado: o canvas ocupa só o contêiner */
      fullScreen: { enable: false },
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

  /* 5. canvas limitado ao container (100 % área da Home) */
  return (
    <div className="absolute inset-0 -z-10">
      <Particles id="tsparticles" options={options} key={isDark ? "d" : "l"} />
    </div>
  );
}
