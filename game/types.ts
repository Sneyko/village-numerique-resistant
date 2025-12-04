// ============================================================
// TYPES DU JEU "VILLAGE NUMÉRIQUE RÉSISTANT"
// Nuit de l'Info 2025 - Démarche NIRD
// ============================================================

// Profils de joueur
export type PlayerProfile = "eleve" | "enseignant" | "famille" | "collectivite" | "autre";

// Indicateurs du jeu
export type IndicatorKey = "inclusion" | "responsabilite" | "durabilite" | "dependance" | "budget" | "energie";

// Zones de l'établissement
export type ZoneKey = "infra" | "pedago" | "vie" | "gouv";

// Niveaux de difficulté
export type Difficulty = "facile" | "moyen" | "avance";

// Catégories de fin de partie
export type EndingCategory = "captif" | "transition" | "resistant";

// Phases du jeu
export type GamePhase = 
  | "profile" 
  | "tutorial" 
  | "diagnostic" 
  | "action_selection" 
  | "quiz"
  | "event" 
  | "summary" 
  | "ended";

// Axes de priorité NIRD
export type PriorityAxis = "inclusion" | "responsabilite" | "durabilite";

// ============================================================
// INTERFACES
// ============================================================

/**
 * Réponse à un quiz
 */
export interface QuizAnswer {
  id: string;
  label: string;
  isCorrect: boolean;
  effects?: Partial<Record<IndicatorKey, number>>;
  explanation: string;
}

/**
 * Quiz associé à une carte d'action
 */
export interface CardQuiz {
  question: string;
  answers: QuizAnswer[];
}

/**
 * Carte d'action jouable
 */
export interface ActionCard {
  id: string;
  title: string;
  shortLabel: string;
  zone: ZoneKey;
  description: string;
  difficulty: Difficulty;
  tags: string[];
  baseEffects: Partial<Record<IndicatorKey, number>>;
  quiz?: CardQuiz;
  recommendedFor?: PlayerProfile[];
}

/**
 * Choix disponible lors d'un événement
 */
export interface EventChoice {
  id: string;
  label: string;
  effects: Partial<Record<IndicatorKey, number>>;
  explanation: string;
}

/**
 * Événement aléatoire de fin d'année
 */
export interface GameEvent {
  id: string;
  title: string;
  description: string;
  choices: EventChoice[];
}

/**
 * Entrée dans l'historique de la partie
 */
export interface HistoryEntry {
  year: number;
  description: string;
  delta: Partial<Record<IndicatorKey, number>>;
}

/**
 * État complet du jeu
 */
export interface GameState {
  // Identité du joueur
  profile: PlayerProfile | null;
  
  // Progression
  year: number; // 1 à 4
  phase: GamePhase;
  
  // Indicateurs (0-100)
  indicators: Record<IndicatorKey, number>;
  
  // Priorité de l'année
  priorityAxis?: PriorityAxis;
  
  // Cartes
  selectedCardsThisYear: ActionCard[];
  playedCards: ActionCard[]; // Toutes les cartes jouées dans la partie
  
  // Quiz en cours
  currentQuiz?: {
    card: ActionCard;
    quiz: CardQuiz;
  };
  
  // Événement en cours
  currentEvent?: GameEvent;
  
  // Historique pour le bilan
  history: HistoryEntry[];
  
  // Delta de l'année en cours (pour le résumé)
  yearDelta: Partial<Record<IndicatorKey, number>>;
}

/**
 * Résultat de fin de partie
 */
export interface GameEnding {
  category: EndingCategory;
  title: string;
  description: string;
}

/**
 * Configuration des indicateurs
 */
export interface IndicatorConfig {
  key: IndicatorKey;
  label: string;
  icon: string;
  color: string;
  description: string;
  isNegative?: boolean; // true pour "dépendance" qu'on veut diminuer
}

/**
 * Configuration des zones
 */
export interface ZoneConfig {
  key: ZoneKey;
  label: string;
  icon: string;
  description: string;
  color: string;
}

/**
 * Configuration des profils
 */
export interface ProfileConfig {
  key: PlayerProfile;
  label: string;
  icon: string;
  description: string;
}

// ============================================================
// CONSTANTES DE CONFIGURATION
// ============================================================

export const INITIAL_INDICATORS: Record<IndicatorKey, number> = {
  inclusion: 40,
  responsabilite: 40,
  durabilite: 30,
  dependance: 80,
  budget: 60,
  energie: 60,
};

export const MAX_CARDS_PER_YEAR = 3;
export const TOTAL_YEARS = 4;
export const PRIORITY_BONUS = 1.2; // +20% sur l'axe prioritaire
export const ENERGY_RECOVERY = 10; // Récupération d'énergie entre les années

export const INDICATORS_CONFIG: IndicatorConfig[] = [
  {
    key: "inclusion",
    label: "Inclusion",
    icon: "👥",
    color: "#8b5cf6", // violet
    description: "Accès pour tous, lutte contre la fracture numérique",
  },
  {
    key: "responsabilite",
    label: "Responsabilité",
    icon: "🛡️",
    color: "#3b82f6", // bleu
    description: "Éthique, protection des données, logiciels libres",
  },
  {
    key: "durabilite",
    label: "Durabilité",
    icon: "🌱",
    color: "#22c55e", // vert
    description: "Sobriété, réemploi, réparation",
  },
  {
    key: "dependance",
    label: "Dépendance Big Tech",
    icon: "⛓️",
    color: "#ef4444", // rouge
    description: "Niveau de dépendance aux géants du numérique",
    isNegative: true,
  },
  {
    key: "budget",
    label: "Budget",
    icon: "💰",
    color: "#f59e0b", // orange
    description: "Ressources financières disponibles",
  },
  {
    key: "energie",
    label: "Énergie d'équipe",
    icon: "⚡",
    color: "#06b6d4", // cyan
    description: "Motivation et disponibilité des équipes",
  },
];

export const ZONES_CONFIG: ZoneConfig[] = [
  {
    key: "infra",
    label: "Infrastructure",
    icon: "🖥️",
    description: "Parc machines, salle info, réseaux",
    color: "#6366f1",
  },
  {
    key: "pedago",
    label: "Pédagogie",
    icon: "📚",
    description: "CDI, ressources éducatives, cours",
    color: "#8b5cf6",
  },
  {
    key: "vie",
    label: "Vie scolaire",
    icon: "🎒",
    description: "Élèves, clubs, sensibilisation",
    color: "#ec4899",
  },
  {
    key: "gouv",
    label: "Gouvernance",
    icon: "🏛️",
    description: "Collectivité, projet d'établissement",
    color: "#14b8a6",
  },
];

export const PROFILES_CONFIG: ProfileConfig[] = [
  {
    key: "eleve",
    label: "Élève / Éco-délégué·e",
    icon: "🎓",
    description: "Tu veux transformer ton lycée de l'intérieur",
  },
  {
    key: "enseignant",
    label: "Enseignant·e / CPE",
    icon: "👨‍🏫",
    description: "Tu accompagnes les élèves vers un numérique responsable",
  },
  {
    key: "famille",
    label: "Parent / Famille",
    icon: "👨‍👩‍👧",
    description: "Tu veux un numérique sain pour tes enfants",
  },
  {
    key: "collectivite",
    label: "Élu·e / Collectivité",
    icon: "🏛️",
    description: "Tu décides des moyens et des orientations",
  },
  {
    key: "autre",
    label: "Autre",
    icon: "🌟",
    description: "Citoyen·ne engagé·e pour un numérique éthique",
  },
];
