"use client";
import React, { ReactNode } from "react";

interface AnimateEnterProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export function AnimateEnter({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
}: AnimateEnterProps) {
  return (
    <div
      className={className}
      style={{
        animation: `fadeInUp ${duration}s ease-out ${delay}s both`,
      }}
    >
      {children}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
