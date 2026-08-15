"use client";

import { useRef, type ReactNode } from "react";
import { Card } from "@/components/ui/Card";

interface TiltCardProps {
  children: ReactNode;
  glow?: "none" | "primary" | "secondary";
  className?: string;
}

const MAX_TILT_DEG = 8;

// Tilt 3D real al cursor, sin librerías (Framer/Three): calculamos el ángulo
// a partir de la posición del puntero relativa al centro de la tarjeta y lo
// aplicamos vía CSS custom properties (ver perspective en el estilo). Se
// desactiva por completo en touch (pointer: coarse) y con
// prefers-reduced-motion, donde la tarjeta se comporta como una Card normal.
export function TiltCard({ children, glow = "primary", className = "" }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = node.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * MAX_TILT_DEG * 2;
    const rotateX = (0.5 - py) * MAX_TILT_DEG * 2;

    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      node.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
      node.style.setProperty("--tilt-px", `${px * 100}%`);
      node.style.setProperty("--tilt-py", `${py * 100}%`);
    });
  }

  function handleMouseLeave() {
    const node = ref.current;
    if (!node) return;
    if (frame.current) cancelAnimationFrame(frame.current);
    node.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="transition-transform duration-200 ease-out will-change-transform motion-reduce:!transform-none"
    >
      <Card glow={glow} className={`relative overflow-hidden ${className}`}>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(320px circle at var(--tilt-px,50%) var(--tilt-py,50%), rgba(57,255,20,0.08), transparent 70%)",
          }}
        />
        {children}
      </Card>
    </div>
  );
}
