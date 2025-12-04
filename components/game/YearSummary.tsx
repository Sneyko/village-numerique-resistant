// Résumé de fin d'année
import { motion } from "framer-motion";
import { BarChart3, Lightbulb } from "lucide-react";
import { IndicatorKey, INDICATORS_CONFIG, HistoryEntry } from "../../game/types";
import { IndicatorsPanel } from "./IndicatorsPanel";
import { GameIcon, GameIconName } from "./GameIcon";

interface YearSummaryProps {
  year: number;
  indicators: Record<IndicatorKey, number>;
  history: HistoryEntry[];
  onContinue: () => void;
  isLastYear: boolean;
}

export function YearSummary({
  year,
  indicators,
  history,
  onContinue,
  isLastYear,
}: YearSummaryProps) {
  // Récupérer les entrées de cette année
  const yearEntries = history.filter((h) => h.year === year);

  // Calculer les deltas totaux de l'année
  const yearDelta = yearEntries.reduce((acc, entry) => {
    Object.entries(entry.delta).forEach(([key, value]) => {
      const k = key as IndicatorKey;
      acc[k] = (acc[k] || 0) + (value as number);
    });
    return acc;
  }, {} as Partial<Record<IndicatorKey, number>>);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-8"
      >
        <motion.span
          className="block mb-4"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.5 }}
        >
          <BarChart3 className="w-16 h-16 text-purple-400 mx-auto" />
        </motion.span>
        <h2 className="text-3xl font-bold text-white mb-2">
          Bilan de l'année {year}
        </h2>
        <p className="text-zinc-400">
          {isLastYear
            ? "Dernière année de votre mandat !"
            : `Préparation de l'année ${year + 1}`}
        </p>
      </motion.div>

      {/* Indicators with deltas */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <h3 className="text-lg font-semibold text-zinc-300 mb-4">
          État des indicateurs
        </h3>
        <IndicatorsPanel indicators={indicators} showDelta={yearDelta} />
      </motion.div>

      {/* Actions taken this year */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <h3 className="text-lg font-semibold text-zinc-300 mb-4">
          Actions réalisées
        </h3>
        <div className="space-y-2">
          {yearEntries.map((entry, i) => (
            <motion.div
              key={i}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800"
            >
              <div className="flex items-start justify-between gap-4">
                <p className="text-zinc-300">{entry.description}</p>
                <div className="flex flex-wrap gap-1 shrink-0">
                  {Object.entries(entry.delta).map(([key, val]) => {
                    const value = val as number;
                    if (value === 0) return null;
                    const config = INDICATORS_CONFIG.find((i) => i.key === key);
                    if (!config) return null;
                    const isPositive = config.isNegative ? value < 0 : value > 0;

                    return (
                      <span
                        key={key}
                        className={`text-xs px-1.5 py-0.5 rounded flex items-center gap-1 ${
                          isPositive
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        <GameIcon name={config.icon as GameIconName} size={10} /> {value > 0 ? "+" : ""}{value}
                      </span>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Analysis */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 mb-8"
      >
        <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-400" /> Analyse NIRD
        </h3>
        <p className="text-zinc-300 text-sm leading-relaxed">
          {getYearAnalysis(indicators, year)}
        </p>
      </motion.div>

      {/* Continue button */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center"
      >
        <button
          onClick={onContinue}
          className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 
                     text-white font-semibold text-lg transition-colors"
        >
          {isLastYear ? "Voir le bilan final →" : `Passer à l'année ${year + 1} →`}
        </button>
      </motion.div>
    </motion.div>
  );
}

function getYearAnalysis(indicators: Record<IndicatorKey, number>, year: number): string {
  const avgPositive = (indicators.inclusion + indicators.responsabilite + indicators.durabilite) / 3;
  const dependance = indicators.dependance;
  
  if (avgPositive >= 70 && dependance <= 30) {
    return `Excellente année ${year} ! Votre établissement progresse rapidement vers l'autonomie numérique. Les bonnes pratiques se diffusent et la communauté s'approprie les outils libres.`;
  }
  
  if (avgPositive >= 50 && dependance <= 50) {
    return `Année ${year} encourageante. La transition est en cours, avec des avancées notables. Continuez à équilibrer les différents axes NIRD pour consolider ces progrès.`;
  }
  
  if (dependance >= 70) {
    return `Année ${year} difficile. La dépendance aux géants du numérique reste forte. Privilégiez les actions qui renforcent l'autonomie et réduisent cette dépendance.`;
  }
  
  return `Année ${year} mitigée. Des progrès ont été faits, mais des défis persistent. Analysez les indicateurs en difficulté pour orienter vos prochaines actions.`;
}
