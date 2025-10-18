import { ReactTyped } from "react-typed";
import { Wifi, Cloud, ShieldCheck, Cpu } from "lucide-react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import { useEffect, useState } from "react";
import Form from "./Form";

export default function Hero() {
  const [init, setInit] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => setInit(true));
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-center overflow-hidden bg-[var(--background)]">
      {init && (
        <Particles
          id="tsparticles"
          options={{
            background: { color: "transparent" },
            fpsLimit: 60,
            interactivity: {
              events: {
                onHover: { enable: true, mode: "repulse" },
                resize: true,
              },
            },
            particles: {
              number: { value: 50, density: { enable: true, area: 800 } },
              color: { value: "#044F88" },
              links: {
                enable: true,
                distance: 150,
                color: "#3B82B4",
                opacity: 0.25,
                width: 1,
              },
              move: { enable: true, speed: 1, outModes: "bounce" },
              opacity: { value: 0.5 },
              size: { value: { min: 1, max: 3 } },
            },
          }}
          className="absolute top-0 left-0 w-full h-full"
        />
      )}

      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ pointerEvents: "none" }}
      >
        <div
          className="rounded-full"
          style={{
            width: "950px",
            height: "800px",
            background:
              "radial-gradient(circle, rgba(4,79,136,0.35) 0%, rgba(4,79,136,0.15) 40%, rgba(4,79,136,0.05) 70%, transparent 100%)",
            filter: "blur(50px)",
          }}
        />
      </div>

      <div className="max-w-[850px] mx-auto w-full flex flex-col justify-center items-center px-4 sm:px-6 relative z-10">
        <p className="text-[var(--primary)] font-bold text-base sm:text-lg">
          EMI TEL — Club Réseaux & Télécoms
        </p>

        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mt-4 leading-snug">
          Build the future with{" "}
          <ReactTyped
            className="text-[var(--primary)]"
            strings={[
              "IoT & Cybersecurity",
              "Network Innovations",
              "Telecom Solutions",
              "Digital Connectivity",
            ]}
            typeSpeed={50}
            backSpeed={40}
            loop
          />
        </h1>

        <p className="mt-6 text-gray-700 text-sm sm:text-base lg:text-lg max-w-2xl">
          Rejoignez-nous pour apprendre, créer et innover dans un univers technologique.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-3 border border-[var(--primary)] text-white rounded-lg transition ease-in-out duration-300 transform bg-[var(--primary-light)] hover:text-[var(--primary-dark)] hover:scale-110 text-sm sm:text-base"
          >
            Nous rejoindre
          </button>
          <a
            href="#projects"
            className="px-6 py-3 border border-[var(--primary)] text-[var(--primary)] rounded-lg transition hover:bg-[var(--primary-light)] hover:text-white text-sm sm:text-base"
          >
            Découvrir nos projets
          </a>
        </div>
      </div>

      <Wifi className="absolute top-16 sm:top-20 left-6 sm:left-10 text-[var(--primary)] opacity-70 animate-float-slow w-8 h-8 sm:w-10 sm:h-10" />
      <Cloud className="absolute bottom-24 sm:bottom-32 right-10 sm:right-16 text-[var(--primary)] opacity-70 animate-float w-10 h-10 sm:w-12 sm:h-12" />
      <ShieldCheck className="absolute top-32 sm:top-40 right-12 sm:right-24 text-[var(--primary)] opacity-70 animate-float w-8 h-8 sm:w-10 sm:h-10" />
      <Cpu className="absolute bottom-16 sm:bottom-20 left-10 sm:left-24 text-[var(--primary)] opacity-70 animate-float-slow w-10 h-10 sm:w-12 sm:h-12" />

      {showForm && <Form onClose={() => setShowForm(false)} />}
    </div>
  );
}
