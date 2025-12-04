import { NirdButton } from "./NirdButton";
import { AnimateEnter } from "../AnimateEnter";
import { GridBackground } from "../GridBackground";
import { Techs } from "./Techs";
import { AnimatedBadge } from "./AnimatedBadge";
import { DynamicHeroTitle } from "./DynamicHeroTitle";

export function HeroContent() {
  return (
    <div className="z-[3] flex flex-col items-center gap-16 sm:gap-28 text-center relative">
      <div>
        <div className="mb-5 sm:mb-8 space-y-4 sm:space-y-6">
          <AnimateEnter delay={0.05} duration={2} className="w-fit mx-auto">
            <img 
              src="/img/logo-team.png" 
              alt="Village Numérique Résistant" 
              className="h-20 sm:h-24 md:h-28 w-auto mx-auto drop-shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:drop-shadow-[0_0_25px_rgba(168,85,247,0.6)] transition-all duration-300"
            />
          </AnimateEnter>
          <AnimateEnter delay={0.15} duration={2} className="w-fit mx-auto">
            <AnimatedBadge />
          </AnimateEnter>
          
          {/* Nouveau titre animé dynamique */}
          <DynamicHeroTitle />
        </div>

        <AnimateEnter delay={3.8} duration={1.5} className="mb-6 sm:mb-8">
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
