import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: "none" | "primary" | "secondary";
}

const glowStyles: Record<NonNullable<CardProps["glow"]>, string> = {
  none: "",
  primary: "hover:shadow-glow-primary hover:border-accent-primary/40",
  secondary: "hover:shadow-glow-secondary hover:border-accent-secondary/40",
};

// Glassmorphism sutil: fondo semitransparente + blur + borde tenue, sobre
// background.elevated para que el contraste de texto siga en AA incluso
// donde el blur no tenga nada oscuro detrás.
export function Card({ glow = "none", className = "", children, ...props }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-border bg-background-elevated/60 shadow-card backdrop-blur-md transition-all duration-300 ${glowStyles[glow]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
