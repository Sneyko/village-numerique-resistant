// ============================================================
// CARTES D'ACTIONS DU JEU
// Village Numérique Résistant - Nuit de l'Info 2025
// ============================================================

import { ActionCard } from "../types";

export const ACTION_CARDS: ActionCard[] = [
  // ============================================================
  // ZONE: INFRASTRUCTURE (infra)
  // ============================================================
  {
    id: "linux-salle-info",
    title: "Installer Linux sur une salle informatique",
    shortLabel: "Linux en salle info",
    zone: "infra",
    description:
      "Remplacer Windows par une distribution Linux (comme Ubuntu ou Linux Mint) sur les postes d'une salle. Cela permet de prolonger la vie des machines et de réduire la dépendance aux logiciels propriétaires.",
    difficulty: "moyen",
    tags: ["linux", "réemploi", "libre", "système"],
    baseEffects: {
      durabilite: 15,
      responsabilite: 10,
      dependance: -15,
      budget: 5,
      energie: -10,
    },
    quiz: {
      question: "Quel est l'un des principaux avantages de Linux pour un parc informatique scolaire ?",
      answers: [
        {
          id: "a",
          label: "Il est gratuit et open source",
          isCorrect: true,
          explanation: "Exact ! Linux est gratuit, son code est ouvert et auditable, et il peut faire tourner des machines anciennes.",
        },
        {
          id: "b",
          label: "Il nécessite des machines très puissantes",
          isCorrect: false,
          explanation: "C'est l'inverse ! Linux est réputé pour sa légèreté et peut redonner vie à des PC anciens.",
          effects: { durabilite: -5 },
        },
        {
          id: "c",
          label: "Il est édité par Microsoft",
          isCorrect: false,
          explanation: "Non, Linux est un système libre développé par une communauté mondiale de contributeurs.",
          effects: { responsabilite: -5 },
        },
      ],
    },
    recommendedFor: ["enseignant", "collectivite"],
  },
  {
    id: "atelier-reemploi",
    title: "Monter un atelier de réemploi avec les élèves",
    shortLabel: "Atelier réemploi",
    zone: "infra",
    description:
      "Créer un atelier où les élèves apprennent à démonter, diagnostiquer et réparer du matériel informatique. Les machines reconditionnées peuvent être redistribuées aux familles.",
    difficulty: "moyen",
    tags: ["réemploi", "réparation", "inclusion", "pédagogie"],
    baseEffects: {
      durabilite: 20,
      inclusion: 15,
      responsabilite: 10,
      energie: -15,
      budget: 10,
    },
    quiz: {
      question: "Que signifie le terme 'réemploi' en informatique ?",
      answers: [
        {
          id: "a",
          label: "Jeter le matériel pour en acheter du neuf",
          isCorrect: false,
          explanation: "Non, c'est l'opposé du réemploi ! Cela contribue au gaspillage électronique.",
          effects: { durabilite: -10 },
        },
        {
          id: "b",
          label: "Remettre en état un appareil pour lui donner une seconde vie",
          isCorrect: true,
          explanation: "Exact ! Le réemploi permet de prolonger la durée de vie du matériel et de réduire les déchets.",
        },
        {
          id: "c",
          label: "Utiliser un logiciel piraté",
          isCorrect: false,
          explanation: "Non, le réemploi concerne le matériel, pas les logiciels. Et le piratage n'est jamais la solution !",
          effects: { responsabilite: -10 },
        },
      ],
    },
    recommendedFor: ["eleve", "enseignant"],
  },
  {
    id: "inventaire-parc",
    title: "Faire l'inventaire du parc numérique",
    shortLabel: "Inventaire parc",
    zone: "infra",
    description:
      "Recenser tout le matériel informatique de l'établissement : état, âge, logiciels installés, besoins réels. C'est la première étape vers une gestion responsable.",
    difficulty: "facile",
    tags: ["diagnostic", "gestion", "sobriété"],
    baseEffects: {
      responsabilite: 10,
      durabilite: 5,
      energie: -5,
    },
    recommendedFor: ["enseignant", "collectivite"],
  },
  {
    id: "serveur-local",
    title: "Installer un serveur local Nextcloud",
    shortLabel: "Serveur Nextcloud",
    zone: "infra",
    description:
      "Mettre en place un serveur de stockage et de partage de fichiers auto-hébergé, pour ne plus dépendre de Google Drive ou OneDrive.",
    difficulty: "avance",
    tags: ["cloud", "souveraineté", "données", "libre"],
    baseEffects: {
      responsabilite: 20,
      dependance: -20,
      budget: -10,
      energie: -15,
    },
    recommendedFor: ["collectivite", "enseignant"],
  },

  // ============================================================
  // ZONE: PÉDAGOGIE (pedago)
  // ============================================================
  {
    id: "suite-libre-cdi",
    title: "Passer aux suites bureautiques libres au CDI",
    shortLabel: "LibreOffice au CDI",
    zone: "pedago",
    description:
      "Remplacer Microsoft Office par LibreOffice sur les postes du CDI. Les élèves découvrent qu'il existe des alternatives gratuites et performantes.",
    difficulty: "facile",
    tags: ["libre", "bureautique", "CDI"],
    baseEffects: {
      responsabilite: 10,
      dependance: -10,
      budget: 10,
      inclusion: 5,
    },
    quiz: {
      question: "LibreOffice est :",
      answers: [
        {
          id: "a",
          label: "Un logiciel payant de Microsoft",
          isCorrect: false,
          explanation: "Non, LibreOffice est développé par The Document Foundation, une organisation à but non lucratif.",
          effects: { responsabilite: -5 },
        },
        {
          id: "b",
          label: "Une suite bureautique libre et gratuite",
          isCorrect: true,
          explanation: "Exact ! LibreOffice est open source, gratuit, et compatible avec les formats Microsoft Office.",
        },
        {
          id: "c",
          label: "Un antivirus",
          isCorrect: false,
          explanation: "Non, LibreOffice est une suite bureautique (traitement de texte, tableur, présentations...).",
        },
      ],
    },
    recommendedFor: ["enseignant", "eleve"],
  },
  {
    id: "ressources-libres",
    title: "Mettre en avant des ressources éducatives libres",
    shortLabel: "Ressources libres",
    zone: "pedago",
    description:
      "Intégrer dans les cours et au CDI des ressources éducatives libres (Wikipédia, OpenClassrooms, Khan Academy, manuels libres...) plutôt que des contenus propriétaires.",
    difficulty: "facile",
    tags: ["REL", "communs", "pédagogie", "libre"],
    baseEffects: {
      responsabilite: 10,
      inclusion: 10,
      dependance: -5,
      budget: 5,
    },
    recommendedFor: ["enseignant"],
  },
  {
    id: "projet-classe-nird",
    title: "Lancer un projet de classe sur le numérique responsable",
    shortLabel: "Projet classe NIRD",
    zone: "pedago",
    description:
      "Organiser un projet pédagogique où les élèves enquêtent sur l'empreinte écologique du numérique, les alternatives libres, ou la protection des données.",
    difficulty: "moyen",
    tags: ["projet", "sensibilisation", "EMI"],
    baseEffects: {
      responsabilite: 15,
      durabilite: 10,
      inclusion: 5,
      energie: -10,
    },
    recommendedFor: ["enseignant", "eleve"],
  },
  {
    id: "formation-profs",
    title: "Former les enseignants aux outils libres",
    shortLabel: "Formation profs",
    zone: "pedago",
    description:
      "Organiser des sessions de formation pour que les enseignants maîtrisent les alternatives libres et puissent les transmettre aux élèves.",
    difficulty: "moyen",
    tags: ["formation", "libre", "enseignants"],
    baseEffects: {
      responsabilite: 15,
      inclusion: 10,
      energie: -15,
      dependance: -10,
    },
    recommendedFor: ["enseignant", "collectivite"],
  },

  // ============================================================
  // ZONE: VIE SCOLAIRE (vie)
  // ============================================================
  {
    id: "campagne-sobriete",
    title: "Campagne de sensibilisation à la sobriété numérique",
    shortLabel: "Campagne sobriété",
    zone: "vie",
    description:
      "Affiches, ateliers, défis... pour sensibiliser élèves et personnels à réduire leur empreinte numérique (emails, streaming, veille des appareils...).",
    difficulty: "facile",
    tags: ["sobriété", "sensibilisation", "écologie"],
    baseEffects: {
      durabilite: 15,
      responsabilite: 5,
      energie: -5,
    },
    recommendedFor: ["eleve", "enseignant"],
  },
  {
    id: "club-libre",
    title: "Créer un club informatique autour du libre",
    shortLabel: "Club du Libre",
    zone: "vie",
    description:
      "Un club où les élèves découvrent Linux, la programmation open source, le hacking éthique, la réparation... Un espace de curiosité et d'entraide.",
    difficulty: "moyen",
    tags: ["club", "libre", "élèves", "communauté"],
    baseEffects: {
      inclusion: 15,
      responsabilite: 10,
      durabilite: 5,
      energie: -10,
    },
    recommendedFor: ["eleve", "enseignant"],
  },
  {
    id: "ambassadeurs-nird",
    title: "Former des élèves ambassadeurs du NIRD",
    shortLabel: "Ambassadeurs NIRD",
    zone: "vie",
    description:
      "Sélectionner et former des élèves volontaires pour devenir des référents du numérique responsable auprès de leurs camarades.",
    difficulty: "moyen",
    tags: ["ambassadeurs", "élèves", "pairs", "formation"],
    baseEffects: {
      inclusion: 20,
      responsabilite: 10,
      energie: -10,
    },
    recommendedFor: ["eleve", "enseignant"],
  },
  {
    id: "repair-cafe",
    title: "Organiser un Repair Café numérique",
    shortLabel: "Repair Café",
    zone: "vie",
    description:
      "Événement ouvert où élèves, parents et habitants peuvent faire réparer leurs appareils numériques par des bénévoles. Convivialité et lutte contre l'obsolescence !",
    difficulty: "avance",
    tags: ["réparation", "événement", "communauté", "familles"],
    baseEffects: {
      durabilite: 20,
      inclusion: 15,
      responsabilite: 5,
      energie: -20,
      budget: -5,
    },
    recommendedFor: ["famille", "eleve"],
  },

  // ============================================================
  // ZONE: GOUVERNANCE (gouv)
  // ============================================================
  {
    id: "rencontre-collectivite",
    title: "Rencontrer la collectivité pour parler de réemploi",
    shortLabel: "RDV collectivité",
    zone: "gouv",
    description:
      "Organiser une réunion avec les élus et agents de la collectivité pour présenter les enjeux du réemploi et proposer un partenariat.",
    difficulty: "moyen",
    tags: ["collectivité", "partenariat", "réemploi", "politique"],
    baseEffects: {
      durabilite: 10,
      responsabilite: 10,
      budget: 15,
      energie: -10,
    },
    recommendedFor: ["collectivite", "enseignant"],
  },
  {
    id: "charte-nird",
    title: "Co-écrire une charte du numérique inclusif, responsable et durable",
    shortLabel: "Charte NIRD",
    zone: "gouv",
    description:
      "Rédiger collectivement (élèves, profs, parents, collectivité) une charte engageant l'établissement vers un numérique éthique.",
    difficulty: "avance",
    tags: ["charte", "engagement", "co-construction", "NIRD"],
    baseEffects: {
      responsabilite: 20,
      inclusion: 15,
      durabilite: 10,
      energie: -15,
    },
    recommendedFor: ["collectivite", "enseignant", "famille"],
  },
  {
    id: "communs-educatifs",
    title: "Contribuer aux communs numériques éducatifs",
    shortLabel: "Communs éducatifs",
    zone: "gouv",
    description:
      "Participer à des projets collaboratifs (Wikipédia, manuels libres, logiciels éducatifs open source) pour enrichir les ressources accessibles à tous.",
    difficulty: "avance",
    tags: ["communs", "contribution", "partage", "libre"],
    baseEffects: {
      responsabilite: 15,
      inclusion: 15,
      dependance: -10,
      energie: -15,
    },
    recommendedFor: ["enseignant", "eleve"],
  },
  {
    id: "appel-projets",
    title: "Répondre à un appel à projets écologique",
    shortLabel: "Appel à projets",
    zone: "gouv",
    description:
      "Monter un dossier pour obtenir des financements (région, État, Europe) pour des projets de numérique responsable.",
    difficulty: "avance",
    tags: ["financement", "projet", "subvention"],
    baseEffects: {
      budget: 25,
      responsabilite: 10,
      durabilite: 10,
      energie: -20,
    },
    recommendedFor: ["collectivite", "enseignant"],
  },
];

/**
 * Récupère les cartes par zone
 */
export function getCardsByZone(zone: ZoneKey): ActionCard[] {
  return ACTION_CARDS.filter((card) => card.zone === zone);
}

/**
 * Récupère une carte par son ID
 */
export function getCardById(id: string): ActionCard | undefined {
  return ACTION_CARDS.find((card) => card.id === id);
}

/**
 * Récupère les cartes recommandées pour un profil
 */
export function getRecommendedCards(profile: string): ActionCard[] {
  return ACTION_CARDS.filter((card) => card.recommendedFor?.includes(profile as any));
}

// Import du type ZoneKey pour la fonction
import { ZoneKey } from "../types";
