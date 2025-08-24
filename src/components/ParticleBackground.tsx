// src/components/ParticleBackground.tsx
import { useEffect, useMemo, useRef } from "react";
import Particles from "@tsparticles/react";
import { loadAll } from "@tsparticles/all";
import {
  tsParticles,
  type Engine,
  type ISourceOptions,
} from "@tsparticles/engine";

export default function ParticleBackground() {
  /* flag local para evitar múltiplos carregamentos em dev-reload */
  const loadedRef = useRef(false);

  useEffect(() => {
    if (!loadedRef.current) {
      loadAll(tsParticles as unknown as Engine).finally(() => {
        loadedRef.current = true;
      });
    }
  }, []);

  const options = useMemo<ISourceOptions>(
    () => ({
      fullScreen: { enable: true, zIndex: -1 },
      fpsLimit: 60,
      particles: {
        number: {
          value: 120,
          density: { enable: true, width: 900 },
        },
        opacity: { value: { min: 0.4, max: 0.8 } },
        size: { value: { min: 1, max: 4 } },
        color: { value: "#ffffff" },
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
    }),
    []
  );

  return <Particles id="tsparticles" options={options} />;
}
