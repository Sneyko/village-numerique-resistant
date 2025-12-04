// Dialogue d'événement aléatoire
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { GameEvent, EventChoice, INDICATORS_CONFIG } from "../../game/types";
import { GameIcon, GameIconName } from "./GameIcon";

interface EventDialogProps {
  event: GameEvent;
  onChoice: (choice: EventChoice) => void;
}

export function EventDialog({ event, onChoice }: EventDialogProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="w-full max-w-2xl rounded-2xl bg-zinc-900 border border-amber-500/30 overflow-hidden"
      >
        {/* Header avec effet d'alerte */}
        <div className="relative p-6 border-b border-zinc-800 bg-gradient-to-r from-amber-500/20 to-orange-500/20">
          {/* Animated background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          <div className="relative flex items-center gap-3">
            <motion.span
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
            >
              <Zap className="w-10 h-10 text-amber-400" />
            </motion.span>
            <div>
              <p className="text-xs text-amber-400 font-medium uppercase tracking-wider mb-1">
                Événement inattendu !
              </p>
              <h3 className="text-xl font-bold text-white">{event.title}</h3>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="p-6">
          <p className="text-zinc-300 leading-relaxed mb-6">
            {event.description}
          </p>

          <p className="text-sm text-zinc-500 mb-4">
            Comment réagissez-vous ?
          </p>

          {/* Choices */}
          <div className="space-y-3">
            {event.choices.map((choice, index) => (
              <motion.button
                key={choice.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => onChoice(choice)}
                whileHover={{ scale: 1.01, x: 4 }}
                whileTap={{ scale: 0.99 }}
                className="w-full p-4 rounded-xl text-left transition-all duration-300 
                           border-2 border-zinc-700 bg-zinc-800/50 
                           hover:border-amber-500/50 hover:bg-zinc-800 group"
              >
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-sm opacity-50 group-hover:opacity-100 transition-opacity shrink-0">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <div className="flex-1">
                    <p className="text-white font-medium mb-2">{choice.label}</p>
                    
                    {/* Effects preview */}
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(choice.effects).map(([key, val]) => {
                        const value = val as number;
                        if (value === 0) return null;
                        const config = INDICATORS_CONFIG.find((i) => i.key === key);
                        if (!config) return null;
                        const isPositive = config.isNegative ? value < 0 : value > 0;

                        return (
                          <span
                            key={key}
                            className={`text-xs px-2 py-0.5 rounded flex items-center gap-1 ${
                              isPositive
                                ? "bg-emerald-500/20 text-emerald-400"
                                : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            <GameIcon name={config.icon as GameIconName} size={12} /> {value > 0 ? "+" : ""}{value}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  
                  <span className="text-zinc-600 group-hover:text-amber-400 transition-colors">
                    →
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
