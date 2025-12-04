import React from "react";

interface ButtonGlitchBrightnessProps {
  href: string;
  text: string;
  className?: string;
  shine?: boolean;
}

export function ButtonGlitchBrightness({
  href,
  text,
  className = "",
  shine = true,
}: ButtonGlitchBrightnessProps) {
  return (
    <a
      href={href}
      className={`
        relative inline-flex items-center justify-center
        rounded-lg bg-gradient-to-r from-purple-600 to-pink-600
        text-white font-semibold
        transition-all duration-300
        hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50
        overflow-hidden
        ${className}
      `}
    >
      {shine && (
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
      )}
      <span className="relative z-10">{text}</span>
    </a>
  );
}
