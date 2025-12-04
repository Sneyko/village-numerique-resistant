import React from "react";

// Utilitaire cn simplifié (équivalent de clsx + twMerge)
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

type NirdButtonVariant = "glitch" | "primary" | "outline" | "danger";

interface NirdButtonProps {
  children: React.ReactNode;
  variant?: NirdButtonVariant;
  href?: string;
  onClick?: () => void;
  className?: string;
  shine?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  target?: string;
  rel?: string;
}

// Effet de texte Glitch (double texte qui slide)
function TextGlitch({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden">
      <span className="invisible">{children}</span>
      <span className="absolute left-0 top-0 font-semibold transition-transform duration-500 ease-in-out group-hover:-translate-y-full">
        {children}
      </span>
      <span className="absolute left-0 top-0 translate-y-full font-semibold transition-transform duration-500 ease-in-out group-hover:translate-y-0">
        {children}
      </span>
    </div>
  );
}

// Animation Brightness (barre lumineuse qui traverse)
function ShineEffect() {
  return (
    <div className="absolute inset-0 flex h-full w-full justify-center overflow-hidden">
      <div 
        className="relative h-full w-8 bg-white/30 blur-sm"
        style={{
          animation: "brightness 2.2s linear infinite",
        }}
      />
      <style>{`
        @keyframes brightness {
          0% {
            transform: skewX(-13deg) translateX(-400%);
          }
          100% {
            transform: skewX(-13deg) translateX(400%);
          }
        }
      `}</style>
    </div>
  );
}

// Styles par variante
const variantStyles: Record<NirdButtonVariant, string> = {
  glitch: `
    bg-gray-900/90 text-white border border-gray-700
    hover:bg-gray-800 hover:border-purple-500/50
    hover:shadow-lg hover:shadow-purple-500/20
  `,
  primary: `
    bg-gradient-to-r from-green-600 to-emerald-600 text-white border border-green-500/30
    hover:from-green-500 hover:to-emerald-500
    hover:shadow-lg hover:shadow-green-500/30
  `,
  outline: `
    bg-transparent text-purple-400 border-2 border-purple-500/50
    hover:bg-purple-500/10 hover:border-purple-400 hover:text-purple-300
    hover:shadow-lg hover:shadow-purple-500/20
  `,
  danger: `
    bg-gradient-to-r from-red-600 to-orange-600 text-white border border-red-500/30
    hover:from-red-500 hover:to-orange-500
    hover:shadow-lg hover:shadow-red-500/30
  `,
};

export function NirdButton({
  children,
  variant = "glitch",
  href,
  onClick,
  className,
  shine = true,
  disabled = false,
  type = "button",
  target,
  rel,
}: NirdButtonProps) {
  const baseStyles = `
    group relative inline-flex justify-center items-center gap-2
    overflow-hidden rounded-xl px-6 py-3
    text-sm font-semibold
    backdrop-blur-sm
    transition-all duration-300 ease-out
    hover:scale-[1.02]
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
  `;

  const combinedClassName = cn(baseStyles, variantStyles[variant], className);

  const content = (
    <>
      {shine && <ShineEffect />}
      <span className="relative z-10">
        <TextGlitch>{children}</TextGlitch>
      </span>
    </>
  );

  // Si href est fourni, utiliser un lien
  if (href) {
    return (
      <a
        href={href}
        className={combinedClassName}
        target={target}
        rel={rel || (target === "_blank" ? "noopener noreferrer" : undefined)}
      >
        {content}
      </a>
    );
  }

  // Sinon, utiliser un bouton
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClassName}
    >
      {content}
    </button>
  );
}

// Export des variantes pour faciliter l'utilisation
export const NirdButtonVariants = {
  GLITCH: "glitch" as const,
  PRIMARY: "primary" as const,
  OUTLINE: "outline" as const,
  DANGER: "danger" as const,
};
