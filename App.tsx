import React, { useState } from 'react';
import { HeroContent } from './components/HeroContent';
import { ComponentsSection } from './components/ComponentsSection';
import ArsenalSection from './components/ArsenalSection';
import { FeedbacksSection } from './components/FeedbacksSection';
import { SloganSection } from './components/SloganSection';
import ChatBruti from './components/ChatBruti';
import SecretSnake from './components/SecretSnake';
import GameRoot from './components/game/GameRoot';

export default function App() {
  const [showGame, setShowGame] = useState(false);

  return (
    <main className="min-h-screen bg-black overflow-x-hidden">
      <div className="container mx-auto px-4 py-10 space-y-32">
        <HeroContent />
        <ComponentsSection />
      </div>
      
      {/* Arsenal Section - Full width */}
      <ArsenalSection />

      {/* Section Jeu NIRD */}
      <section id="simulateur" className="py-20 px-4 bg-gradient-to-b from-black via-zinc-900/50 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            🎮 Simulateur NIRD
          </h2>
          <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto">
            Transformez un établissement captif des Big Tech en un véritable 
            <span className="text-emerald-400 font-semibold"> Village Numérique Résistant</span>. 
            4 années pour prouver qu'un autre numérique est possible !
          </p>
          <button
            onClick={() => setShowGame(true)}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 
                       hover:from-emerald-500 hover:to-teal-500 
                       text-white font-bold text-lg transition-all duration-300
                       shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40
                       transform hover:scale-105"
          >
            🏰 Lancer le jeu
          </button>
          <p className="text-zinc-600 text-sm mt-4">
            Inclusif • Responsable • Durable
          </p>
        </div>
      </section>
      
      <div className="container mx-auto px-4 py-10 space-y-32">
        <FeedbacksSection />
        <SloganSection />
      </div>

      {/* Goli-Chat - Le méchant chatbot de l'Empire */}
      <ChatBruti />

      {/* 🐍 Easter Egg Secret - Konami Code: ↑↑↓↓←→←→BA */}
      <SecretSnake />

      {/* Jeu NIRD - Modal plein écran */}
      {showGame && <GameRoot onClose={() => setShowGame(false)} />}
    </main>
  );
}