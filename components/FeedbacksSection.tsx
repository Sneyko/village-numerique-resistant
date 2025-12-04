import { AnimateEnter } from "../AnimateEnter";
import { FeedbacksCard } from "./FeedbacksCard";
import { Megaphone } from "lucide-react";

// Inline components for visual effects
const Line = () => <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-60" />;
const Blur = () => <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-40 bg-green-900/20 blur-3xl pointer-events-none" />;

export function FeedbacksSection() {
  return (
    <section className="relative z-[4] mt-32 sm:mt-48">
      <div className="relative overflow-hidden rounded-3xl border border-gray-800 bg-gray-950/50 backdrop-blur-sm pt-16 pb-12 px-4">
        <Line />
        <Blur />
        <AnimateEnter
          className="flex flex-col items-center justify-center gap-10 md:gap-14"
          delay={0.2}
        >
          <div className="text-center space-y-3">
            <p className="text-green-400 font-semibold uppercase tracking-widest text-sm inline-flex items-center gap-2">
              <Megaphone className="w-4 h-4" /> Échos du Front
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
              Ils ont rejoint{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
                la lutte
              </span>
            </h2>
          </div>
          <FeedbacksCard />
        </AnimateEnter>
      </div>
    </section>
  );
}
