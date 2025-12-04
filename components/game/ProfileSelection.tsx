// Sélection du profil joueur
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { PlayerProfile, PROFILES_CONFIG } from "../../game/types";

interface ProfileSelectionProps {
  onSelect: (profile: PlayerProfile) => void;
  onClose?: () => void;
}

export function ProfileSelection({ onSelect, onClose }: ProfileSelectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen flex flex-col items-center justify-center p-6"
    >
      {/* Close button */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      )}

      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.1 }}
          className="text-6xl mb-4"
        >
          🏰
        </motion.div>
        <h1 className="text-3xl md:text-4xl font-black text-white mb-4">
          Le Village Numérique{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            Résistant
          </span>
        </h1>
        <p className="text-zinc-400 max-w-lg mx-auto">
          Transforme ton établissement scolaire en bastion du numérique libre !
          Commence par choisir ton rôle.
        </p>
      </div>

      {/* Profils */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
        {PROFILES_CONFIG.map((profile, index) => (
          <motion.button
            key={profile.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            onClick={() => onSelect(profile.key)}
            className="group p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 
                       hover:border-emerald-500/50 hover:bg-zinc-800/80
                       text-left transition-all duration-300
                       focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          >
            <div className="text-4xl mb-3">{profile.icon}</div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
              {profile.label}
            </h3>
            <p className="text-sm text-zinc-400">{profile.description}</p>
          </motion.button>
        ))}
      </div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-zinc-600 text-sm text-center"
      >
        🎮 Nuit de l'Info 2025 • Démarche NIRD
      </motion.p>
    </motion.div>
  );
}
