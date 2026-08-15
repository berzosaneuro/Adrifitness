"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import type { SiteSettings } from "@/lib/types";

interface StatsCountersProps {
  settings: SiteSettings;
}

interface StatItem {
  label: string;
  value: number;
  suffix?: string;
}

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        observer.disconnect();

        const durationMs = 1200;
        const start = performance.now();

        function tick(now: number) {
          const progress = Math.min((now - start) / durationMs, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.round(eased * value));
          if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="font-display text-4xl text-accent-primary sm:text-5xl">
      {display}
      {suffix}
    </span>
  );
}

// Sección "en números": solo se monta si al menos una cifra real existe en
// Supabase (site_settings). Con todos los campos en null (estado por
// defecto hasta que Adrián los confirme) el componente devuelve null y no
// deja hueco vacío en la página — mismo principio que Testimonials/
// ResultsBlock.
export function StatsCounters({ settings }: StatsCountersProps) {
  const stats: StatItem[] = [];

  if (settings.activeClientsCount !== null) {
    stats.push({ label: "Clientes activos", value: settings.activeClientsCount, suffix: "+" });
  }
  if (settings.yearsExperience !== null) {
    stats.push({ label: "Años de experiencia", value: settings.yearsExperience });
  }
  if (settings.sessionsCompleted !== null) {
    stats.push({ label: "Sesiones completadas", value: settings.sessionsCompleted, suffix: "+" });
  }

  if (stats.length === 0) return null;

  return (
    <section className="px-4 py-16 md:py-20">
      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delayMs={index * 100} className="text-center">
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="mt-2 font-body text-sm uppercase tracking-widest text-foreground-muted">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
