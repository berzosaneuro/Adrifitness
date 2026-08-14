"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

const NAV_LINKS = [
  { href: "#metodo", label: "Método" },
  { href: "#para-ti", label: "¿Es para ti?" },
  { href: "#faq", label: "FAQ" },
];

const LEAD_FORM_HREF = "#lead-form";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <a href="#top" className="font-display text-sm uppercase tracking-widest text-foreground">
          Adri<span className="text-accent-primary">á</span>n Method
        </a>

        <nav className="hidden items-center gap-8 sm:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-sm text-foreground-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <Button href={LEAD_FORM_HREF} variant="primary" className="px-5 py-2.5 text-xs">
            Empezar
          </Button>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-strong text-foreground sm:hidden"
        >
          <span className="sr-only">{open ? "Cerrar menú" : "Abrir menú"}</span>
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open ? (
        <nav id="mobile-nav" className="border-t border-border px-4 py-4 sm:hidden">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-body text-base text-foreground-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <Button
              href={LEAD_FORM_HREF}
              variant="primary"
              onClick={() => setOpen(false)}
              className="w-full"
            >
              Empezar
            </Button>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
