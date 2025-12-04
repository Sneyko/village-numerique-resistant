import { AnimateEnter } from "../AnimateEnter";
import { GridBackground } from "../GridBackground";
import { NirdButton } from "./NirdButton";

export function SloganSection() {
  return (
    <section className="h-full w-full">
      <div className="relative mt-32 flex flex-col items-center justify-center gap-10 pb-24 pt-20 md:mt-48 md:pb-44">
        <AnimateEnter className="flex flex-col items-center gap-6" delay={0.2}>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-center leading-tight tracking-tight">
            <span className="text-blue-400">Liberté.</span>{" "}
            <span className="text-white">Égalité.</span>{" "}
            <span className="text-green-400">Sobriété.</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 text-center max-w-2xl px-4">
            N'attendez pas la fin de Windows 10.{" "}
            <span className="text-white font-semibold">Prenez le contrôle maintenant.</span>
          </p>
        </AnimateEnter>
        <AnimateEnter
          className="flex flex-wrap items-center justify-center gap-4"
          delay={0.4}
        >
          <NirdButton
            href="https://nird.forge.apps.education.fr/"
            variant="primary"
            target="_blank"
            className="h-14 text-base"
          >
            🚀 Site Officiel NIRD
          </NirdButton>
          <NirdButton
            href="#comprendre"
            variant="glitch"
            className="h-14 text-base"
          >
            ⬆️ Remonter
          </NirdButton>
        </AnimateEnter>
        <GridBackground />
      </div>
    </section>
  );
}
