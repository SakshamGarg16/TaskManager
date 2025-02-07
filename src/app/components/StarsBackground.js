"use client";

import dynamic from "next/dynamic";
import { useCallback } from "react";

// Dynamically import tsparticles to prevent SSR issues
const Particles = dynamic(() => import("react-tsparticles"), { ssr: false });
import { loadSlim } from "tsparticles-slim";

export default function LineCursorBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: true, zIndex: -1 },
        particles: {
          number: { value: 50, density: { enable: true, value_area: 800 } },
          color: { value: "#00ffff" }, // Light cyan for lines
          shape: { type: "circle" },
          opacity: { value: 0.6 },
          size: { value: 4 },
          links: {
            enable: true,
            distance: 150,
            color: "#00ffff",
            opacity: 0.6,
            width: 1.5,
          },
          move: {
            enable: true,
            speed: 2,
            direction: "none",
            outModes: { default: "out" },
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "repulse" }, // Repulse particles when hovering
            onClick: { enable: true, mode: "push" }, // Add particles on click
          },
          modes: {
            repulse: { distance: 100, duration: 0.4 },
            push: { quantity: 4 },
          },
        },
        detectRetina: true,
      }}
    />
  );
}
