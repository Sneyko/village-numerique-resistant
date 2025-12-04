// Sélection des actions par année
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Brain, Check } from "lucide-react";
import { ActionCard, ZoneKey, ZONES_CONFIG, INDICATORS_CONFIG } from "../../game/types";
import { GameIcon, GameIconName } from "./GameIcon";

interface ActionSelectionProps {
  year: number;
  availableCards: ActionCard[];
  selectedCards: ActionCard[];
  maxCards: number;
  onSelect: (card: ActionCard) => void;
  onQuizRequest: (card: ActionCard) => void;
  onValidate: () => void;
}

export function ActionSelection({
  year,
  availableCards,
  selectedCards,
  maxCards,
  onSelect,
  onQuizRequest,
  onValidate,
}: ActionSelectionProps) {
  const [activeZone, setActiveZone] = useState<ZoneKey | "all">("all");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const filteredCards =
    activeZone === "all"
      ? availableCards
      : availableCards.filter((c) => c.zone === activeZone);

  const isSelected = (card: ActionCard) =>
    selectedCards.some((c) => c.id === card.id);

  const canSelectMore = selectedCards.length < maxCards;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-6 h-6 text-purple-400" /> Année {year} — Choix des actions
          </h2>
          <p className="text-zinc-400">
            Sélectionnez jusqu'à {maxCards} actions pour cette année
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-zinc-400">
            {selectedCards.length}/{maxCards} actions
          </span>
          <button
            onClick={onValidate}
            disabled={selectedCards.length === 0}
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 
                       disabled:bg-zinc-700 disabled:text-zinc-500 
                       text-white font-medium transition-colors"
          >
            Valider l'année →
          </button>
        </div>
      </div>

      {/* Zone filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveZone("all")}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
            activeZone === "all"
              ? "bg-white text-zinc-900"
              : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
          }`}
        >
          Toutes
        </button>
        {ZONES_CONFIG.map((zone) => (
          <button
            key={zone.key}
            onClick={() => setActiveZone(zone.key)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-1 ${
              activeZone === zone.key
                ? "text-white"
                : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
            }`}
            style={
              activeZone === zone.key
                ? { backgroundColor: zone.color }
                : undefined
            }
          >
            {zone.label}
          </button>
        ))}
      </div>

      {/* Cards grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredCards.map((card) => {
            const zone = ZONES_CONFIG.find((z) => z.key === card.zone)!;
            const selected = isSelected(card);
            const isHovered = hoveredCard === card.id;

            return (
              <motion.div
                key={card.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`relative p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                  selected
                    ? "border-emerald-500 bg-emerald-500/10"
                    : "border-zinc-700 bg-zinc-900/80 hover:border-zinc-500"
                } ${!canSelectMore && !selected ? "opacity-50" : ""}`}
                onClick={() => {
                  if (selected || canSelectMore) {
                    onSelect(card);
                  }
                }}
              >
                {/* Zone badge */}
                <div
                  className="absolute top-3 right-3 px-2 py-0.5 rounded text-xs font-medium"
                  style={{ backgroundColor: zone.color + "30", color: zone.color }}
                >
                  {zone.label}
                </div>

                {/* Selected check */}
                {selected && (
                  <div className="absolute top-3 left-3 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}

                {/* Card content */}
                <h3 className="text-lg font-semibold text-white pr-16 mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-zinc-400 mb-4">{card.description}</p>

                {/* Effects preview */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {Object.entries(card.baseEffects).map(([key, val]) => {
                    const value = val as number;
                    if (value === 0) return null;
                    const config = INDICATORS_CONFIG.find((i) => i.key === key);
                    if (!config) return null;
                    const isPositive = config.isNegative ? value < 0 : value > 0;

                    return (
                      <span
                        key={key}
                        className={`text-xs px-2 py-0.5 rounded flex items-center gap-1 ${
                          isPositive
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        <GameIcon name={config.icon as GameIconName} size={12} /> {value > 0 ? "+" : ""}{value}
                      </span>
                    );
                  })}
                </div>

                {/* Quiz button */}
                {card.quiz && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuizRequest(card);
                    }}
                    className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1"
                  >
                    <Brain className="w-3 h-3" /> Quiz bonus disponible
                  </button>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filteredCards.length === 0 && (
        <div className="text-center py-12 text-zinc-500">
          Aucune carte disponible dans cette catégorie
        </div>
      )}
    </motion.div>
  );
}
