import React from "react";
import { Moon } from "lucide-react";

export function AnimatedBadge() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-green-500/40 bg-green-500/10 px-4 py-2 text-sm font-medium">
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
      </span>
      <span className="text-green-300 inline-flex items-center gap-1.5"><Moon className="w-4 h-4" /> Nuit de l'Info 2025</span>
      <span className="text-gray-500">•</span>
      <span className="text-gray-400">Équipe : Beaucoup trop goatesque</span>
    </div>
  );
}
