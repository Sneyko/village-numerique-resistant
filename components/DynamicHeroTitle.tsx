// DynamicHeroTitle.tsx - Animation narrative "David vs Goliath"
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ============================================================
// COMPOSANT PRINCIPAL
// ============================================================

export function DynamicHeroTitle() {
  const [phase, setPhase] = useState(0);
  // Phase 0: Terminal typing
  // Phase 1: Title reveal
  // Phase 2: Subtitle fade

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase(1), 2500); // Après le typing
    const timer2 = setTimeout(() => setPhase(2), 3500); // Après le title
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8">
      {/* Ligne 1 - Terminal */}
      <TerminalLine show={phase >= 0} />

      {/* Ligne 2 - David vs Goliath */}
      <AnimatePresence>
        {phase >= 1 && <MainTitle />}
      </AnimatePresence>

      {/* Ligne 3 - Sous-titre */}
      <AnimatePresence>
        {phase >= 2 && <Subtitle />}
      </AnimatePresence>
    </div>
  );
}

// ============================================================
// LIGNE 1 : TERMINAL TYPEWRITER
// ============================================================

function TerminalLine({ show }: { show: boolean }) {
  const text = "> sudo join_resistance";
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (!show) return;

    let index = 0;
    const typeInterval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typeInterval);
      }
    }, 80);

    // Curseur clignotant
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => {
      clearInterval(typeInterval);
      clearInterval(cursorInterval);
    };
  }, [show]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="font-mono text-sm sm:text-base md:text-lg text-emerald-400 
                 bg-zinc-900/80 px-4 py-2 rounded-lg border border-emerald-500/30
                 shadow-lg shadow-emerald-500/10"
    >
      <span>{displayedText}</span>
      <span
        className={`inline-block w-2 h-4 sm:h-5 ml-1 bg-emerald-400 align-middle transition-opacity duration-100 ${
          showCursor ? "opacity-100" : "opacity-0"
        }`}
      />
    </motion.div>
  );
}

// ============================================================
// LIGNE 2 : DAVID vs GOLIATH
// ============================================================

function MainTitle() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 200, 
        damping: 15,
        duration: 0.6 
      }}
      className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 md:gap-6"
    >
      {/* DAVID - Stable et brillant */}
      <motion.span
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black 
                   text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400
                   drop-shadow-[0_0_30px_rgba(16,185,129,0.5)]"
      >
        DAVID
      </motion.span>

      {/* vs */}
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-500"
      >
        vs
      </motion.span>

      {/* GOLIATH - Glitch effect */}
      <GlitchText text="GOLIATH" />
    </motion.div>
  );
}

// ============================================================
// EFFET GLITCH POUR GOLIATH
// ============================================================

function GlitchText({ text }: { text: string }) {
  const [glitchOffset, setGlitchOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      // Tremblement aléatoire subtil
      setGlitchOffset({
        x: (Math.random() - 0.5) * 4,
        y: (Math.random() - 0.5) * 2,
      });

      // Reset rapide
      setTimeout(() => setGlitchOffset({ x: 0, y: 0 }), 50);
    }, 100 + Math.random() * 200);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="relative"
      style={{
        transform: `translate(${glitchOffset.x}px, ${glitchOffset.y}px)`,
      }}
    >
      {/* Layer Rouge (décalé gauche) */}
      <span
        className="absolute inset-0 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-red-500 opacity-70"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)",
          transform: `translate(${-2 + glitchOffset.x * 0.5}px, 0)`,
        }}
        aria-hidden="true"
      >
        {text}
      </span>

      {/* Layer Bleu (décalé droite) */}
      <span
        className="absolute inset-0 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-blue-500 opacity-70"
        style={{
          clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)",
          transform: `translate(${2 + glitchOffset.x * 0.5}px, 0)`,
        }}
        aria-hidden="true"
      >
        {text}
      </span>

      {/* Layer Principal (blanc/gris) */}
      <span
        className="relative text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black 
                   text-transparent bg-clip-text bg-gradient-to-b from-zinc-300 to-zinc-500
                   drop-shadow-[0_0_20px_rgba(239,68,68,0.3)]"
      >
        {text}
      </span>

      {/* Scanlines effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
        }}
        aria-hidden="true"
      />

      {/* Glitch flash occasionnel */}
      <motion.div
        className="absolute inset-0 bg-white pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0, 0, 0, 0.1, 0, 0, 0, 0, 0, 0.05, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
        }}
        aria-hidden="true"
      />
    </motion.div>
  );
}

// ============================================================
// LIGNE 3 : SOUS-TITRE
// ============================================================

function Subtitle() {
  return (
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-base sm:text-lg md:text-xl lg:text-2xl text-zinc-400 
                 text-center max-w-2xl px-4 font-medium"
    >
      L'École ne se laissera pas{" "}
      <span className="relative inline-block">
        <span className="text-red-400 line-through opacity-60">obsolescere</span>
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="absolute -right-2 top-0 translate-x-full text-emerald-400 font-bold"
        >
          {" "}résister.
        </motion.span>
      </span>
    </motion.p>
  );
}

export default DynamicHeroTitle;
