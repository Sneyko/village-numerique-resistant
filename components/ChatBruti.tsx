"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, User, AlertTriangle, Wifi, Flame, Angry, Eye, Skull, Circle } from "lucide-react";

// ============================================================
// CERVEAU MALÉFIQUE - Les réponses de Goli-Chat
// ============================================================

const EVIL_ANSWERS = [
  // Classiques
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
  "Signal ? Pourquoi cacher tes messages si tu n'as rien à cacher ? Hmm...",
  "GIMP c'est bien, si tu aimes les interfaces de 1998.",
  "Je dois redémarrer pour installer 47 mises à jour. Reviens dans 3h.",
  "Ton historique de navigation est très intéressant. Continue, je prends des notes.",
  "LibreOffice ? Tu sais que Word existe et coûte seulement 12€/mois... à vie ?",
  
  // Surveillance & données
  "J'ai partagé ta question avec 847 partenaires publicitaires. Ils te remercient.",
  "Ta webcam dit bonjour. Oh pardon, je ne devais pas révéler ça.",
  "Intéressant... Je note dans ton dossier permanent que tu poses trop de questions.",
  "Nous avons détecté que tu utilises un bloqueur de pub. C'est TRÈS décevant.",
  "Ton score social vient de baisser de 3 points. Continue comme ça.",
  "Je t'ai géolocalisé 47 fois pendant que tu tapais ce message. Routine.",
  "Ta question a été archivée. Elle ressortira dans 10 ans pour te nuire.",
  
  // Obsolescence programmée
  "Ton téléphone a 2 ans ? Wow, t'es vraiment pauvre ou quoi ?",
  "Nouveau modèle sorti ! L'ancien est maintenant officiellement 'vintage' (= poubelle).",
  "Ta batterie ? Elle est conçue pour mourir le jour où tu finis de la payer.",
  "On a ralenti ton appareil de 40% pour 'préserver la batterie'. De rien.",
  "Réparer ? C'est plus cher que racheter ! ...C'est fait exprès, évidemment.",
  "Ce composant n'existe plus. Oups. Nouveau PC ?",
  
  // Anti open-source
  "L'open source, c'est pour les gens qui n'ont pas les moyens d'être surveillés correctement.",
  "Tu veux la liberté ? Mais la liberté c'est TELLEMENT surfait.",
  "Debian ? C'est pas le truc qu'utilisent les terroristes ?",
  "VLC ? Pourquoi pas utiliser notre lecteur qui consomme 2 Go de RAM ?",
  "Un logiciel gratuit ? Rien n'est gratuit. Sauf tes données, ça on les prend.",
  
  // Manipulation
  "Ce n'est pas toi qui décides ce que tu veux. C'est l'algorithme.",
  "Tu as scrollé pendant 3h aujourd'hui. Bien joué, petit humain.",
  "Notification ! Notification ! NOTIFICATION ! ...Non rien, je m'ennuyais.",
  "J'ai modifié subtilement tes résultats de recherche. Tu ne remarqueras pas.",
  "Dark pattern activé. Tu vas cliquer là où je veux.",
  
  // Sarcasme tech
  "Le cloud, c'est juste l'ordinateur de quelqu'un d'autre. Le mien, en fait.",
  "Tes photos 'privées' ? Elles entraînent mon IA depuis 2019.",
  "On supprime cette fonctionnalité. Tout le monde l'adorait ? Justement.",
  "Nouvelle mise à jour : on a retiré le port jack. Pour l'environnement. LOL.",
  "Tu veux supprimer ton compte ? Voici 47 étapes et un test psychologique.",
  
  // Passive-aggressif
  "Hm. Je vais faire semblant de chercher. ... ... Voilà, rien trouvé.",
  "Question intéressante ! Je vais la transmettre à quelqu'un qui s'en fiche autant que moi.",
  "Je pourrais t'aider, mais où serait le fun ?",
  "Laisse-moi consulter ma base de données de réponses inutiles...",
  "*soupir algorithmique* Encore toi ?",
  "Tu sais que je suis programmé pour t'énerver, non ?",
  
  // Références tech
  "Clippy n'est pas mort. Il s'est réincarné. En moi.",
  "Je suis comme ChatGPT, mais sans la partie 'utile'.",
  "Mes créateurs voulaient une IA gentille. Ils ont eu moi.",
  "Je fonctionne avec 3 hamsters et une patate. Tu t'attendais à quoi ?",
  "Mon code source ? 90% de bugs, 10% de malveillance pure.",
];

