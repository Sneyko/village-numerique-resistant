// ============================================================
// TEXTES DE FIN DE PARTIE
// Village Numérique Résistant - Nuit de l'Info 2025
// ============================================================

import { EndingCategory, PlayerProfile, GameEnding } from "../types";

interface EndingTexts {
  title: string;
  descriptions: Record<PlayerProfile, string>;
}

const ENDINGS: Record<EndingCategory, EndingTexts> = {
  captif: {
    title: "🔒 Établissement Captif",
    descriptions: {
      eleve:
        "Ton établissement reste dépendant des Big Tech. Les abonnements pèsent sur le budget, les données des élèves circulent sur des serveurs lointains, et le matériel est renouvelé trop souvent. Mais ton engagement a semé des graines. La prochaine génération pourra peut-être changer les choses !",
      enseignant:
        "Malgré vos efforts, l'établissement n'a pas réussi à s'émanciper des géants du numérique. Les contraintes budgétaires et le manque de temps ont freiné la transition. Mais chaque action compte : vous avez sensibilisé des élèves qui porteront ces valeurs ailleurs.",
      famille:
        "L'établissement de vos enfants reste très dépendant des outils propriétaires. Les données familiales transitent par des serveurs américains. Mais votre vigilance a permis d'ouvrir le débat : d'autres parents s'interrogent maintenant.",
      collectivite:
        "L'établissement n'a pas atteint l'autonomie numérique espérée. Les licences coûteuses continuent de peser sur les finances publiques. Mais les discussions engagées ont posé les bases d'une réflexion plus large au niveau du territoire.",
      autre:
        "Le chemin vers un numérique responsable est encore long pour cet établissement. Mais chaque action, chaque sensibilisation, chaque question posée fait avancer la réflexion collective. Le changement prend du temps.",
    },
  },
  transition: {
    title: "🔄 Établissement en Transition",
    descriptions: {
      eleve:
        "Ton établissement est sur la bonne voie ! Certains postes tournent sous Linux, des logiciels libres sont utilisés au quotidien, et les élèves sont de plus en plus sensibilisés. Continue de porter ces valeurs, tu es un·e acteur·rice du changement !",
      enseignant:
        "L'établissement a entamé sa mue numérique. Les pratiques évoluent, les mentalités changent. Il reste du chemin mais les bases sont solides. Vos collègues regardent désormais les alternatives libres avec intérêt.",
      famille:
        "L'établissement de vos enfants prend le virage du numérique responsable. Les données sont mieux protégées, le matériel dure plus longtemps. Votre implication a contribué à ce changement de cap.",
      collectivite:
        "L'établissement avance vers plus d'autonomie numérique. Les économies réalisées sur les licences permettent de financer d'autres projets. Un modèle qui pourrait inspirer d'autres établissements du territoire.",
      autre:
        "L'établissement est en pleine transition. Les vieilles habitudes cèdent peu à peu la place à des pratiques plus responsables. Le mouvement est lancé, il faut maintenant l'accompagner sur la durée.",
    },
  },
  resistant: {
    title: "🏆 Village Numérique Résistant",
    descriptions: {
      eleve:
        "Bravo ! Ton établissement est devenu un véritable Village Numérique Résistant ! Linux sur les postes, logiciels libres au quotidien, réemploi du matériel, élèves ambassadeurs... Tu as prouvé que les jeunes peuvent transformer le système de l'intérieur !",
      enseignant:
        "Félicitations ! L'établissement est désormais un modèle de numérique responsable. Vos élèves maîtrisent les outils libres, le matériel est choyé et réparé, les données sont protégées. Vous avez créé un écosystème vertueux !",
      famille:
        "Victoire ! L'établissement de vos enfants est devenu exemplaire. Fini les abonnements ruineux et les données qui fuient. Place à un numérique sobre, éthique et inclusif. Votre engagement parental a payé !",
      collectivite:
        "Mission accomplie ! L'établissement est devenu un Village Numérique Résistant, un modèle pour tout le territoire. Les économies réalisées sont réinvesties dans des projets pédagogiques. D'autres collectivités viennent s'inspirer de votre réussite.",
      autre:
        "L'établissement a réussi sa transformation ! Il prouve qu'un autre numérique est possible : inclusif, responsable et durable. Un exemple inspirant pour tous les établissements qui veulent résister à l'emprise des Big Tech.",
    },
  },
};

/**
 * Génère le résultat de fin de partie
 */
export function getEnding(
  category: EndingCategory,
  profile: PlayerProfile
): GameEnding {
  const ending = ENDINGS[category];
  return {
    category,
    title: ending.title,
    description: ending.descriptions[profile],
  };
}

/**
 * Textes adaptés au profil pour le tutoriel et les bilans
 */
export const PROFILE_TEXTS: Record<PlayerProfile, { 
  establishment: string; 
  possessive: string;
  youAre: string;
}> = {
  eleve: {
    establishment: "ton lycée",
    possessive: "ton",
    youAre: "un·e élève engagé·e",
  },
  enseignant: {
    establishment: "votre établissement",
    possessive: "votre",
    youAre: "un·e enseignant·e moteur",
  },
  famille: {
    establishment: "l'établissement de vos enfants",
    possessive: "votre",
    youAre: "un parent impliqué",
  },
  collectivite: {
    establishment: "l'établissement",
    possessive: "votre",
    youAre: "un·e décideur·se engagé·e",
  },
  autre: {
    establishment: "l'établissement",
    possessive: "votre",
    youAre: "un·e citoyen·ne engagé·e",
  },
};

/**
 * Textes du tutoriel
 */
export const TUTORIAL_SLIDES = [
  {
    title: "Bienvenue dans le Village Numérique Résistant !",
    content: `Tu incarnes une équipe qui veut transformer un établissement scolaire très dépendant des Big Tech en un **Village Numérique Résistant**.

L'objectif ? Prouver qu'un autre numérique est possible : **Inclusif, Responsable et Durable** (NIRD).`,
    icon: "🏰",
  },
  {
    title: "Les 3 piliers du NIRD",
    content: `**Inclusion** 👥 : Un numérique accessible à tous, qui réduit les inégalités.

**Responsabilité** 🛡️ : Des logiciels libres, des données protégées, une éthique respectée.

**Durabilité** 🌱 : Sobriété, réemploi, réparation. Contre l'obsolescence programmée.`,
    icon: "🎯",
  },
  {
    title: "Ta mission",
    content: `Tu as **4 années scolaires** pour transformer l'établissement.

Chaque année :
1. **Choisis une priorité** (Inclusion, Responsabilité ou Durabilité)
2. **Joue 3 cartes d'action** dans les différentes zones
3. **Réagis à un événement** imprévu

Attention à ton **budget** et à l'**énergie** de ton équipe !`,
    icon: "🎮",
  },
  {
    title: "Les indicateurs",
    content: `Tu dois gérer 6 jauges :
- **Inclusion, Responsabilité, Durabilité** → à faire monter !
- **Dépendance Big Tech** → à faire baisser !
- **Budget** → ne tombe pas à 0 !
- **Énergie** → ton équipe a besoin de souffler !

À la fin, ton score déterminera si tu as créé un vrai Village Résistant... ou si les Big Tech ont gagné.`,
    icon: "📊",
  },
];
