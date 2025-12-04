// Tutoriel du jeu
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Castle, Target, Gamepad2, BarChart3 } from "lucide-react";
import { PlayerProfile } from "../../game/types";
import { TUTORIAL_SLIDES, PROFILE_TEXTS } from "../../game/data/texts";

// Mapping des icônes du tutoriel
const ICON_MAP: Record<string, React.ReactNode> = {
  castle: <Castle className="w-16 h-16 text-emerald-400" />,
  target: <Target className="w-16 h-16 text-yellow-400" />,
  gamepad: <Gamepad2 className="w-16 h-16 text-purple-400" />,
  chart: <BarChart3 className="w-16 h-16 text-cyan-400" />,
};

// Fonction pour parser le markdown simple (gras uniquement)
function parseMarkdown(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

interface TutorialProps {
  profile: PlayerProfile;
  onStart: () => void;
}

export function Tutorial({ profile, onStart }: TutorialProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const profileTexts = PROFILE_TEXTS[profile];

  const handleNext = () => {
    if (currentSlide < TUTORIAL_SLIDES.length - 1) {
      setCurrentSlide((s) => s + 1);
    } else {
      onStart();
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide((s) => s - 1);
    }
  };

  const slide = TUTORIAL_SLIDES[currentSlide];
  const isLast = currentSlide === TUTORIAL_SLIDES.length - 1;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-6"
    >
      <div className="max-w-2xl w-full">
        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-8">
          {TUTORIAL_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentSlide
                  ? "bg-emerald-500 w-6"
                  : "bg-zinc-700 hover:bg-zinc-600"
              }`}
            />
          ))}
        </div>

        {/* Slide content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">{ICON_MAP[slide.icon] || slide.icon}</div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              {slide.title}
            </h2>
            <div className="text-zinc-300 leading-relaxed whitespace-pre-line text-left bg-zinc-900/50 rounded-xl p-6 border border-zinc-800">
              {parseMarkdown(
                slide.content
                  .replace("{establishment}", profileTexts.establishment)
                  .replace("{youAre}", profileTexts.youAre)
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handlePrev}
            disabled={currentSlide === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-zinc-400 
                       hover:text-white hover:bg-zinc-800 transition-colors
                       disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
            Précédent
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium
                       bg-gradient-to-r from-emerald-600 to-cyan-600 text-white
                       hover:from-emerald-500 hover:to-cyan-500 transition-all
                       shadow-lg shadow-emerald-500/20"
          >
            {isLast ? "Commencer !" : "Suivant"}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
