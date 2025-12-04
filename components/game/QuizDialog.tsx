// Dialogue de quiz pour les cartes d'action
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Brain, PartyPopper, Lightbulb, Check, X } from "lucide-react";
import { ActionCard, QuizAnswer } from "../../game/types";

interface QuizDialogProps {
  card: ActionCard;
  onAnswer: (answer: QuizAnswer) => void;
  onSkip: () => void;
}

export function QuizDialog({ card, onAnswer, onSkip }: QuizDialogProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<QuizAnswer | null>(null);
  const [showResult, setShowResult] = useState(false);

  if (!card.quiz) return null;

  const handleSelect = (answer: QuizAnswer) => {
    if (showResult) return;
    setSelectedAnswer(answer);
    setShowResult(true);
  };

  const handleContinue = () => {
    if (selectedAnswer) {
      onAnswer(selectedAnswer);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-2xl rounded-2xl bg-zinc-900 border border-zinc-700 overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 bg-purple-500/10">
          <div className="flex items-center gap-3">
            <Brain className="w-8 h-8 text-purple-400" />
            <div>
              <h3 className="text-xl font-bold text-white">Quiz Bonus</h3>
              <p className="text-sm text-zinc-400">
                {card.title}
              </p>
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="p-6">
          <p className="text-lg text-white mb-6">{card.quiz.question}</p>

          {/* Answers */}
          <div className="space-y-3">
            {card.quiz.answers.map((answer) => {
              const isSelected = selectedAnswer?.id === answer.id;
              const showCorrect = showResult && answer.isCorrect;
              const showIncorrect = showResult && isSelected && !answer.isCorrect;

              return (
                <motion.button
                  key={answer.id}
                  onClick={() => handleSelect(answer)}
                  disabled={showResult}
                  whileHover={!showResult ? { scale: 1.01 } : {}}
                  whileTap={!showResult ? { scale: 0.99 } : {}}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-300 border-2 ${
                    showCorrect
                      ? "border-emerald-500 bg-emerald-500/20"
                      : showIncorrect
                      ? "border-red-500 bg-red-500/20"
                      : isSelected
                      ? "border-purple-500 bg-purple-500/20"
                      : "border-zinc-700 bg-zinc-800/50 hover:border-zinc-500"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        showCorrect
                          ? "border-emerald-500 bg-emerald-500"
                          : showIncorrect
                          ? "border-red-500 bg-red-500"
                          : isSelected
                          ? "border-purple-500 bg-purple-500"
                          : "border-zinc-600"
                      }`}
                    >
                      {showCorrect && <Check className="w-3 h-3 text-white" />}
                      {showIncorrect && <X className="w-3 h-3 text-white" />}
                    </div>
                    <span className="text-white">{answer.label}</span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Result explanation */}
          <AnimatePresence>
            {showResult && selectedAnswer && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-6 p-4 rounded-xl ${
                  selectedAnswer.isCorrect
                    ? "bg-emerald-500/10 border border-emerald-500/30"
                    : "bg-red-500/10 border border-red-500/30"
                }`}
              >
                <div className="flex items-start gap-3">
                  {selectedAnswer.isCorrect ? (
                    <PartyPopper className="w-6 h-6 text-emerald-400 shrink-0" />
                  ) : (
                    <Lightbulb className="w-6 h-6 text-amber-400 shrink-0" />
                  )}
                  <div>
                    <p
                      className={`font-medium mb-1 ${
                        selectedAnswer.isCorrect ? "text-emerald-400" : "text-red-400"
                      }`}
                    >
                      {selectedAnswer.isCorrect
                        ? "Bonne réponse !"
                        : "Pas tout à fait..."}
                    </p>
                    <p className="text-sm text-zinc-300">
                      {selectedAnswer.explanation}
                    </p>
                    {selectedAnswer.effects && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {Object.entries(selectedAnswer.effects).map(([key, val]) => {
                          const value = val as number;
                          return (
                            <span
                              key={key}
                              className={`text-xs px-2 py-0.5 rounded ${
                                value > 0
                                  ? "bg-emerald-500/20 text-emerald-400"
                                  : "bg-red-500/20 text-red-400"
                              }`}
                            >
                              {value > 0 ? "+" : ""}{value} {key}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-zinc-800 flex justify-end gap-3">
          {!showResult && (
            <button
              onClick={onSkip}
              className="px-4 py-2 rounded-lg text-zinc-400 hover:text-white transition-colors"
            >
              Passer le quiz
            </button>
          )}
          {showResult && (
            <button
              onClick={handleContinue}
              className="px-6 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 
                         text-white font-medium transition-colors"
            >
              Continuer →
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
