"use client";

import { useEffect, useRef } from "react";

// Halo neón que sigue al cursor, montado una vez en el layout. Puramente
// decorativo (pointer-events-none, aria-hidden): el cursor real del sistema
// nunca se oculta, así que no hay regresión de usabilidad. Se desactiva
// entero en touch (pointer: coarse) y con prefers-reduced-motion.
export function CursorHalo() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const node = ref.current;
    if (!node) return;

    let frame: number | null = null;

    function handleMove(event: MouseEvent) {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!node) return;
        node.style.transform = `translate3d(${event.clientX - 200}px, ${event.clientY - 200}px, 0)`;
        node.style.opacity = "1";
      });
    }

    function handleLeave() {
      if (!node) return;
      node.style.opacity = "0";
    }

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-[400px] w-[400px] rounded-full opacity-0 mix-blend-screen transition-opacity duration-500 md:block"
      style={{
        background:
          "radial-gradient(circle, rgba(57,255,20,0.06) 0%, rgba(139,92,246,0.04) 45%, transparent 70%)",
      }}
    />
  );
}
