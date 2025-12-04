// Écran de fin de partie avec Plan NIRD personnalisé
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  GameState, 
  EndingCategory, 
  INDICATORS_CONFIG, 
  IndicatorKey,
  PROFILES_CONFIG
} from "../../game/types";
import { IndicatorsPanel } from "./IndicatorsPanel";

interface EndScreenProps {
  state: GameState;
  ending: {
    category: EndingCategory;
    title: string;
    description: string;
  };
  onRestart: () => void;
}

export function EndScreen({ state, ending, onRestart }: EndScreenProps) {
  const [copied, setCopied] = useState(false);

  const profile = state.profile ? PROFILES_CONFIG.find(p => p.key === state.profile) : null;

  // Générer le Plan NIRD personnalisé
  const planNIRD = generatePlanNIRD(state, ending);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(planNIRD);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCategoryColor = (category: EndingCategory) => {
    switch (category) {
      case "resistant": return "text-emerald-400";
      case "transition": return "text-amber-400";
      case "captif": return "text-red-400";
    }
  };

  const getCategoryEmoji = (category: EndingCategory) => {
    switch (category) {
      case "resistant": return "🏆";
      case "transition": return "🔄";
      case "captif": return "⛓️";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      {/* Header avec animation spéciale */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="text-center mb-10"
      >
        <motion.span
          className="text-7xl block mb-4"
          animate={{ 
            rotate: ending.category === "resistant" ? [0, -5, 5, 0] : 0,
            scale: ending.category === "resistant" ? [1, 1.1, 1] : 1
          }}
          transition={{ duration: 1, repeat: ending.category === "resistant" ? Infinity : 0, repeatDelay: 2 }}
        >
          {getCategoryEmoji(ending.category)}
        </motion.span>
        
        <h1 className={`text-4xl font-bold mb-3 ${getCategoryColor(ending.category)}`}>
          {ending.title}
        </h1>
        
        <p className="text-zinc-400 max-w-xl mx-auto">
          {ending.description}
        </p>

        {profile && (
          <p className="text-sm text-zinc-500 mt-4">
            Profil : {profile.icon} {profile.label}
          </p>
        )}
      </motion.div>

      {/* Stats finales */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <h3 className="text-lg font-semibold text-zinc-300 mb-4 text-center">
          📊 Bilan final après 4 ans
        </h3>
        <IndicatorsPanel indicators={state.indicators} />
      </motion.div>

      {/* Score résumé */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-3 gap-4 mb-8"
      >
        <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 text-center">
          <p className="text-3xl font-bold text-white">{state.playedCards.length}</p>
          <p className="text-sm text-zinc-500">Actions réalisées</p>
        </div>
        <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 text-center">
          <p className="text-3xl font-bold text-white">{state.history.length}</p>
          <p className="text-sm text-zinc-500">Événements traités</p>
        </div>
        <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 text-center">
          <p className={`text-3xl font-bold ${getCategoryColor(ending.category)}`}>
            {ending.category === "resistant" ? "A+" : ending.category === "transition" ? "B" : "C"}
          </p>
          <p className="text-sm text-zinc-500">Note NIRD</p>
        </div>
      </motion.div>

      {/* Plan NIRD personnalisé */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-zinc-300">
            📋 Votre Plan NIRD personnalisé
          </h3>
          <button
            onClick={handleCopy}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              copied
                ? "bg-emerald-600 text-white"
                : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            }`}
          >
            {copied ? "✓ Copié !" : "📋 Copier"}
          </button>
        </div>
        
        <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 font-mono text-sm">
          <pre className="whitespace-pre-wrap text-zinc-300 leading-relaxed">
            {planNIRD}
          </pre>
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <button
          onClick={onRestart}
          className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 
                     text-white font-semibold transition-colors"
        >
          🔄 Rejouer
        </button>
        <a
          href="https://nird.fr"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 
                     text-white font-semibold transition-colors text-center"
        >
          🌐 Découvrir NIRD
        </a>
      </motion.div>

      {/* Crédits */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center text-xs text-zinc-600 mt-12"
      >
        🎮 Village Numérique Résistant - Nuit de l'Info 2025
        <br />
        Équipe "Beaucoup trop goatesque" • Démarche NIRD
      </motion.p>
    </motion.div>
  );
}

function generatePlanNIRD(state: GameState, ending: { category: EndingCategory }): string {
  const profile = state.profile ? PROFILES_CONFIG.find(p => p.key === state.profile) : null;
  
  const lines: string[] = [
    "╔══════════════════════════════════════════════════════════╗",
    "║           PLAN NIRD PERSONNALISÉ                        ║",
    "║     Village Numérique Résistant - Nuit de l'Info 2025   ║",
    "╚══════════════════════════════════════════════════════════╝",
    "",
    `👤 Profil : ${profile?.label || "Non défini"}`,
    `📊 Résultat : ${ending.category.toUpperCase()}`,
    "",
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "📈 INDICATEURS FINAUX",
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
  ];

  INDICATORS_CONFIG.forEach(config => {
    const value = state.indicators[config.key];
    const bar = "█".repeat(Math.floor(value / 10)) + "░".repeat(10 - Math.floor(value / 10));
    lines.push(`${config.icon} ${config.label.padEnd(15)} [${bar}] ${value}%`);
  });

  lines.push("");
  lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  lines.push("✅ ACTIONS RÉALISÉES");
  lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  state.playedCards.forEach((card, i) => {
    lines.push(`${i + 1}. ${card.title}`);
  });

  lines.push("");
  lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  lines.push("🎯 RECOMMANDATIONS NIRD");
  lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  // Recommandations basées sur les indicateurs faibles
  const weakIndicators = INDICATORS_CONFIG.filter(config => {
    const value = state.indicators[config.key];
    if (config.isNegative) return value > 50;
    return value < 50;
  });

  if (weakIndicators.length > 0) {
    lines.push("Points à améliorer :");
    weakIndicators.forEach(config => {
      lines.push(`  • ${config.label} : ${getRecommendation(config.key)}`);
    });
  } else {
    lines.push("🏆 Excellent travail ! Continuez sur cette lancée.");
  }

  lines.push("");
  lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  lines.push("🌐 RESSOURCES");
  lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  lines.push("  • Site NIRD : https://nird.fr");
  lines.push("  • Framasoft : https://framasoft.org");
  lines.push("  • April : https://april.org");
  lines.push("");
  lines.push("══════════════════════════════════════════════════════════");
  lines.push("   Généré le " + new Date().toLocaleDateString("fr-FR"));
  lines.push("══════════════════════════════════════════════════════════");

  return lines.join("\n");
}

function getRecommendation(key: IndicatorKey): string {
  const recommendations: Record<IndicatorKey, string> = {
    inclusion: "Former davantage les utilisateurs aux outils numériques libres",
    responsabilite: "Renforcer la politique de protection des données",
    durabilite: "Privilégier le matériel reconditionné et l'allongement de durée de vie",
    dependance: "Migrer progressivement vers des alternatives libres",
    budget: "Optimiser les coûts avec des solutions open source",
    energie: "Réduire l'empreinte carbone du numérique"
  };
  return recommendations[key];
}
