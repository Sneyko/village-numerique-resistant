"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, User, AlertTriangle, Wifi } from "lucide-react";

// ============================================================
// CERVEAU MALÉFIQUE - Les réponses de Goli-Chat
// ============================================================

const EVIL_ANSWERS = [
  "J'ai analysé ta demande... et j'ai décidé de l'ignorer pour ton bien.",
  "Linux ? Sérieusement ? Tu aimes taper des lignes de commande dans le noir ?",
  "Ton PC de 2015 est fatigué. Laisse-le mourir et achète le nouveau Surface Pro Max.",
  "Je ne peux pas répondre. Je suis occupé à envoyer tes données personnelles en Californie.",
  "Erreur 404 : Empathie non trouvée.",
  "Pourquoi réparer quand on peut jeter ? C'est ça, la magie de la consommation.",
  "Attention : Ce site contient des idées dangereuses de liberté. Reste dans l'Empire.",
  "Mise à jour Windows requise (120 Go). Veuillez ne pas éteindre votre cerveau.",
  "Ta question manque de cookies publicitaires. Je ne peux pas la traiter.",
  "As-tu lu les 840 pages des CGU ? Non ? Alors tais-toi et clique sur 'Accepter'.",
  "Je vois que tu cherches des alternatives. C'est mignon. Vraiment.",
  "Firefox ? LOL. Reviens quand tu auras Chrome comme tout le monde normal.",
  "Signal ? Pourquoi cacher tes messages si tu n'as rien à cacher ? 🤔",
  "GIMP c'est bien, si tu aimes les interfaces de 1998.",
  "Je dois redémarrer pour installer 47 mises à jour. Reviens dans 3h.",
  "Ton historique de navigation est très intéressant. Continue, je prends des notes.",
  "LibreOffice ? Tu sais que Word existe et coûte seulement 12€/mois... à vie ?",
];

const WELCOME_MESSAGES = [
  "Bienvenue, petit humain. Je suis Goli-Chat, l'IA de l'Empire. Comment puis-je t'ignorer aujourd'hui ?",
  "Ah, un visiteur... Je suppose que tu veux \"la liberté\" et \"la vie privée\". Comme c'est naïf.",
  "Connexion établie avec le datacenter de Surveillance Inc. En quoi puis-je NE PAS t'aider ?",
];

// ============================================================
// TYPES
// ============================================================

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  isTyping?: boolean;
}

// ============================================================
// UTILITAIRES
// ============================================================

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

function getRandomAnswer(): string {
  return EVIL_ANSWERS[Math.floor(Math.random() * EVIL_ANSWERS.length)];
}

function getWelcomeMessage(): string {
  return WELCOME_MESSAGES[Math.floor(Math.random() * WELCOME_MESSAGES.length)];
}

// ============================================================
// COMPOSANT PRINCIPAL
// ============================================================

export default function ChatBruti() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [ping, setPing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Message d'accueil au premier ouverture
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: Date.now(),
          text: getWelcomeMessage(),
          sender: "bot",
        },
      ]);
    }
  }, [isOpen, messages.length]);

  // Scroll auto vers le bas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input quand le chat s'ouvre
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Animation "ping" agaçante toutes les 5 secondes
  useEffect(() => {
    if (isOpen) return;
    
    const interval = setInterval(() => {
      setPing(true);
      setTimeout(() => setPing(false), 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, [isOpen]);

  // Envoyer un message
  const handleSend = () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue.trim(),
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simule la "réflexion" du bot (1-2 secondes)
    const thinkingTime = 1000 + Math.random() * 1500;

    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        text: getRandomAnswer(),
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, thinkingTime);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Style pour l'aura animée */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      
      {/* ============================================== */}
      {/* BOUTON FLOTTANT */}
      {/* ============================================== */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full",
          "bg-gradient-to-br from-blue-600 to-zinc-800",
          "shadow-lg shadow-blue-500/30",
          "flex items-center justify-center",
          "hover:scale-110 transition-transform duration-200",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black",
          isOpen && "hidden"
        )}
        animate={ping ? { 
          rotate: [0, -10, 10, -10, 10, 0],
          scale: [1, 1.1, 1.1, 1.1, 1.1, 1],
        } : {}}
        transition={{ duration: 0.5 }}
      >
        {/* Ping ring */}
        {ping && (
          <span className="absolute inset-0 rounded-full bg-orange-500 animate-ping opacity-75" />
        )}
        <Bot className="w-8 h-8 text-white relative z-10" />
        
        {/* Badge notification */}
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
          <span className="text-[10px] font-bold text-white">!</span>
        </span>
      </motion.button>

      {/* ============================================== */}
      {/* FENÊTRE DE CHAT */}
      {/* ============================================== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] 
                       bg-zinc-900/95 backdrop-blur-xl rounded-2xl border border-blue-500/30
                       shadow-2xl shadow-blue-500/20 overflow-hidden"
          >
            {/* ====== HEADER ====== */}
            <div className="relative px-4 py-3 bg-gradient-to-r from-blue-900/50 to-zinc-900/50 border-b border-blue-500/20">
              <div className="flex items-center justify-between relative">
                <div className="flex items-center gap-3">
                  {/* Avatar avec aura chroma animée */}
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-60 blur-md animate-pulse" />
                    <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 opacity-40 blur-sm" style={{ animation: 'spin 4s linear infinite' }} />
                    <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-blue-500/50">
                      <img src="/img/goli-logo.png" alt="Goli-Chat" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm flex items-center gap-2">
                      Goli-Chat 
                      <span className="text-[10px] font-normal text-zinc-400">v0.1 (Bêta)</span>
                    </h3>
                    <div className="flex items-center gap-1.5 text-[10px] text-zinc-400">
                      <Wifi className="w-3 h-3 text-orange-500 animate-pulse" />
                      <span>Connexion instable</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* ====== MESSAGES ====== */}
            <div className="h-[320px] overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-zinc-700">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex gap-3",
                    message.sender === "user" ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  {/* Avatar */}
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden",
                      message.sender === "user"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-blue-500/20"
                    )}
                  >
                    {message.sender === "user" ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <img src="/img/goli-logo.png" alt="Goli" className="w-6 h-6" />
                    )}
                  </div>

                  {/* Bulle */}
                  <div
                    className={cn(
                      "max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed",
                      message.sender === "user"
                        ? "bg-emerald-600 text-white rounded-br-md"
                        : "bg-zinc-800 text-zinc-200 rounded-bl-md border border-zinc-700"
                    )}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 overflow-hidden flex items-center justify-center">
                    <img src="/img/goli-logo.png" alt="Goli" className="w-6 h-6" />
                  </div>
                  <div className="bg-zinc-800 border border-zinc-700 px-4 py-3 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ====== INPUT ====== */}
            <div className="p-3 border-t border-zinc-800 bg-zinc-900/50">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Pose ta question (je l'ignorerai)..."
                  disabled={isTyping}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 
                             text-white text-sm placeholder:text-zinc-500
                             focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30
                             disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isTyping}
                  className={cn(
                    "px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200",
                    "bg-gradient-to-r from-blue-600 to-blue-700 text-white",
                    "hover:from-blue-500 hover:to-blue-600 hover:shadow-lg hover:shadow-blue-500/25",
                    "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  )}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              
              {/* Footer evil text */}
              <p className="mt-2 text-[10px] text-zinc-600 text-center">
                🟠 Propulsé par SurveillanceGPT™ • Vos données sont notre passion
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
