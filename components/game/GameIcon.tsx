// Mapping des icônes du jeu vers Lucide React
import { 
  Users, Shield, Leaf, Link2, Coins, Zap,
  Monitor, BookOpen, Backpack, Building2,
  GraduationCap, User, Home, Star,
  Castle, Gamepad2, ClipboardList, Calendar,
  Brain, PartyPopper, Lightbulb, Bolt,
  BarChart3, FileText, Copy, Check,
  RefreshCw, Globe, Trophy, ArrowRightLeft, Link,
  Target, Sparkles
} from "lucide-react";

export type GameIconName = 
  // Indicateurs
  | "inclusion" | "responsabilite" | "durabilite" | "dependance" | "budget" | "energie"
  // Zones
  | "infra" | "pedago" | "vie" | "gouv"
  // Profils
  | "eleve" | "enseignant" | "famille" | "collectivite" | "autre"
  // UI
  | "castle" | "gamepad" | "clipboard" | "calendar" | "brain" | "party" | "lightbulb"
  | "bolt" | "chart" | "document" | "copy" | "check" | "refresh" | "globe"
  | "trophy" | "transition" | "chains" | "target" | "sparkles"
  | "optionA" | "optionB" | "optionC";

interface GameIconProps {
  name: GameIconName;
  className?: string;
  size?: number;
}

const ICON_MAP: Record<GameIconName, React.ComponentType<{ className?: string; size?: number }>> = {
  // Indicateurs NIRD
  inclusion: Users,
  responsabilite: Shield,
  durabilite: Leaf,
  dependance: Link,
  budget: Coins,
  energie: Zap,
  
  // Zones
  infra: Monitor,
  pedago: BookOpen,
  vie: Backpack,
  gouv: Building2,
  
  // Profils
  eleve: GraduationCap,
  enseignant: User,
  famille: Home,
  collectivite: Building2,
  autre: Star,
  
  // UI éléments
  castle: Castle,
  gamepad: Gamepad2,
  clipboard: ClipboardList,
  calendar: Calendar,
  brain: Brain,
  party: PartyPopper,
  lightbulb: Lightbulb,
  bolt: Bolt,
  chart: BarChart3,
  document: FileText,
  copy: Copy,
  check: Check,
  refresh: RefreshCw,
  globe: Globe,
  trophy: Trophy,
  transition: ArrowRightLeft,
  chains: Link,
  target: Target,
  sparkles: Sparkles,
  
  // Options de choix
  optionA: ({ className, size }) => <span className={className} style={{ fontSize: size }}>A</span>,
  optionB: ({ className, size }) => <span className={className} style={{ fontSize: size }}>B</span>,
  optionC: ({ className, size }) => <span className={className} style={{ fontSize: size }}>C</span>,
};

export function GameIcon({ name, className = "", size = 20 }: GameIconProps) {
  const IconComponent = ICON_MAP[name];
  
  if (!IconComponent) {
    console.warn(`Unknown icon: ${name}`);
    return <Star className={className} size={size} />;
  }
  
  return <IconComponent className={className} size={size} />;
}

// Helper pour obtenir l'icône d'un indicateur
export function getIndicatorIcon(key: string): GameIconName {
  const map: Record<string, GameIconName> = {
    inclusion: "inclusion",
    responsabilite: "responsabilite", 
    durabilite: "durabilite",
    dependance: "dependance",
    budget: "budget",
    energie: "energie",
  };
  return map[key] || "sparkles";
}

// Helper pour obtenir l'icône d'une zone
export function getZoneIcon(key: string): GameIconName {
  const map: Record<string, GameIconName> = {
    infra: "infra",
    pedago: "pedago",
    vie: "vie",
    gouv: "gouv",
  };
  return map[key] || "sparkles";
}

// Helper pour obtenir l'icône d'un profil
export function getProfileIcon(key: string): GameIconName {
  const map: Record<string, GameIconName> = {
    eleve: "eleve",
    enseignant: "enseignant",
    famille: "famille",
    collectivite: "collectivite",
    autre: "autre",
  };
  return map[key] || "autre";
}
