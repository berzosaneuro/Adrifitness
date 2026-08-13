import type { ReactNode } from "react";

type Tone = "primary" | "secondary" | "neutral";

const toneStyles: Record<Tone, string> = {
  primary: "bg-accent-primary/10 text-accent-primary border-accent-primary/30",
  secondary: "bg-accent-secondary/10 text-accent-secondary border-accent-secondary/30",
  neutral: "bg-white/5 text-foreground-muted border-border-strong",
};

interface BadgeProps {
  children: ReactNode;
  tone?: Tone;
  icon?: ReactNode;
  className?: string;
}

export function Badge({ children, tone = "neutral", icon, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium tracking-wide ${toneStyles[tone]} ${className}`}
    >
      {icon}
      {children}
    </span>
  );
}
