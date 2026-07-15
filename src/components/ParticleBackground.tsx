// src/components/ParticleBackground.tsx
import type { ComponentProps } from "react";
import Particles from "@tsparticles/react";

const options: NonNullable<ComponentProps<typeof Particles>["options"]> = {
      /* fullScreen disabled: the canvas fills only the container */
      fullScreen: { enable: false },
      fpsLimit: 60,
      particles: {
        number: { value: 120, density: { enable: true, width: 900 } },
        color: { value: "#ffffff" },
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

export default function ParticleBackground() {
  /* 5. canvas limited to the container (100% of the Home area) */
  return (
    <div className="absolute inset-0 -z-10 h-full w-full invert dark:invert-0">
      <Particles
        id="tsparticles"
        options={options}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
