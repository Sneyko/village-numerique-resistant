import React from "react";

interface GetStartedButtonProps {
  href: string;
  text?: string;
  className?: string;
}

export function GetStartedButton({
  href,
  text = "Commencer",
  className = "",
}: GetStartedButtonProps) {
  return (
    <a
      href={href}
      className={`
        inline-flex items-center justify-center
        rounded-lg border border-purple-500/50
        bg-purple-500/10 backdrop-blur-sm
        text-purple-300 font-semibold
        transition-all duration-300
        hover:bg-purple-500/20 hover:border-purple-400
        hover:text-white hover:scale-105
        px-6
        ${className}
      `}
    >
      {text}
    </a>
  );
}
