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

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-zinc-950/80 py-8 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-zinc-400">
            <span className="text-2xl">🐐</span>
            <span className="font-semibold text-white">Beaucoup trop goatesque</span>
            <span className="text-zinc-600">•</span>
            <span>Toulouse</span>
          </div>
          <p className="text-sm text-zinc-500">
            Nuit de l'Info 2025 — 4 & 5 Décembre
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-zinc-600">
            <span>🔓</span>
            <span>Projet sous licence libre</span>
            <a 
              href="https://github.com/Sneyko/village-numerique-resistant" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-emerald-500 hover:text-emerald-400 transition-colors"
            >
              GitHub
            </a>
          </div>
          <div className="mt-6 pt-4 border-t border-zinc-800">
            <a 
              href="https://nird.forge.apps.education.fr/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block opacity-60 hover:opacity-100 transition-opacity"
            >
              <img 
                src="/img/logo.png" 
                alt="NIRD - Numérique Inclusif Responsable Durable" 
                className="h-10 w-auto mx-auto"
              />
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
}