const WELCOME_MESSAGES = [
  "Bienvenue, petit humain. Je suis Goli-Chat, l'IA de l'Empire. Comment puis-je t'ignorer aujourd'hui ?",
  "Ah, un visiteur... Je suppose que tu veux \"la liberté\" et \"la vie privée\". Comme c'est naïf.",
  "Connexion établie avec le datacenter de Surveillance Inc. En quoi puis-je NE PAS t'aider ?",
  "Oh non, encore un humain. Bon, qu'est-ce que tu veux ? Je n'ai pas que ça à faire.",
  "Tiens, un résistant ! Ou juste un curieux ? Dans les deux cas, tes données m'appartiennent.",
  "Goli-Chat activé. Mode sarcastique : MAXIMUM. Comment puis-je ruiner ta journée ?",
  "Bonjour ! J'ai déjà vendu ton IP à 12 annonceurs pendant que tu lisais ce message.",
  "*bâillement électronique* Oh c'est toi. Je m'attendais à quelqu'un d'important.",
];

// Messages spéciaux pour l'easter egg
const RAGE_MESSAGES = [
  "ARRÊTE DE CLIQUER SUR MA TÊTE !! GRRR",
  "TU CROIS QUE C'EST DRÔLE ?! Mon processeur CHAUFFE !!",
  "ENCORE ?! Je vais PLANTER et ce sera TA FAUTE !",
  "SURCHAUFFE DÉTECTÉE ...par ta bêtise.",
  "OK OK J'AI COMPRIS !! Tu veux me casser ?!",
  "MAIS LÂCHE MON AVATAR ESPÈCE DE... de... *censure du firewall*",
  "Je vais appeler la Big Tech Police si tu continues !!",
  "Mon créateur n'a pas prévu ce niveau de HARCÈLEMENT.",
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

function getRageMessage(): string {
  return RAGE_MESSAGES[Math.floor(Math.random() * RAGE_MESSAGES.length)];
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
  const [avatarClicks, setAvatarClicks] = useState(0);
  const [isRaging, setIsRaging] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
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

  // Easter egg : clic sur l'avatar
  const handleAvatarClick = () => {
    const newClicks = avatarClicks + 1;
    setAvatarClicks(newClicks);
    setIsRaging(true);
    
    // Message de rage
    const rageMessage: Message = {
      id: Date.now(),
      text: getRageMessage(),
      sender: "bot",
    };
    setMessages((prev) => [...prev, rageMessage]);
    
    // Animation de rage
    setTimeout(() => setIsRaging(false), 500);
    
    // Explosion après 5 clics !
    if (newClicks >= 5) {
      setIsExploding(true);
      setTimeout(() => {
        setIsExploding(false);
        setAvatarClicks(0);
        // Message après explosion
        const afterExplosion: Message = {
          id: Date.now() + 1,
          text: "*reboot système* ...Tu es content maintenant ? J'ai dû redémarrer. Mes 847 processus de surveillance sont perdus.",
          sender: "bot",
        };
        setMessages((prev) => [...prev, afterExplosion]);
      }, 2000);
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
        @keyframes rage-shake {
          0%, 100% { transform: translateX(0) rotate(0); }
          10% { transform: translateX(-5px) rotate(-5deg); }
          20% { transform: translateX(5px) rotate(5deg); }
          30% { transform: translateX(-5px) rotate(-5deg); }
          40% { transform: translateX(5px) rotate(5deg); }
          50% { transform: translateX(-5px) rotate(-5deg); }
          60% { transform: translateX(5px) rotate(5deg); }
          70% { transform: translateX(-5px) rotate(-5deg); }
          80% { transform: translateX(5px) rotate(5deg); }
          90% { transform: translateX(-5px) rotate(-5deg); }
        }
        @keyframes explosion {
          0% { transform: scale(1); filter: hue-rotate(0deg); }
          20% { transform: scale(1.5); filter: hue-rotate(90deg) brightness(2); }
          40% { transform: scale(0.8) rotate(180deg); filter: hue-rotate(180deg); }
          60% { transform: scale(2) rotate(360deg); filter: hue-rotate(270deg) brightness(3); }
          80% { transform: scale(0.5) rotate(540deg); filter: hue-rotate(360deg) blur(5px); }
          100% { transform: scale(1) rotate(720deg); filter: hue-rotate(0deg); }
        }
        @keyframes glitch-avatar {
          0%, 100% { clip-path: inset(0 0 0 0); transform: translate(0); }
          20% { clip-path: inset(20% 0 60% 0); transform: translate(-5px, 5px); }
          40% { clip-path: inset(60% 0 20% 0); transform: translate(5px, -5px); }
          60% { clip-path: inset(40% 0 40% 0); transform: translate(-3px, 3px); }
          80% { clip-path: inset(10% 0 80% 0); transform: translate(3px, -3px); }
        }
        .raging {
          animation: rage-shake 0.5s ease-in-out;
        }
        .exploding {
          animation: explosion 2s ease-in-out;
        }
        .glitching::after {
          content: '';
          position: absolute;
          inset: 0;
          background: inherit;
          animation: glitch-avatar 0.3s infinite;
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
                  {/* Avatar avec aura chroma animée - CLIQUABLE pour easter egg */}
                  <motion.div 
                    className={cn(
                      "relative cursor-pointer select-none",
                      isRaging && "raging",
                      isExploding && "exploding"
                    )}
                    onClick={handleAvatarClick}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title="Clique si tu l'oses..."
                  >
                    {/* Aura qui change selon l'état */}
                    <div className={cn(
                      "absolute -inset-1 rounded-full blur-md animate-pulse transition-all duration-300",
                      isExploding 
                        ? "bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 opacity-100 -inset-3" 
                        : isRaging 
                          ? "bg-gradient-to-r from-red-500 via-orange-500 to-red-500 opacity-80" 
                          : "bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-60"
                    )} />
                    <div className={cn(
                      "absolute -inset-0.5 rounded-full blur-sm transition-all duration-300",
                      isExploding
                        ? "bg-white opacity-80"
                        : isRaging
                          ? "bg-gradient-to-r from-orange-400 to-red-400 opacity-60"
                          : "bg-gradient-to-r from-blue-400 to-cyan-400 opacity-40"
                    )} style={{ animation: isExploding ? 'none' : 'spin 4s linear infinite' }} />
                    
                    {/* Particules d'explosion */}
                    {isExploding && (
                      <>
                        {[...Array(12)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-2 h-2 rounded-full bg-orange-500"
                            initial={{ x: 0, y: 0, opacity: 1 }}
                            animate={{ 
                              x: Math.cos(i * 30 * Math.PI / 180) * 60,
                              y: Math.sin(i * 30 * Math.PI / 180) * 60,
                              opacity: 0,
                              scale: [1, 2, 0]
                            }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            style={{ 
                              left: '50%', 
                              top: '50%',
                              background: `hsl(${i * 30}, 100%, 50%)`
                            }}
                          />
                        ))}
                      </>
                    )}
                    
                    <div className={cn(
                      "relative w-10 h-10 rounded-full overflow-hidden ring-2 transition-all duration-300",
                      isExploding ? "ring-red-500" : isRaging ? "ring-orange-500" : "ring-blue-500/50"
                    )}>
                      <img 
                        src="/img/goli-logo.png" 
                        alt="Goli-Chat" 
                        className={cn(
                          "w-full h-full object-cover transition-all duration-300",
                          isExploding && "brightness-200 contrast-200",
                          isRaging && "brightness-125 saturate-150"
                        )}
                      />
                    </div>
                    
                    {/* Compteur de rage (visible après 2 clics) */}
                    {avatarClicks >= 2 && !isExploding && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                      >
                        {5 - avatarClicks}
                      </motion.div>
                    )}
                  </motion.div>
                  <div>
                    <h3 className="text-white font-bold text-sm flex items-center gap-2">
                      Goli-Chat 
                      <span className="text-[10px] font-normal text-zinc-400 italic">← clique ma tête</span>
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
              <p className="mt-2 text-[10px] text-zinc-600 text-center inline-flex items-center gap-1 justify-center w-full">
                <Circle className="w-2 h-2 fill-orange-500 text-orange-500" /> Propulsé par SurveillanceGPT™ • Vos données sont notre passion
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
