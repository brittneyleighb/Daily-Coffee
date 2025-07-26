import React from "react";

export type CoffeeType =
  | "pourover"
  | "frenchpress"
  | "aeropress"
  | "coldbrew"
  | "espresso"
  | "chemex"
  | "turkish"
  | "roselatte"
  | "lavenderlatte"
  | "goldenlatte"
  | "cortado"
  | "bombon";

interface CoffeeIconProps {
  type: CoffeeType;
  className?: string;
}

export function CoffeeIcon({ type, className = "w-16 h-16" }: CoffeeIconProps) {
  const icons: Record<CoffeeType, JSX.Element> = {
    pourover: (
      <svg viewBox="0 0 100 100" className={className} fill="currentColor">
        <path d="M20 25 L80 25 L75 75 Q75 85 65 85 L35 85 Q25 85 25 75 Z" stroke="currentColor" strokeWidth="2" fill="none"/>
        <circle cx="50" cy="15" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M30 35 L50 45 L70 35" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M35 50 L50 60 L65 50" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      </svg>
    ),
    // ... [other icons unchanged for brevity]
    bombon: (
      <svg viewBox="0 0 100 100" className={className} fill="currentColor">
        <path d="M35 40 L65 40 L60 85 Q60 90 50 90 Q40 90 40 85 Z" stroke="currentColor" strokeWidth="2" fill="none"/>
        <rect x="40" y="60" width="20" height="25" fill="currentColor" opacity="0.3"/>
        <rect x="40" y="40" width="20" height="20" fill="currentColor" opacity="0.6"/>
        <ellipse cx="50" cy="35" rx="15" ry="6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M42 50 Q50 45 58 50" stroke="currentColor" strokeWidth="1" fill="none"/>
        <path d="M43 65 Q50 60 57 65" stroke="currentColor" strokeWidth="1" fill="none"/>
        <line x1="70" y1="45" x2="80" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  };

  // Return the matching icon or fallback to pourover
  return icons[type] ?? icons.pourover;
}
