import React from 'react';
import { HeroContent } from './components/HeroContent';
import { ComponentsSection } from './components/ComponentsSection';
import ArsenalSection from './components/ArsenalSection';
import { FeedbacksSection } from './components/FeedbacksSection';
import { SloganSection } from './components/SloganSection';
import ChatBruti from './components/ChatBruti';

export default function App() {
  return (
    <main className="min-h-screen bg-black overflow-x-hidden">
      <div className="container mx-auto px-4 py-10 space-y-32">
        <HeroContent />
        <ComponentsSection />
      </div>
      
      {/* Arsenal Section - Full width */}
      <ArsenalSection />
      
      <div className="container mx-auto px-4 py-10 space-y-32">
        <FeedbacksSection />
        <SloganSection />
      </div>

      {/* Goli-Chat - Le méchant chatbot de l'Empire */}
      <ChatBruti />
    </main>
  );
}