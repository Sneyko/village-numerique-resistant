// ============================================================
// MOTEUR DE JEU - GESTION DE L'ÉTAT
// Village Numérique Résistant - Nuit de l'Info 2025
// ============================================================

import {
  GameState,
  PlayerProfile,
  PriorityAxis,
  IndicatorKey,
  ActionCard,
  GameEvent,
  GameEnding,
  EndingCategory,
  INITIAL_INDICATORS,
  MAX_CARDS_PER_YEAR,
  TOTAL_YEARS,
  PRIORITY_BONUS,
  ENERGY_RECOVERY,
} from "../types";
import { ACTION_CARDS, getCardById } from "../data/cards";
import { getRandomEvent } from "../data/events";
import { getEnding } from "../data/texts";

// ============================================================
// FONCTIONS UTILITAIRES
// ============================================================

/**
 * Borne une valeur entre 0 et 100
 */
function clamp(value: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Applique des deltas aux indicateurs avec saturation
 */
function applyDeltas(
  indicators: Record<IndicatorKey, number>,
  deltas: Partial<Record<IndicatorKey, number>>,
  priorityAxis?: PriorityAxis
): Record<IndicatorKey, number> {
  const newIndicators = { ...indicators };

  for (const [key, delta] of Object.entries(deltas)) {
    const indicatorKey = key as IndicatorKey;
    let effectiveDelta = delta || 0;

    // Applique le bonus de priorité si applicable
    if (
      priorityAxis &&
      indicatorKey === priorityAxis &&
      effectiveDelta > 0
    ) {
      effectiveDelta = Math.round(effectiveDelta * PRIORITY_BONUS);
    }

    newIndicators[indicatorKey] = clamp(
      newIndicators[indicatorKey] + effectiveDelta
    );
  }

  return newIndicators;
}

/**
 * Fusionne deux objets de deltas
 */
function mergeDeltas(
  a: Partial<Record<IndicatorKey, number>>,
  b: Partial<Record<IndicatorKey, number>>
): Partial<Record<IndicatorKey, number>> {
  const result: Partial<Record<IndicatorKey, number>> = { ...a };
  
  for (const [key, value] of Object.entries(b)) {
    const k = key as IndicatorKey;
    result[k] = (result[k] || 0) + (value || 0);
  }
  
  return result;
}

// ============================================================
// FONCTIONS DE GESTION D'ÉTAT
// ============================================================

/**
 * Crée l'état initial du jeu
 */
export function createInitialState(): GameState {
  return {
    profile: null,
    year: 1,
    phase: "profile",
    indicators: { ...INITIAL_INDICATORS },
    priorityAxis: undefined,
    selectedCardsThisYear: [],
    playedCards: [],
    currentQuiz: undefined,
    currentEvent: undefined,
    history: [],
    yearDelta: {},
  };
}

/**
 * Définit le profil du joueur
 */
export function setProfile(state: GameState, profile: PlayerProfile): GameState {
  return {
    ...state,
    profile,
    phase: "tutorial",
  };
}

/**
 * Passe à la phase de diagnostic (après le tutoriel)
 */
export function startGame(state: GameState): GameState {
  return {
    ...state,
    phase: "diagnostic",
  };
}

/**
 * Définit l'axe prioritaire de l'année
 */
export function setPriorityAxis(state: GameState, axis: PriorityAxis): GameState {
  return {
    ...state,
    priorityAxis: axis,
    phase: "action_selection",
    yearDelta: {}, // Reset des deltas de l'année
  };
}

/**
 * Vérifie si on peut encore sélectionner des cartes cette année
 */
export function canSelectMoreCards(state: GameState): boolean {
  return state.selectedCardsThisYear.length < MAX_CARDS_PER_YEAR;
}

/**
 * Récupère les cartes disponibles (non déjà jouées cette partie)
 */
export function getAvailableCards(state: GameState): ActionCard[] {
  const playedIds = new Set(state.playedCards.map((c) => c.id));
  const selectedIds = new Set(state.selectedCardsThisYear.map((c) => c.id));
  
  return ACTION_CARDS.filter(
    (card) => !playedIds.has(card.id) && !selectedIds.has(card.id)
  );
}

/**
 * Sélectionne une carte pour cette année (sans appliquer les effets)
 */
export function selectCard(state: GameState, cardId: string): GameState {
  if (!canSelectMoreCards(state)) {
    return state;
  }

  const card = getCardById(cardId);
  if (!card) {
    return state;
  }

  // Ajoute la carte à la sélection (les effets seront appliqués à la validation)
  return {
    ...state,
    selectedCardsThisYear: [...state.selectedCardsThisYear, card],
  };
}

/**
 * Désélectionne une carte
 */
export function deselectCard(state: GameState, cardId: string): GameState {
  return {
    ...state,
    selectedCardsThisYear: state.selectedCardsThisYear.filter(c => c.id !== cardId),
  };
}

/**
 * Valide les cartes sélectionnées et applique leurs effets
 */
export function validateYearCards(state: GameState): GameState {
  if (state.selectedCardsThisYear.length === 0) {
    return state;
  }

  let newState = { ...state };
  let totalEffects: Partial<Record<IndicatorKey, number>> = {};

  // Applique les effets de toutes les cartes sélectionnées
  for (const card of state.selectedCardsThisYear) {
    totalEffects = mergeDeltas(totalEffects, card.baseEffects);
  }

  // Applique les effets aux indicateurs
  const newIndicators = applyDeltas(
    state.indicators,
    totalEffects,
    state.priorityAxis
  );

  // Met à jour l'historique
  const historyEntries = state.selectedCardsThisYear.map(card => ({
    year: state.year,
    description: card.title,
    delta: card.baseEffects,
  }));

  return {
    ...newState,
    indicators: newIndicators,
    playedCards: [...state.playedCards, ...state.selectedCardsThisYear],
    yearDelta: totalEffects,
    history: [...state.history, ...historyEntries],
    phase: "event",
    currentEvent: getRandomEvent(),
  };
}

/**
 * Applique les effets d'une carte
 */
export function applyCardEffects(
  state: GameState,
  card: ActionCard,
  quizBonus?: Partial<Record<IndicatorKey, number>>
): GameState {
  // Calcule les effets totaux
  let effects = { ...card.baseEffects };
  if (quizBonus) {
    effects = mergeDeltas(effects, quizBonus);
  }

  // Applique les effets aux indicateurs
  const newIndicators = applyDeltas(
    state.indicators,
    effects,
    state.priorityAxis
  );

  // Met à jour les deltas de l'année
  const newYearDelta = mergeDeltas(state.yearDelta, effects);

  // Ajoute la carte aux cartes jouées
  const newSelectedCards = [...state.selectedCardsThisYear, card];
  const allPlayed = [...state.playedCards, card];

  // Détermine la prochaine phase
  let nextPhase: GameState["phase"] = "action_selection";
  
  // Si on a joué 3 cartes, on passe à l'événement
  if (newSelectedCards.length >= MAX_CARDS_PER_YEAR) {
    nextPhase = "event";
  }

  return {
    ...state,
    indicators: newIndicators,
    selectedCardsThisYear: newSelectedCards,
    playedCards: allPlayed,
    yearDelta: newYearDelta,
    currentQuiz: undefined,
    phase: nextPhase,
    currentEvent: nextPhase === "event" ? getRandomEvent() : undefined,
  };
}

/**
 * Répond à un quiz
 */
export function answerQuiz(
  state: GameState,
  answerId: string
): GameState {
  if (!state.currentQuiz) {
    return state;
  }

  const { card, quiz } = state.currentQuiz;
  const answer = quiz.answers.find((a) => a.id === answerId);

  if (!answer) {
    return state;
  }

  // Effets bonus/malus selon la réponse
  const quizEffects = answer.effects || {};

  // Si mauvaise réponse, on réduit les effets de base
  let finalEffects = card.baseEffects;
  if (!answer.isCorrect) {
    // Réduit les effets positifs de moitié
    finalEffects = Object.fromEntries(
      Object.entries(card.baseEffects).map(([key, value]) => [
        key,
        value && value > 0 ? Math.floor(value / 2) : value,
      ])
    ) as Partial<Record<IndicatorKey, number>>;
  }

  // Applique les effets avec le bonus/malus du quiz
  return applyCardEffects(
    state,
    { ...card, baseEffects: finalEffects },
    quizEffects
  );
}

/**
 * Répond à un événement
 */
export function answerEvent(
  state: GameState,
  choiceId: string
): GameState {
  if (!state.currentEvent) {
    return state;
  }

  const choice = state.currentEvent.choices.find((c) => c.id === choiceId);
  if (!choice) {
    return state;
  }

  // Applique les effets du choix
  const newIndicators = applyDeltas(
    state.indicators,
    choice.effects,
    state.priorityAxis
  );

  const newYearDelta = mergeDeltas(state.yearDelta, choice.effects);

  // Ajoute à l'historique
  const historyEntry = {
    year: state.year,
    description: `${state.currentEvent.title} → ${choice.label}`,
    delta: newYearDelta,
  };

  return {
    ...state,
    indicators: newIndicators,
    yearDelta: newYearDelta,
    currentEvent: undefined,
    phase: "summary",
    history: [...state.history, historyEntry],
  };
}

/**
 * Passe à l'année suivante
 */
export function nextYear(state: GameState): GameState {
  // Récupération d'énergie
  const newIndicators = {
    ...state.indicators,
    energie: clamp(state.indicators.energie + ENERGY_RECOVERY),
  };

  // Nouvelle année ou fin ?
  if (state.year >= TOTAL_YEARS) {
    return {
      ...state,
      indicators: newIndicators,
      phase: "ended",
    };
  }

  return {
    ...state,
    year: state.year + 1,
    indicators: newIndicators,
    priorityAxis: undefined,
    selectedCardsThisYear: [],
    yearDelta: {},
    phase: "diagnostic",
  };
}

/**
 * Calcule la catégorie de fin
 */
export function computeEndingCategory(state: GameState): EndingCategory {
  const { inclusion, responsabilite, durabilite, dependance } = state.indicators;

  // Résistant : dépendance ≤ 30 et les trois piliers ≥ 70
  if (
    dependance <= 30 &&
    inclusion >= 70 &&
    responsabilite >= 70 &&
    durabilite >= 70
  ) {
    return "resistant";
  }

  // Transition : dépendance entre 30 et 50 et les trois piliers ≥ 50
  if (
    dependance <= 50 &&
    dependance > 30 &&
    inclusion >= 50 &&
    responsabilite >= 50 &&
    durabilite >= 50
  ) {
    return "transition";
  }

  // Captif : tout le reste
  return "captif";
}

/**
 * Génère le résultat de fin de partie
 */
export function computeEnding(state: GameState): GameEnding {
  const category = computeEndingCategory(state);
  return getEnding(category, state.profile || "autre");
}

/**
 * Génère le plan NIRD (résumé des actions jouées)
 */
export function generateNIRDPlan(state: GameState): string {
  const cardsByZone: Record<string, ActionCard[]> = {
    infra: [],
    pedago: [],
    vie: [],
    gouv: [],
  };

  for (const card of state.playedCards) {
    cardsByZone[card.zone].push(card);
  }

  const zoneLabels: Record<string, string> = {
    infra: "Infrastructure",
    pedago: "Pédagogie",
    vie: "Vie scolaire",
    gouv: "Gouvernance",
  };

  let plan = "# Mon Plan NIRD\n";
  plan += "## Village Numérique Résistant - Actions réalisées\n\n";

  for (const [zone, cards] of Object.entries(cardsByZone)) {
    if (cards.length > 0) {
      plan += `### ${zoneLabels[zone]}\n`;
      for (const card of cards) {
        plan += `- ${card.title}\n`;
      }
      plan += "\n";
    }
  }

  plan += "---\n";
  plan += `Généré par le jeu "Village Numérique Résistant" - Nuit de l'Info 2025\n`;

  return plan;
}

/**
 * Vérifie si le jeu est terminé prématurément (budget ou énergie à 0)
 */
export function checkGameOver(state: GameState): boolean {
  return state.indicators.budget <= 0 || state.indicators.energie <= 0;
}
