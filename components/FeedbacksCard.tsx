import React from "react";
import { Dumbbell, School, UserCheck, GraduationCap, Lightbulb } from "lucide-react";

const feedbacks = [
  {
    quote: "Au lycée Carnot, on a sauvé des centaines de PC grâce au Libre ! Microsoft voulait qu'on jette tout, on a dit NON.",
    author: "Lycée Carnot",
    authorIcon: School,
    role: "Berceau du projet NIRD",
    icon: Dumbbell,
  },
  {
    quote: "Windows 11 voulait tuer mon ordi de 2016. Linux Mint l'a ressuscité. Il tourne mieux qu'avant !",
    author: "Un élève résistant",
    authorIcon: UserCheck,
    role: "Terminale STI2D",
    icon: Terminal,
  },
  {
    quote: "C'est facile, c'est gratuit, c'éthique. Pourquoi on payait 15 000€ de licences avant ?",
    author: "Un prof converti",
    authorIcon: GraduationCap,
    role: "Professeur de Technologie",
    icon: Lightbulb,
  },
];

import { Terminal } from "lucide-react";

export function FeedbacksCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
      {feedbacks.map((feedback, index) => {
        const Icon = feedback.icon;
        const AuthorIcon = feedback.authorIcon;
        return (
          <div
            key={index}
            className="group rounded-2xl border border-gray-700/50 bg-gray-900/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-green-500/40 hover:bg-gray-800/50 hover:scale-[1.02]"
          >
            <div className="text-4xl mb-4 text-green-400"><Icon className="w-10 h-10" /></div>
            <p className="mb-5 text-gray-300 leading-relaxed">
              "{feedback.quote}"
            </p>
            <div className="border-t border-gray-700/50 pt-4">
              <p className="font-bold text-green-400 inline-flex items-center gap-2"><AuthorIcon className="w-4 h-4" /> {feedback.author}</p>
              <p className="text-sm text-gray-500">{feedback.role}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
