import React from "react";

const pillars = [
  {
    title: "🤝 Inclusif pour tous",
    subtitle: "Zéro fracture numérique",
    description: "Pas de fracture numérique. Des outils accessibles à tous, sans abonnement coûteux ni licence hors de prix.",
    color: "from-blue-500 to-cyan-500",
    borderColor: "hover:border-blue-500/50",
  },
  {
    title: "🔒 Données Sécurisées",
    subtitle: "Stop au tracking",
    description: "Vos données restent en Europe, pas dans le Cloud des GAFAM. Reprenez le contrôle de votre vie privée.",
    color: "from-purple-500 to-pink-500",
    borderColor: "hover:border-purple-500/50",
  },
  {
    title: "♻️ Anti-Obsolescence",
    subtitle: "Ne jetez plus !",
    description: "Un PC de 2015 tourne parfaitement sous Linux. La planète vous remercie. 🌍",
    color: "from-green-500 to-emerald-500",
    borderColor: "hover:border-green-500/50",
  },
  {
    title: "🐧 100% Libre",
    subtitle: "Liberté totale",
    description: "Code ouvert, communauté mondiale, zéro dépendance. Vous êtes maître de votre outil.",
    color: "from-orange-500 to-yellow-500",
    borderColor: "hover:border-orange-500/50",
  },
];

export function ComponentsExample() {
  return (
    <div id="outils" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full max-w-7xl px-4">
      {pillars.map((pillar) => (
        <div
          key={pillar.title}
          className={`group relative rounded-2xl border border-gray-700/50 bg-gray-900/60 backdrop-blur-sm p-6 transition-all duration-300 ${pillar.borderColor} hover:bg-gray-800/60 hover:scale-[1.02] hover:shadow-xl`}
        >
          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${pillar.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
          <h3 className="mb-1 text-xl font-bold text-white">
            {pillar.title}
          </h3>
          <p className={`mb-3 text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r ${pillar.color}`}>
            {pillar.subtitle}
          </p>
          <p className="text-sm text-gray-400 leading-relaxed">{pillar.description}</p>
        </div>
      ))}
    </div>
  );
}
