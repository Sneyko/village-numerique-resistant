// ============================================================
// ÉVÉNEMENTS ALÉATOIRES DU JEU
// Village Numérique Résistant - Nuit de l'Info 2025
// ============================================================

import { GameEvent } from "../types";

export const GAME_EVENTS: GameEvent[] = [
  {
    id: "fin-support-windows",
    title: "⚠️ Fin de support Windows 10",
    description:
      "Microsoft annonce la fin du support de Windows 10. Sans mises à jour de sécurité, les postes deviennent vulnérables. La collectivité propose de tout remplacer par du matériel neuf sous Windows 11...",
    choices: [
      {
        id: "acheter-neuf",
        label: "Accepter : acheter du matériel neuf sous Windows 11",
        effects: {
          budget: -25,
          dependance: 15,
          durabilite: -20,
          energie: 5,
        },
        explanation:
          "Le budget est sévèrement impacté et la dépendance augmente. Mais l'équipe est soulagée de ne pas avoir à gérer la migration.",
      },
      {
        id: "migrer-linux",
        label: "Refuser : migrer les postes vers Linux",
        effects: {
          dependance: -20,
          durabilite: 20,
          responsabilite: 15,
          energie: -15,
          budget: 10,
        },
        explanation:
          "Un choix courageux ! La migration demande de l'énergie mais les économies sont réelles et la dépendance diminue.",
      },
      {
        id: "mixte",
        label: "Compromis : garder Windows sur quelques postes, Linux sur les autres",
        effects: {
          dependance: -5,
          durabilite: 5,
          budget: -10,
          energie: -10,
        },
        explanation:
          "Une solution intermédiaire qui satisfait personne complètement mais limite les risques.",
      },
    ],
  },
  {
    id: "phishing-eleves",
    title: "🎣 Tentative de phishing sur les comptes élèves",
    description:
      "Plusieurs élèves ont cliqué sur un faux lien et leurs identifiants ENT ont été compromis. Des messages frauduleux ont été envoyés depuis leurs comptes. Comment réagir ?",
    choices: [
      {
        id: "formation-urgence",
        label: "Organiser une formation d'urgence à la cybersécurité",
        effects: {
          responsabilite: 15,
          inclusion: 10,
          energie: -15,
        },
        explanation:
          "Les élèves apprennent à reconnaître les tentatives de phishing. Un mal pour un bien !",
      },
      {
        id: "bloquer-tout",
        label: "Bloquer l'accès à Internet sur les postes élèves",
        effects: {
          responsabilite: 5,
          inclusion: -20,
          energie: 5,
          dependance: 10,
        },
        explanation:
          "Une réaction excessive qui pénalise tout le monde et renforce la dépendance à des solutions fermées.",
      },
      {
        id: "ignorer",
        label: "Minimiser l'incident et passer à autre chose",
        effects: {
          responsabilite: -15,
          energie: 5,
        },
        explanation:
          "L'incident se reproduira probablement. La confiance des familles est ébranlée.",
      },
    ],
  },
  {
    id: "coupe-budgetaire",
    title: "💸 Coupe budgétaire de la collectivité",
    description:
      "La collectivité annonce une réduction de 20% du budget numérique pour l'année prochaine. Il faut faire des choix difficiles.",
    choices: [
      {
        id: "reduire-licences",
        label: "Réduire les licences propriétaires et passer au libre",
        effects: {
          budget: 10,
          dependance: -15,
          responsabilite: 10,
          energie: -10,
        },
        explanation:
          "Transformer la contrainte en opportunité ! Le passage au libre compense la baisse de budget.",
      },
      {
        id: "reduire-projets",
        label: "Annuler les projets de sensibilisation prévus",
        effects: {
          budget: 15,
          inclusion: -10,
          responsabilite: -10,
          energie: 5,
        },
        explanation:
          "Le budget est préservé mais les actions de fond sont sacrifiées. Dommage.",
      },
      {
        id: "chercher-subventions",
        label: "Chercher des subventions alternatives",
        effects: {
          budget: 5,
          energie: -20,
          responsabilite: 5,
        },
        explanation:
          "Beaucoup d'énergie dépensée pour un résultat incertain, mais l'établissement gagne en autonomie.",
      },
    ],
  },
  {
    id: "projet-eleves",
    title: "💡 Des élèves proposent un projet NIRD",
    description:
      "Un groupe d'élèves motivés vient vous voir avec un projet : créer une chaîne de tutos vidéo pour apprendre à utiliser les logiciels libres. Ils demandent du soutien.",
    choices: [
      {
        id: "soutenir-fond",
        label: "Les soutenir à fond : temps, matériel, communication",
        effects: {
          inclusion: 20,
          responsabilite: 15,
          energie: -15,
          dependance: -10,
        },
        explanation:
          "Les élèves deviennent acteurs du changement ! Le projet rayonne au-delà de l'établissement.",
      },
      {
        id: "soutenir-minimum",
        label: "Les encourager mais sans moyens dédiés",
        effects: {
          inclusion: 5,
          responsabilite: 5,
          energie: -5,
        },
        explanation:
          "Le projet avance doucement mais les élèves se sentent peu soutenus.",
      },
      {
        id: "refuser",
        label: "Refuser par manque de temps",
        effects: {
          inclusion: -10,
          energie: 5,
          responsabilite: -5,
        },
        explanation:
          "Les élèves sont déçus. Certains se désengagent des projets collectifs.",
      },
    ],
  },
  {
    id: "appel-projets-collectivite",
    title: "📢 Appel à projets de la collectivité",
    description:
      "La région lance un appel à projets 'Numérique responsable dans les établissements scolaires'. Le dossier est complexe mais le financement est conséquent.",
    choices: [
      {
        id: "candidater",
        label: "Monter un dossier de candidature",
        effects: {
          budget: 20,
          responsabilite: 10,
          durabilite: 10,
          energie: -20,
        },
        explanation:
          "Beaucoup de travail, mais le projet est retenu ! L'établissement obtient des moyens importants.",
      },
      {
        id: "partenariat",
        label: "Candidater en partenariat avec d'autres établissements",
        effects: {
          budget: 15,
          inclusion: 10,
          responsabilite: 10,
          energie: -15,
        },
        explanation:
          "Le dossier mutualisé est solide. Les établissements partenaires échangent leurs bonnes pratiques.",
      },
      {
        id: "renoncer",
        label: "Renoncer, trop compliqué",
        effects: {
          energie: 10,
        },
        explanation:
          "L'équipe préserve son énergie pour d'autres combats. Peut-être l'année prochaine ?",
      },
    ],
  },
  {
    id: "panne-serveur",
    title: "🔥 Panne du serveur principal",
    description:
      "Le serveur qui héberge l'ENT et les fichiers partagés tombe en panne. Le prestataire propose un remplacement coûteux ou une migration vers le cloud Microsoft.",
    choices: [
      {
        id: "cloud-microsoft",
        label: "Migrer vers Microsoft 365",
        effects: {
          dependance: 25,
          energie: 10,
          budget: -15,
          responsabilite: -15,
        },
        explanation:
          "La migration est rapide mais l'établissement devient très dépendant de Microsoft.",
      },
      {
        id: "serveur-libre",
        label: "Reconstruire avec des solutions libres (Nextcloud, etc.)",
        effects: {
          dependance: -15,
          responsabilite: 20,
          energie: -20,
          budget: -10,
        },
        explanation:
          "Un gros effort technique, mais l'établissement gagne en souveraineté numérique.",
      },
      {
        id: "reparer",
        label: "Tenter de réparer le serveur existant",
        effects: {
          durabilite: 15,
          energie: -10,
          budget: 5,
        },
        explanation:
          "Le serveur repart pour quelques années. Une solution sobre et économique !",
      },
    ],
  },
  {
    id: "donation-materiel",
    title: "🎁 Donation de matériel d'entreprise",
    description:
      "Une entreprise locale propose de donner 30 ordinateurs 'obsolètes' (5 ans). Ils fonctionnent mais ne sont plus assez puissants pour Windows 11.",
    choices: [
      {
        id: "accepter-linux",
        label: "Accepter et installer Linux dessus",
        effects: {
          durabilite: 20,
          inclusion: 15,
          dependance: -10,
          budget: 15,
          energie: -10,
        },
        explanation:
          "Sous Linux, ces machines ont encore de belles années devant elles ! Et elles peuvent être prêtées aux familles.",
      },
      {
        id: "refuser",
        label: "Refuser poliment",
        effects: {
          energie: 5,
        },
        explanation:
          "L'établissement préfère ne pas gérer ce matériel supplémentaire. Les ordinateurs seront probablement recyclés.",
      },
      {
        id: "accepter-partiel",
        label: "Accepter seulement les meilleurs",
        effects: {
          durabilite: 10,
          budget: 5,
          energie: -5,
        },
        explanation:
          "Une sélection raisonnable. Les autres machines seront peut-être récupérées par des associations.",
      },
    ],
  },
  {
    id: "reseaux-sociaux-crise",
    title: "📱 Crise sur les réseaux sociaux",
    description:
      "Une vidéo tournée dans l'établissement fait le buzz sur TikTok. Des commentaires négatifs affluent. L'image de l'établissement est en jeu.",
    choices: [
      {
        id: "communiquer",
        label: "Communiquer positivement sur les projets NIRD en cours",
        effects: {
          responsabilite: 10,
          inclusion: 5,
          energie: -10,
        },
        explanation:
          "L'établissement retourne la situation en mettant en avant ses engagements éthiques.",
      },
      {
        id: "ignorer",
        label: "Ignorer et attendre que ça passe",
        effects: {
          energie: 5,
          responsabilite: -5,
        },
        explanation:
          "Le buzz retombe mais l'image reste écornée. Une occasion manquée de parler du NIRD.",
      },
      {
        id: "interdire-tel",
        label: "Interdire les téléphones dans l'établissement",
        effects: {
          inclusion: -15,
          responsabilite: -5,
          energie: -5,
        },
        explanation:
          "Une réaction disproportionnée qui crée des tensions avec les élèves et les familles.",
      },
    ],
  },
  {
    id: "visite-inspection",
    title: "🔍 Visite de l'inspection académique",
    description:
      "L'inspecteur·rice vient évaluer les pratiques numériques de l'établissement. C'est l'occasion de valoriser les actions NIRD... ou de les cacher.",
    choices: [
      {
        id: "presenter-fierte",
        label: "Présenter fièrement les projets NIRD",
        effects: {
          responsabilite: 15,
          inclusion: 10,
          energie: -5,
        },
        explanation:
          "L'inspection est impressionnée. L'établissement pourrait devenir pilote au niveau académique !",
      },
      {
        id: "rester-discret",
        label: "Rester discret sur les choix alternatifs",
        effects: {
          energie: 5,
        },
        explanation:
          "L'inspection se passe sans accroc mais aussi sans reconnaissance particulière.",
      },
    ],
  },
  {
    id: "partenariat-association",
    title: "🤝 Proposition d'une association locale",
    description:
      "Une association de promotion du logiciel libre propose un partenariat : interventions gratuites en échange de visibilité.",
    choices: [
      {
        id: "accepter-partenariat",
        label: "Accepter avec enthousiasme",
        effects: {
          responsabilite: 15,
          inclusion: 10,
          dependance: -10,
          energie: -5,
        },
        explanation:
          "Les interventions sont un succès ! Élèves et enseignants découvrent un écosystème engagé.",
      },
      {
        id: "tester",
        label: "Tester sur une classe avant de généraliser",
        effects: {
          responsabilite: 5,
          energie: -5,
        },
        explanation:
          "Une approche prudente. Le test est concluant et un partenariat plus large est envisagé.",
      },
      {
        id: "decliner",
        label: "Décliner poliment",
        effects: {
          energie: 5,
        },
        explanation:
          "L'établissement préfère ne pas s'engager pour l'instant. L'association ira ailleurs.",
      },
    ],
  },
];

/**
 * Récupère un événement aléatoire
 */
export function getRandomEvent(): GameEvent {
  const index = Math.floor(Math.random() * GAME_EVENTS.length);
  return GAME_EVENTS[index];
}

/**
 * Récupère un événement par son ID
 */
export function getEventById(id: string): GameEvent | undefined {
  return GAME_EVENTS.find((event) => event.id === id);
}
