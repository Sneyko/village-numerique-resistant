import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Flame,
  FileText,
  Play,
  X,
  Shield,
  Zap,
  Swords,
  Palette,
  Mail,
  Tv,
  MessageCircle,
  Sparkles,
  Code2,
  Cloud,
  Mic,
  Monitor,
  Chrome,
  Paperclip,
  PlayCircle,
  PaintBucket,
  MailOpen,
  Youtube,
  MessageSquare,
  Laptop,
  CloudCog,
  Music,
  Lightbulb,
} from "lucide-react";

// ============================================================
// DATA : L'ARSENAL DE LA RÉSISTANCE
// ============================================================

interface Tool {
  id: string;
  name: string;
  icon: React.ReactNode;
  enemy: string;
  enemyIcon: React.ReactNode;
  classe: string;
  power: string;
  powerDescription: string;
  description: string;
  color: string;
  stats: {
    liberte: number;
    securite: number;
    durabilite: number;
  };
}

const ARSENAL_TOOLS: Tool[] = [
  {
    id: "linux-mint",
    name: "Linux Mint",
    icon: <Terminal className="w-8 h-8" />,
    enemy: "Microsoft Windows",
    enemyIcon: <Monitor className="w-5 h-5" />,
    classe: "Système d'Exploitation Libre",
    power: "Immunité à l'Obsolescence",
    powerDescription: "Fait tourner des PC de 2012",
    description:
      "Le bouclier ultime. Rapide, sécurisé et respectueux de ta vie privée. Il ne t'espionne pas, il t'obéit.",
    color: "#87cf3e",
    stats: { liberte: 100, securite: 95, durabilite: 100 },
  },
  {
    id: "firefox",
    name: "Mozilla Firefox",
    icon: <Flame className="w-8 h-8" />,
    enemy: "Google Chrome",
    enemyIcon: <Chrome className="w-5 h-5" />,
    classe: "Navigateur Furtif",
    power: "Bloqueur de Mouchards",
    powerDescription: "Protection anti-tracking intégrée",
    description:
      "Le renard qui mord les cookies des GAFAM. Garde ton historique pour toi, pas pour les pubs ciblées.",
    color: "#ff7139",
    stats: { liberte: 95, securite: 90, durabilite: 85 },
  },
  {
    id: "libreoffice",
    name: "LibreOffice",
    icon: <FileText className="w-8 h-8" />,
    enemy: "Microsoft Office 365",
    enemyIcon: <Paperclip className="w-5 h-5" />,
    classe: "Suite Bureautique Indépendante",
    power: "Format Ouvert",
    powerDescription: "Pas d'abonnement mensuel",
    description:
      "Pourquoi louer tes outils de travail ? Écris, calcule et présente sans jamais payer de rançon à l'Empire.",
    color: "#18a303",
    stats: { liberte: 100, securite: 85, durabilite: 95 },
  },
  {
    id: "vlc",
    name: "VLC Media Player",
    icon: <Play className="w-8 h-8" />,
    enemy: "Windows Media Player",
    enemyIcon: <PlayCircle className="w-5 h-5" />,
    classe: "Lecteur Universel",
    power: "Lecture Absolue",
    powerDescription: "Lit tous les formats, même cassés",
    description:
      "Le cône de chantier le plus célèbre du monde. Il ne pose pas de questions, il joue ta vidéo. Point.",
    color: "#ff8800",
    stats: { liberte: 100, securite: 80, durabilite: 100 },
  },
  {
    id: "gimp",
    name: "GIMP",
    icon: <Palette className="w-8 h-8" />,
    enemy: "Adobe Photoshop",
    enemyIcon: <PaintBucket className="w-5 h-5" />,
    classe: "Manipulateur de Pixels",
    power: "Licence Perpétuelle",
    powerDescription: "Coût : 0€ à vie vs 24€/mois",
    description:
      "Pourquoi louer tes pinceaux ? GIMP te donne toute la puissance graphique sans racketter ton compte en banque.",
    color: "#5c5543",
    stats: { liberte: 100, securite: 85, durabilite: 95 },
  },
  {
    id: "thunderbird",
    name: "Thunderbird",
    icon: <Mail className="w-8 h-8" />,
    enemy: "Microsoft Outlook",
    enemyIcon: <MailOpen className="w-5 h-5" />,
    classe: "Gardien des Correspondances",
    power: "Coffre-fort Local",
    powerDescription: "Tes mails sont chez toi, pas scannés pour de la pub",
    description:
      "L'oiseau tonnerre qui foudroie les traceurs publicitaires. Gère tes mails sans que Google lise par-dessus ton épaule.",
    color: "#0a84ff",
    stats: { liberte: 95, securite: 95, durabilite: 90 },
  },
  {
    id: "peertube",
    name: "PeerTube",
    icon: <Tv className="w-8 h-8" />,
    enemy: "YouTube (Google)",
    enemyIcon: <Youtube className="w-5 h-5" />,
    classe: "Architecte Décentralisé",
    power: "Zéro Algorithme Toxique",
    powerDescription: "Tu regardes ce que TU veux, pas ce qui t'énerve",
    description:
      "La vidéo sans la surveillance. Ici, pas de pub intrusive ni de terrier de lapin radicalisant. Juste du contenu.",
    color: "#f1680d",
    stats: { liberte: 100, securite: 90, durabilite: 85 },
  },
  {
    id: "signal",
    name: "Signal",
    icon: <MessageCircle className="w-8 h-8" />,
    enemy: "WhatsApp (Meta)",
    enemyIcon: <MessageSquare className="w-5 h-5" />,
    classe: "Agent Secret",
    power: "Chiffrement Absolu",
    powerDescription: "Même eux ne savent pas ce que tu dis",
    description:
      "Ce qui se passe sur Signal reste sur Signal. Meta n'a pas besoin de savoir à quelle heure tu sors de cours.",
    color: "#3a76f0",
    stats: { liberte: 100, securite: 100, durabilite: 90 },
  },
  {
    id: "zorin",
    name: "Zorin OS",
    icon: <Sparkles className="w-8 h-8" />,
    enemy: "Windows 11",
    enemyIcon: <Monitor className="w-5 h-5" />,
    classe: "Caméléon",
    power: "Interface Familière",
    powerDescription: "Ressemble à Windows, mais en mieux",
    description:
      "La porte d'entrée idéale. C'est comme Windows, mais en plus rapide, plus sûr, et sans mouchards.",
    color: "#15a6f0",
    stats: { liberte: 100, securite: 95, durabilite: 95 },
  },
  {
    id: "vscodium",
    name: "VSCodium",
    icon: <Code2 className="w-8 h-8" />,
    enemy: "VS Code (Microsoft)",
    enemyIcon: <Laptop className="w-5 h-5" />,
    classe: "Forge Purifiée",
    power: "Zéro Télémétrie",
    powerDescription: "Même IDE, sans les espions",
    description:
      "C'est VS Code, mais sans les mouchards de Microsoft. Code en paix, personne ne regarde par-dessus ton épaule.",
    color: "#2f80ed",
    stats: { liberte: 100, securite: 95, durabilite: 90 },
  },
  {
    id: "nextcloud",
    name: "Nextcloud",
    icon: <Cloud className="w-8 h-8" />,
    enemy: "Google Drive / OneDrive",
    enemyIcon: <CloudCog className="w-5 h-5" />,
    classe: "Nuage Souverain",
    power: "Données à la Maison",
    powerDescription: "Tes fichiers restent chez toi",
    description:
      "Tes fichiers restent dans ton école, pas sur des serveurs américains. Partage, collabore et garde le contrôle total.",
    color: "#0082c9",
    stats: { liberte: 100, securite: 100, durabilite: 95 },
  },
  {
    id: "audacity",
    name: "Audacity",
    icon: <Mic className="w-8 h-8" />,
    enemy: "Adobe Audition",
    enemyIcon: <Music className="w-5 h-5" />,
    classe: "Maître des Ondes",
    power: "Édition Sonore Libre",
    powerDescription: "Studio pro, 0€",
    description:
      "Le studio d'enregistrement de la résistance. Coupe, mixe et exporte tes sons sans payer d'abonnement mensuel.",
    color: "#ffcc00",
    stats: { liberte: 100, securite: 85, durabilite: 100 },
  },
];

