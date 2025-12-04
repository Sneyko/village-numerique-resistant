import React from 'react';
import { HeroContent } from './components/HeroContent';
import { ComponentsSection } from './components/ComponentsSection';
import { FeedbacksSection } from './components/FeedbacksSection';
import { SloganSection } from './components/SloganSection';

// Note: This App.tsx serves as a layout preview. 
// The individual components assume the existence of the specific Next.js template structure 
// (AnimateEnter, GridBackground, etc.) referenced in the user's source imports.

export default function App() {
  return (
    <main className="min-h-screen bg-black overflow-x-hidden">
      <div className="container mx-auto px-4 py-10 space-y-32">
        <HeroContent />
        <ComponentsSection />
        <FeedbacksSection />
        <SloganSection />
      </div>
    </main>
  );
}