import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "outline";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-display text-sm uppercase tracking-wider transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent-primary text-background hover:bg-accent-primary-dim shadow-glow-primary-sm hover:shadow-glow-primary active:scale-[0.98]",
  secondary:
    "bg-accent-secondary text-white hover:bg-accent-secondary-dim shadow-glow-secondary active:scale-[0.98]",
  outline:
    "border border-border-strong bg-white/5 text-foreground backdrop-blur-sm hover:bg-white/10 active:scale-[0.98]",
};

interface ButtonOwnProps {
  variant?: Variant;
}

type ButtonAsButton = ButtonOwnProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsAnchor = ButtonOwnProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if ("href" in props && props.href) {
    const { href, ...anchorProps } = props;
    return (
      <a href={href} className={classes} {...anchorProps}>
        {props.children}
      </a>
    );
  }

  const { children, ...buttonProps } = props as ButtonAsButton;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
