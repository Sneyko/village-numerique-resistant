// ============================================================
// COMPOSANT RACINE DU JEU
// Village Numérique Résistant - Nuit de l'Info 2025
// ============================================================

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

import {
  GameState,
  PlayerProfile,
  ZoneKey,
  ActionCard,
  QuizAnswer,
  EventChoice,
  PriorityAxis,
} from "../../game/types";
import {
  createInitialState,
  setProfile,
  startGame,
  setPriorityAxis,
  selectCard,
  deselectCard,
  validateYearCards,
  getAvailableCards,
  answerQuiz,
  answerEvent,
  nextYear,
  computeEnding,
} from "../../game/core/state";

// Sous-composants
import { ProfileSelection } from "./ProfileSelection";
import { Tutorial } from "./Tutorial";
import { DiagnosticPhase } from "./DiagnosticPhase";
import { ActionSelection } from "./ActionSelection";
import { QuizDialog } from "./QuizDialog";
import { EventDialog } from "./EventDialog";
import { YearSummary } from "./YearSummary";
import { EndScreen } from "./EndScreen";
import { IndicatorsPanel } from "./IndicatorsPanel";

interface GameRootProps {
  onClose: () => void;
}

export default function GameRoot({ onClose }: GameRootProps) {
  const [state, setState] = useState<GameState>(createInitialState);
  const [quizCard, setQuizCard] = useState<ActionCard | null>(null);

  // ============================================================
  // HANDLERS
  // ============================================================

  const handleSelectProfile = useCallback((profile: PlayerProfile) => {
    setState((s) => setProfile(s, profile));
  }, []);

  const handleStartGame = useCallback(() => {
    setState((s) => startGame(s));
  }, []);

  const handleSetPriority = useCallback((axis: PriorityAxis) => {
    setState((s) => setPriorityAxis(s, axis));
  }, []);

  const handleSelectCard = useCallback((card: ActionCard) => {
    // Si déjà sélectionné, désélectionner
    const isAlreadySelected = state.selectedCardsThisYear.some(c => c.id === card.id);
    
    if (isAlreadySelected) {
      // Retirer la carte
      setState(s => deselectCard(s, card.id));
    } else {
      // Ajouter la carte
      setState(s => selectCard(s, card.id));
    }
  }, [state.selectedCardsThisYear]);

  const handleQuizRequest = useCallback((card: ActionCard) => {
    if (card.quiz) {
      setQuizCard(card);
    }
  }, []);

  const handleQuizAnswer = useCallback((answer: QuizAnswer) => {
    if (quizCard) {
      setState((s) => answerQuiz(s, answer.id));
      setQuizCard(null);
    }
  }, [quizCard]);

  const handleQuizSkip = useCallback(() => {
    setQuizCard(null);
  }, []);

  const handleValidateYear = useCallback(() => {
    // Valider les cartes et passer à l'événement
    setState(s => validateYearCards(s));
  }, []);

  const handleEventChoice = useCallback((choice: EventChoice) => {
    setState((s) => answerEvent(s, choice.id));
  }, []);

  const handleNextYear = useCallback(() => {
    setState((s) => nextYear(s));
  }, []);

  const handleRestart = useCallback(() => {
    setState(createInitialState());
  }, []);

  // ============================================================
  // RENDU
  // ============================================================

  const ending = state.phase === "ended" ? computeEnding(state) : null;
  const availableCards = getAvailableCards(state);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-zinc-950 overflow-hidden"
    >
      {/* Header avec indicateurs */}
      {state.phase !== "profile" && state.phase !== "tutorial" && state.phase !== "ended" && (
        <div className="absolute top-0 left-0 right-0 z-10 bg-zinc-900/90 backdrop-blur-sm border-b border-zinc-800">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img 
                  src="/img/logo-team.png" 
                  alt="Village Numérique Résistant" 
                  className="h-8 w-auto"
                />
                <span className="text-emerald-400 font-bold">
                  Année {state.year}/4
                </span>
                {state.priorityAxis && (
                  <span className="px-2 py-1 text-xs rounded-full bg-violet-500/20 text-violet-400">
                    Priorité : {state.priorityAxis}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <IndicatorsPanel indicators={state.indicators} compact />
          </div>
        </div>
      )}

      {/* Bouton fermer pour les phases profile/tutorial/ended */}
      {(state.phase === "profile" || state.phase === "tutorial" || state.phase === "ended") && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* Contenu principal */}
      <div className={`h-full overflow-y-auto ${
        state.phase !== "profile" && state.phase !== "tutorial" && state.phase !== "ended"
          ? "pt-28 pb-16"
          : ""
      } p-6`}>
        <AnimatePresence mode="wait">
          {/* Phase : Sélection du profil */}
          {state.phase === "profile" && (
            <ProfileSelection
              key="profile"
              onSelect={handleSelectProfile}
            />
          )}

          {/* Phase : Tutoriel */}
          {state.phase === "tutorial" && (
            <Tutorial
              key="tutorial"
              profile={state.profile!}
              onStart={handleStartGame}
            />
          )}

          {/* Phase : Diagnostic / Choix de priorité */}
          {state.phase === "diagnostic" && (
            <DiagnosticPhase
              key="diagnostic"
              onSelect={handleSetPriority}
            />
          )}

          {/* Phase : Sélection d'actions */}
          {state.phase === "action_selection" && (
            <ActionSelection
              key="action"
              year={state.year}
              availableCards={availableCards}
              selectedCards={state.selectedCardsThisYear}
              maxCards={3}
              onSelect={handleSelectCard}
              onQuizRequest={handleQuizRequest}
              onValidate={handleValidateYear}
            />
          )}

          {/* Phase : Événement */}
          {state.phase === "event" && state.currentEvent && (
            <EventDialog
              key="event"
              event={state.currentEvent}
              onChoice={handleEventChoice}
            />
          )}

          {/* Phase : Bilan annuel */}
          {state.phase === "summary" && (
            <YearSummary
              key="summary"
              year={state.year}
              indicators={state.indicators}
              history={state.history}
              onContinue={handleNextYear}
              isLastYear={state.year >= 4}
            />
          )}

          {/* Phase : Fin de partie */}
          {state.phase === "ended" && ending && (
            <EndScreen
              key="end"
              state={state}
              ending={ending}
              onRestart={handleRestart}
            />
          )}
        </AnimatePresence>

        {/* Modal Quiz (superposé) */}
        <AnimatePresence>
          {quizCard && quizCard.quiz && (
            <QuizDialog
              key="quiz-modal"
              card={quizCard}
              onAnswer={handleQuizAnswer}
              onSkip={handleQuizSkip}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Footer avec logo NIRD */}
      {state.phase !== "profile" && state.phase !== "tutorial" && state.phase !== "ended" && (
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-zinc-900/80 backdrop-blur-sm border-t border-zinc-800">
          <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-center gap-3">
            <span className="text-xs text-zinc-500">Créé par l'équipe</span>
            <span className="text-xs font-semibold text-zinc-400">🐐 Beaucoup trop goatesque</span>
          </div>
        </div>
      )}
    </motion.div>
  );
}
