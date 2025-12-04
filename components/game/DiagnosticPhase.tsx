// Phase de diagnostic : choix de l'axe prioritaire NIRD
import { motion } from "framer-motion";
import { Users, Shield, Leaf, ClipboardList } from "lucide-react";
import { PriorityAxis } from "../../game/types";

interface DiagnosticPhaseProps {
  onSelect: (axis: PriorityAxis) => void;
}

interface AxisConfig {
  key: PriorityAxis;
  label: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  benefits: string[];
}

const NIRD_AXES: AxisConfig[] = [
  {
    key: "inclusion",
    label: "Inclusion",
    icon: <Users className="w-10 h-10" />,
    color: "#10b981",
    description: "Un numérique accessible à tous",
    benefits: [
      "Formation pour tous les niveaux",
      "Réduction des inégalités numériques",
      "Interfaces adaptées et accessibles",
    ],
  },
  {
    key: "responsabilite",
    label: "Responsabilité",
    icon: <Shield className="w-10 h-10" />,
    color: "#8b5cf6",
    description: "Protection des données et éthique",
    benefits: [
      "Logiciels libres et transparents",
      "Données hébergées localement",
      "Respect de la vie privée",
    ],
  },
  {
    key: "durabilite",
    label: "Durabilité",
    icon: <Leaf className="w-10 h-10" />,
    color: "#06b6d4",
    description: "Sobriété et réemploi",
    benefits: [
      "Matériel reconditionné privilégié",
      "Réparation avant remplacement",
      "Empreinte carbone réduite",
    ],
  },
];

export function DiagnosticPhase({ onSelect }: DiagnosticPhaseProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
          <ClipboardList className="w-8 h-8 text-purple-400" /> Phase de diagnostic
        </h2>
        <p className="text-zinc-400 max-w-xl mx-auto">
          Avant de commencer votre mandat de 4 ans, identifiez l'axe prioritaire NIRD
          sur lequel vous souhaitez concentrer vos efforts. Cet axe bénéficiera
          d'un bonus de +10% sur toutes les améliorations.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {NIRD_AXES.map((axis, i) => (
          <motion.button
            key={axis.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(axis.key)}
            className="relative p-6 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-800 
                       border border-zinc-700 hover:border-emerald-500/50 
                       text-left transition-all duration-300 group overflow-hidden"
          >
            {/* Glow effect */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at center, ${axis.color}, transparent 70%)`,
              }}
            />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <span style={{ color: axis.color }}>{axis.icon}</span>
                <div>
                  <h3
                    className="text-xl font-bold"
                    style={{ color: axis.color }}
                  >
                    {axis.label}
                  </h3>
                  <p className="text-sm text-zinc-500">{axis.description}</p>
                </div>
              </div>

              <ul className="space-y-2">
                {axis.benefits.map((benefit, j) => (
                  <li
                    key={j}
                    className="flex items-center gap-2 text-sm text-zinc-300"
                  >
                    <span className="text-emerald-500 text-xs">●</span>
                    {benefit}
                  </li>
                ))}
              </ul>

              <div className="mt-4 pt-4 border-t border-zinc-700">
                <span className="text-xs text-emerald-400 font-medium">
                  Bonus : +10% sur {axis.label.toLowerCase()}
                </span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}