// ============================================================
// COMPOSANTS
// ============================================================

// Barre de progression stylée
function StatBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-zinc-400 uppercase tracking-wider">{label}</span>
        <span className="text-zinc-300 font-mono">{value}%</span>
      </div>
      <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        />
      </div>
    </div>
  );
}

// Carte d'outil dans la grille
function ToolCard({ tool, onClick }: { tool: Tool; onClick: () => void }) {
  return (
    <motion.button
      layoutId={`card-${tool.id}`}
      onClick={onClick}
      className="group relative p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 
                 hover:border-zinc-600 text-left transition-colors duration-300
                 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
      whileHover={{ 
        scale: 1.02,
        boxShadow: `0 0 30px ${tool.color}20`,
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Glow effect on hover */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${tool.color}10, transparent 70%)`,
        }}
      />

      {/* Icon */}
      <motion.div
        layoutId={`icon-${tool.id}`}
        className="w-16 h-16 rounded-xl flex items-center justify-center mb-4"
        style={{ 
          backgroundColor: `${tool.color}20`,
          color: tool.color,
        }}
      >
        {tool.icon}
      </motion.div>

      {/* Name */}
      <motion.h3
        layoutId={`name-${tool.id}`}
        className="text-xl font-bold text-white mb-2"
      >
        {tool.name}
      </motion.h3>

      {/* Class badge */}
      <motion.span
        layoutId={`classe-${tool.id}`}
        className="inline-block px-3 py-1 text-xs rounded-full bg-zinc-800 text-zinc-400"
      >
        {tool.classe}
      </motion.span>

      {/* VS badge */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-zinc-500">
          <Swords className="w-4 h-4 text-red-500" />
          <span>VS {tool.enemy}</span>
        </div>
        
        {/* Hover indicator */}
        <span className="text-xs text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity">
          Voir →
        </span>
      </div>
    </motion.button>
  );
}

// Modale de détail
function ToolModal({ tool, onClose }: { tool: Tool; onClose: () => void }) {
  // Fermer avec Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <motion.div
          layoutId={`card-${tool.id}`}
          className="relative w-full max-w-lg bg-zinc-900/95 backdrop-blur-xl rounded-3xl 
                     border border-zinc-700 overflow-hidden pointer-events-auto"
          style={{
            boxShadow: `0 0 60px ${tool.color}30, 0 0 100px ${tool.color}10`,
          }}
        >
          {/* Neon border effect */}
          <div 
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              background: `linear-gradient(135deg, ${tool.color}20, transparent 50%, ${tool.color}10)`,
            }}
          />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 
                       text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Content */}
          <div className="relative p-8">
            {/* Header */}
            <div className="flex items-start gap-6 mb-6">
              <motion.div
                layoutId={`icon-${tool.id}`}
                className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ 
                  backgroundColor: `${tool.color}20`,
                  color: tool.color,
                  boxShadow: `0 0 30px ${tool.color}40`,
                }}
              >
                <div className="scale-125">{tool.icon}</div>
              </motion.div>

              <div className="flex-1">
                <motion.h2
                  layoutId={`name-${tool.id}`}
                  className="text-3xl font-black text-white mb-2"
                >
                  {tool.name}
                </motion.h2>
                <motion.span
                  layoutId={`classe-${tool.id}`}
                  className="inline-block px-4 py-1.5 text-sm rounded-full font-medium"
                  style={{ 
                    backgroundColor: `${tool.color}20`,
                    color: tool.color,
                  }}
                >
                  {tool.classe}
                </motion.span>
              </div>
            </div>

            {/* VS Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 mb-6"
            >
              <Swords className="w-6 h-6 text-red-500" />
              <div>
                <span className="text-red-400 text-sm font-medium">ENNEMI JURÉ</span>
                <p className="text-white font-bold flex items-center gap-2">
                  <span>{tool.enemyIcon}</span>
                  {tool.enemy}
                </p>
              </div>
            </motion.div>

            {/* Power */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-6"
            >
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-emerald-400" />
                <span className="text-emerald-400 text-sm font-medium">POUVOIR SPÉCIAL</span>
              </div>
              <p className="text-white font-bold text-lg">{tool.power}</p>
              <p className="text-zinc-400 text-sm">{tool.powerDescription}</p>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-zinc-300 leading-relaxed mb-6 italic"
            >
              "{tool.description}"
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-5 h-5 text-zinc-500" />
                <span className="text-zinc-400 text-sm font-medium uppercase tracking-wider">
                  Stats de Combat
                </span>
              </div>
              <StatBar label="Liberté" value={tool.stats.liberte} color={tool.color} />
              <StatBar label="Sécurité" value={tool.stats.securite} color="#8b5cf6" />
              <StatBar label="Durabilité" value={tool.stats.durabilite} color="#06b6d4" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

// ============================================================
// COMPOSANT PRINCIPAL
// ============================================================

export default function ArsenalSection() {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* ===== TRANSITION TOP - Blur fade from black ===== */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black via-black/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-24 backdrop-blur-sm z-10 pointer-events-none" 
           style={{ maskImage: 'linear-gradient(to bottom, black, transparent)' }} />

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950" />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Grid pattern fade in/out */}
      <div className="absolute inset-0 pointer-events-none"
           style={{ 
             background: 'linear-gradient(to bottom, black 0%, transparent 15%, transparent 85%, black 100%)',
           }} />

      {/* ===== TRANSITION BOTTOM - Blur fade to black ===== */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-24 backdrop-blur-sm z-10 pointer-events-none"
           style={{ maskImage: 'linear-gradient(to top, black, transparent)' }} />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 
                       border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6"
          >
            <Shield className="w-4 h-4" />
            <span>Équipe-toi pour la bataille</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4"
          >
            L'Arsenal de la{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Résistance
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 text-lg max-w-2xl mx-auto"
          >
            Clique sur chaque outil pour découvrir sa fiche d'identité et ses pouvoirs contre les GAFAM.
          </motion.p>
        </div>

        {/* Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {ARSENAL_TOOLS.map((tool) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              onClick={() => setSelectedTool(tool)}
            />
          ))}
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-zinc-600 text-sm mt-12 inline-flex items-center gap-2 justify-center w-full"
        >
          <Lightbulb className="w-4 h-4" /> Tous ces outils sont 100% gratuits, open-source et respectueux de ta vie privée.
        </motion.p>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedTool && (
          <ToolModal
            tool={selectedTool}
            onClose={() => setSelectedTool(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
