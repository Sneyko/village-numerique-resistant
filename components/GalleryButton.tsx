import React from "react";

export function GalleryButton() {
  return (
    <a
      href="/galerie"
      className="
        inline-flex items-center justify-center gap-2
        rounded-lg border border-gray-600
        bg-gray-800/50 backdrop-blur-sm
        text-gray-300 font-medium
        px-6 py-3
        transition-all duration-300
        hover:bg-gray-700/50 hover:border-gray-500
        hover:text-white
      "
    >
      <span>🖼️</span>
      <span>Voir la galerie</span>
    </a>
  );
}
