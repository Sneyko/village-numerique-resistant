import React from "react";

const techs = [
  { name: "Linux", icon: "🐧", color: "hover:border-yellow-500/50 hover:text-yellow-300" },
  { name: "LibreOffice", icon: "📄", color: "hover:border-green-500/50 hover:text-green-300" },
  { name: "Firefox", icon: "🦊", color: "hover:border-orange-500/50 hover:text-orange-300" },
  { name: "Nextcloud", icon: "☁️", color: "hover:border-blue-500/50 hover:text-blue-300" },
  { name: "GIMP", icon: "🎨", color: "hover:border-gray-400/50 hover:text-gray-200" },
];

export function Techs() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
      {/* Logo NIRD en vedette */}
      <div className="flex items-center gap-3 rounded-xl border-2 border-purple-500/30 bg-purple-500/10 px-4 py-2.5 transition-all hover:border-purple-400/50 hover:bg-purple-500/20 hover:scale-105">
        <img 
          src="/img/logo.png" 
          alt="NIRD" 
          className="h-6 w-auto"
        />
        <span className="font-semibold text-purple-300">NIRD</span>
      </div>
      
      {/* Autres techs */}
      {techs.map((tech) => (
        <div
          key={tech.name}
          className={`flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-800/50 px-3 py-2 text-sm text-gray-300 transition-all hover:scale-105 ${tech.color}`}
        >
          <span>{tech.icon}</span>
          <span>{tech.name}</span>
        </div>
      ))}
    </div>
  );
}
