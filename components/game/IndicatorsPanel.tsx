// Panneau des indicateurs
import { motion } from "framer-motion";
import { IndicatorKey, INDICATORS_CONFIG } from "../../game/types";

interface IndicatorsPanelProps {
  indicators: Record<IndicatorKey, number>;
  compact?: boolean;
  showDelta?: Partial<Record<IndicatorKey, number>>;
}

export function IndicatorsPanel({ indicators, compact, showDelta }: IndicatorsPanelProps) {
  if (compact) {
    return (
      <div className="flex flex-wrap gap-3 mt-2">
        {INDICATORS_CONFIG.map((config) => {
          const value = indicators[config.key];
          const delta = showDelta?.[config.key];
          
          return (
            <div
              key={config.key}
              className="flex items-center gap-2"
              title={config.description}
            >
              <span className="text-sm">{config.icon}</span>
              <div className="flex items-center gap-1">
                <div className="w-16 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: config.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <span className="text-xs text-zinc-400 w-8">{value}</span>
                {delta !== undefined && delta !== 0 && (
                  <span
                    className={`text-xs font-medium ${
                      (config.isNegative ? delta < 0 : delta > 0)
                        ? "text-emerald-400"
                        : "text-red-400"
                    }`}
                  >
                    {delta > 0 ? "+" : ""}{delta}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {INDICATORS_CONFIG.map((config) => {
        const value = indicators[config.key];
        const delta = showDelta?.[config.key];

        return (
          <motion.div
            key={config.key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">{config.icon}</span>
                <span className="text-sm font-medium text-zinc-300">
                  {config.label}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-white">{value}</span>
                {delta !== undefined && delta !== 0 && (
                  <span
                    className={`text-sm font-medium ${
                      (config.isNegative ? delta < 0 : delta > 0)
                        ? "text-emerald-400"
                        : "text-red-400"
                    }`}
                  >
                    {delta > 0 ? "+" : ""}{delta}
                  </span>
                )}
              </div>
            </div>
            
            {/* Barre de progression */}
            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full transition-all duration-500"
                style={{ backgroundColor: config.color }}
                initial={{ width: 0 }}
                animate={{ width: `${value}%` }}
              />
            </div>

            <p className="text-xs text-zinc-500 mt-2">{config.description}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
