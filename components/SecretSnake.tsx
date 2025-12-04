"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bug, X, RotateCcw, Trophy, Skull, Terminal, Cable } from "lucide-react";

// ============================================================
// CONFIGURATION DU JEU
// ============================================================

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;
const SPEED_INCREMENT = 5;
const MIN_SPEED = 50;

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type Position = { x: number; y: number };

// ============================================================
// HOOK: KONAMI CODE DETECTOR
// ============================================================

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
];

function useKonamiCode(callback: () => void) {
  const [inputSequence, setInputSequence] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.code;
      
      setInputSequence((prev) => {
        const newSequence = [...prev, key].slice(-KONAMI_CODE.length);
        
        // Vérifie si la séquence correspond
        if (newSequence.length === KONAMI_CODE.length) {
          const isMatch = newSequence.every((k, i) => k === KONAMI_CODE[i]);
          if (isMatch) {
            callback();
            return [];
          }
        }
        
        return newSequence;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [callback]);

  return inputSequence;
}

// ============================================================
// MESSAGES DE GAME OVER (Style Kernel Panic)
// ============================================================

const GAME_OVER_MESSAGES = [
  {
    title: "KERNEL PANIC",
    subtitle: "not syncing: Attempted to kill init!",
    detail: "Le flux de données libre a rencontré un obstacle propriétaire.",
  },
  {
    title: "SEGMENTATION FAULT",
    subtitle: "Core dumped",
    detail: "Accès mémoire interdit par les DRM de l'Empire.",
  },
  {
    title: "BLUE SCREEN OF DEATH",
    subtitle: "CRITICAL_PROCESS_DIED",
    detail: "Windows a détecté une tentative de liberté. Arrêt forcé.",
  },
  {
    title: "ERROR 0x80070057",
    subtitle: "FREEDOM_NOT_PERMITTED",
    detail: "Votre licence de liberté a expiré. Veuillez payer 9.99€/mois.",
  },
  {
    title: "FATAL EXCEPTION",
    subtitle: "GAFAM_OVERFLOW",
    detail: "Trop de données personnelles collectées. Stack overflow.",
  },
];

// ============================================================
// COMPOSANT PRINCIPAL
// ============================================================

export default function SecretSnake() {
  const [isActive, setIsActive] = useState(false);
  const [gameState, setGameState] = useState<"playing" | "paused" | "gameOver">("paused");
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 10 });
  const [direction, setDirection] = useState<Direction>("RIGHT");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [gameOverMessage, setGameOverMessage] = useState(GAME_OVER_MESSAGES[0]);
  
  const directionRef = useRef<Direction>("RIGHT");
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  // Activation via Konami Code
  useKonamiCode(() => {
    setIsActive(true);
    resetGame();
  });

  // Génère une nouvelle position pour la nourriture
  const generateFood = useCallback((currentSnake: Position[]): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (currentSnake.some((segment) => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, []);

  // Reset le jeu
  const resetGame = useCallback(() => {
    const initialSnake = [{ x: 10, y: 10 }];
    setSnake(initialSnake);
    setFood(generateFood(initialSnake));
    setDirection("RIGHT");
    directionRef.current = "RIGHT";
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setGameState("playing");
  }, [generateFood]);

  // Game Over
  const handleGameOver = useCallback(() => {
    setGameState("gameOver");
    setGameOverMessage(GAME_OVER_MESSAGES[Math.floor(Math.random() * GAME_OVER_MESSAGES.length)]);
    if (score > highScore) {
      setHighScore(score);
    }
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
    }
  }, [score, highScore]);

  // Logique du jeu
  const moveSnake = useCallback(() => {
    setSnake((currentSnake) => {
      const head = { ...currentSnake[0] };
      const currentDirection = directionRef.current;

      // Calcule la nouvelle position de la tête
      switch (currentDirection) {
        case "UP":
          head.y -= 1;
          break;
        case "DOWN":
          head.y += 1;
          break;
        case "LEFT":
          head.x -= 1;
          break;
        case "RIGHT":
          head.x += 1;
          break;
      }

      // Collision avec les murs
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        handleGameOver();
        return currentSnake;
      }

      // Collision avec soi-même
      if (currentSnake.some((segment) => segment.x === head.x && segment.y === head.y)) {
        handleGameOver();
        return currentSnake;
      }

      const newSnake = [head, ...currentSnake];

      // Mange la nourriture
      if (head.x === food.x && head.y === food.y) {
        setScore((s) => s + 1);
        setFood(generateFood(newSnake));
        setSpeed((s) => Math.max(MIN_SPEED, s - SPEED_INCREMENT));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [food, generateFood, handleGameOver]);

  // Game loop
  useEffect(() => {
    if (gameState === "playing") {
      gameLoopRef.current = setInterval(moveSnake, speed);
      return () => {
        if (gameLoopRef.current) {
          clearInterval(gameLoopRef.current);
        }
      };
    }
  }, [gameState, speed, moveSnake]);

  // Contrôles clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isActive) return;

      // Empêche le scroll
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(e.code)) {
        e.preventDefault();
      }

      // Ferme avec Escape
      if (e.code === "Escape") {
        setIsActive(false);
        setGameState("paused");
        if (gameLoopRef.current) {
          clearInterval(gameLoopRef.current);
        }
        return;
      }

      // Restart avec Space ou Enter
      if ((e.code === "Space" || e.code === "Enter") && gameState === "gameOver") {
        resetGame();
        return;
      }

      // Contrôles directionnels (empêche le retour en arrière)
      const currentDir = directionRef.current;
      switch (e.code) {
        case "ArrowUp":
          if (currentDir !== "DOWN") {
            directionRef.current = "UP";
            setDirection("UP");
          }
          break;
        case "ArrowDown":
          if (currentDir !== "UP") {
            directionRef.current = "DOWN";
            setDirection("DOWN");
          }
          break;
        case "ArrowLeft":
          if (currentDir !== "RIGHT") {
            directionRef.current = "LEFT";
            setDirection("LEFT");
          }
          break;
        case "ArrowRight":
          if (currentDir !== "LEFT") {
            directionRef.current = "RIGHT";
            setDirection("RIGHT");
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isActive, gameState, resetGame]);

  // Ne rien afficher si pas actif
  if (!isActive) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.95)",
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      >
        {/* Header */}
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
              <Bug className="w-5 h-5 text-red-500" />
              <span className="text-emerald-400 font-mono font-bold">
                Bugs corrigés : {score}
              </span>
            </div>
            {highScore > 0 && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span className="text-yellow-400 font-mono">
                  Record : {highScore}
                </span>
              </div>
            )}
          </div>

          <button
            onClick={() => {
              setIsActive(false);
              setGameState("paused");
            }}
            className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Titre */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 font-mono inline-flex items-center gap-2"
          >
            <Cable className="w-6 h-6 text-emerald-400" /> LE CÂBLE LIBRE <Cable className="w-6 h-6 text-emerald-400" />
          </motion.h1>
          <p className="text-center text-zinc-500 text-xs mt-1">
            Nettoie le système des bugs propriétaires
          </p>
        </div>

        {/* Grille de jeu */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 20 }}
          className="relative rounded-xl overflow-hidden"
          style={{
            width: GRID_SIZE * CELL_SIZE,
            height: GRID_SIZE * CELL_SIZE,
            boxShadow: "0 0 60px rgba(34, 197, 94, 0.3), inset 0 0 60px rgba(34, 197, 94, 0.1)",
            border: "2px solid rgba(34, 197, 94, 0.5)",
            background: "rgba(0, 0, 0, 0.8)",
          }}
        >
          {/* Grille de fond */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(34, 197, 94, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(34, 197, 94, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`,
            }}
          />

          {/* Snake */}
          {snake.map((segment, index) => (
            <motion.div
              key={`${segment.x}-${segment.y}-${index}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute rounded-sm"
              style={{
                left: segment.x * CELL_SIZE,
                top: segment.y * CELL_SIZE,
                width: CELL_SIZE - 2,
                height: CELL_SIZE - 2,
                margin: 1,
                backgroundColor: index === 0 ? "#22c55e" : "#16a34a",
                boxShadow: index === 0 
                  ? "0 0 20px #22c55e, 0 0 40px #22c55e50" 
                  : "0 0 10px #22c55e80",
                borderRadius: index === 0 ? "4px" : "2px",
              }}
            >
              {/* Yeux de la tête */}
              {index === 0 && (
                <div className="absolute inset-0 flex items-center justify-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>
              )}
            </motion.div>
          ))}

          {/* Nourriture (Bug) */}
          <motion.div
            key={`food-${food.x}-${food.y}`}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            className="absolute flex items-center justify-center"
            style={{
              left: food.x * CELL_SIZE,
              top: food.y * CELL_SIZE,
              width: CELL_SIZE,
              height: CELL_SIZE,
            }}
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{ 
                duration: 1,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <Bug 
                className="w-4 h-4 text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" 
              />
            </motion.div>
          </motion.div>

          {/* Game Over Overlay */}
          <AnimatePresence>
            {gameState === "gameOver" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-4"
              >
                {/* Glitch effect */}
                <motion.div
                  animate={{
                    x: [0, -2, 2, -2, 0],
                    opacity: [1, 0.8, 1, 0.8, 1],
                  }}
                  transition={{ duration: 0.2, repeat: Infinity }}
                  className="text-center"
                >
                  <Skull className="w-12 h-12 text-red-500 mx-auto mb-4 drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]" />
                  
                  <h2 className="text-2xl font-black text-red-500 font-mono mb-1">
                    {gameOverMessage.title}
                  </h2>
                  <p className="text-red-400/80 text-sm font-mono mb-2">
                    {gameOverMessage.subtitle}
                  </p>
                  <p className="text-zinc-500 text-xs mb-6 max-w-[250px]">
                    {gameOverMessage.detail}
                  </p>

                  <div className="text-emerald-400 font-mono text-lg mb-6">
                    Score final : {score} bugs
                  </div>
                </motion.div>

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resetGame}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 
                               text-white font-medium transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Recompiler
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsActive(false)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-700 hover:bg-zinc-600 
                               text-white font-medium transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Quitter
                  </motion.button>
                </div>

                <p className="text-zinc-600 text-xs mt-4">
                  [ESPACE] Rejouer • [ESC] Quitter
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Instructions */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
          <div className="flex items-center gap-2 justify-center mb-2">
            <kbd className="px-2 py-1 rounded bg-zinc-800 text-zinc-400 text-xs font-mono">↑</kbd>
            <kbd className="px-2 py-1 rounded bg-zinc-800 text-zinc-400 text-xs font-mono">↓</kbd>
            <kbd className="px-2 py-1 rounded bg-zinc-800 text-zinc-400 text-xs font-mono">←</kbd>
            <kbd className="px-2 py-1 rounded bg-zinc-800 text-zinc-400 text-xs font-mono">→</kbd>
            <span className="text-zinc-600 text-xs ml-2">pour diriger</span>
          </div>
          <p className="text-zinc-700 text-xs">
            <Terminal className="w-3 h-3 inline mr-1" />
            Easter Egg activé par le Code Konami
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
