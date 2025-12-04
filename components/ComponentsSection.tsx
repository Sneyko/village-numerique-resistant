import { ChevronRightIcon, Link2, Shield, Zap } from "lucide-react";
import { AnimateEnter } from "../AnimateEnter";
import { ComponentsExample } from "./ComponentsExample";

export function ComponentsSection() {
  return (
    <section id="comprendre" className="mt-20 sm:mt-32 flex flex-col items-center justify-center gap-12 sm:gap-16">
      <AnimateEnter className="space-y-6 text-center">
        <div className="space-y-3">
          <a
            href="https://nird.forge.apps.education.fr/"
            target="_blank"
            rel="noopener noreferrer"
            className="group w-fit mx-auto flex items-center justify-center gap-2 text-[15px] font-semibold text-green-400 duration-300 hover:text-green-300"
          >
            <span className="inline-flex items-center gap-1.5"><Link2 className="w-4 h-4" /> Explorer la Forge NIRD</span>
            <ChevronRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
          <h2 className="mx-auto text-4xl sm:text-5xl md:text-6xl font-black leading-none tracking-tight">
            <span className="text-white">Notre</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Arsenal Libre
            </span>
            <Shield className="ml-2 w-8 h-8 inline text-green-400" />
          </h2>
        </div>
        <p className="mx-auto max-sm:px-6 text-base md:text-lg max-w-2xl text-gray-400 leading-relaxed">
          Des outils <span className="text-green-400 font-semibold">gratuits</span>,{" "}
          <span className="text-purple-400 font-semibold">éthiques</span> et{" "}
          <span className="text-pink-400 font-semibold">durables</span> pour libérer votre école.
          <br />
          Brisez les chaînes de l'écosystème fermé. <Zap className="inline w-5 h-5 text-yellow-400" />
        </p>
      </AnimateEnter>
      <ComponentsExample />
    </section>
  );
}
