import { NirdButton } from "./NirdButton";
import { AnimateEnter } from "../AnimateEnter";
import { GridBackground } from "../GridBackground";
import { Techs } from "./Techs";
import { AnimatedBadge } from "./AnimatedBadge";

export function HeroContent() {
  return (
    <div className="z-[3] flex flex-col items-center gap-16 sm:gap-28 text-center relative">
      <div>
        <div className="mb-5 sm:mb-8 space-y-4 sm:space-y-6">
          <AnimateEnter delay={0.05} duration={2} className="w-fit mx-auto">
            <img 
              src="/img/logo.png" 
              alt="Logo NIRD - Numérique Inclusif Responsable Durable" 
              className="h-12 sm:h-16 md:h-20 w-auto mx-auto drop-shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:drop-shadow-[0_0_25px_rgba(168,85,247,0.6)] transition-all duration-300"
            />
          </AnimateEnter>
          <AnimateEnter delay={0.15} duration={2} className="w-fit mx-auto">
            <AnimatedBadge />
          </AnimateEnter>
          <AnimateEnter delay={0.3} duration={2}>
            <h1 className="mx-auto max-w-4xl max-sm:leading-tight max-sm:max-w-sm font-black text-5xl sm:text-6xl md:text-7xl tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                DAVID vs GOLIATH
              </span>
              <br />
              <span className="text-white">2.0</span>
              <span className="ml-2 text-3xl sm:text-4xl">⚔️</span>
            </h1>
          </AnimateEnter>
        </div>

        <AnimateEnter delay={0.5} duration={2} className="mb-6 sm:mb-8">
          <p className="mx-auto max-w-2xl text-[17px] sm:text-xl text-gray-300 leading-relaxed">
            <span className="text-purple-400 font-semibold">L'Empire des Big Tech</span> veut jeter nos PC. 
            Nous, <span className="text-pink-400 font-semibold">irréductibles du lycée</span>, 
            on installe <span className="text-green-400">🐧 Linux</span> et on résiste.
            <br className="hidden sm:block" />
            <span className="font-bold text-white">Rejoins la démarche NIRD. ✊</span>
          </p>
        </AnimateEnter>

        <AnimateEnter
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          delay={0.7}
          duration={2}
        >
          <NirdButton 
            href="#comprendre" 
            variant="primary"
            className="h-12 sm:h-14 text-sm sm:text-base"
          >
            ⚔️ Rejoindre la Résistance
          </NirdButton>
          
          <NirdButton 
            href="#simulateur" 
            variant="outline"
            className="h-12 sm:h-14 text-sm sm:text-base"
          >
            🎮 Libérez votre école !
          </NirdButton>
        </AnimateEnter>
      </div>

      <AnimateEnter delay={0.9} duration={2} className="space-y-4">
        <p className="text-sm text-gray-500 uppercase tracking-widest">Nos armes libres 🛡️</p>
        <Techs />
      </AnimateEnter>

      <GridBackground />
    </div>
  );
}
