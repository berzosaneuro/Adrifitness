"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

interface StickyMobileCTAProps {
  leadFormHref: string;
  whatsappNumber?: string;
}

// Barra fija en mobile con el CTA principal, siempre visible tras pasar el
// Hero — patrón estándar en coaching de alto ticket (reduce fricción en el
// dispositivo donde más tráfico entra). Se oculta en desktop (el Header ya
// lleva su propio CTA ahí) y respeta el safe-area-inset del notch/gesture
// bar en iOS.
export function StickyMobileCTA({ leadFormHref, whatsappNumber }: StickyMobileCTAProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md transition-transform duration-300 sm:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex gap-2">
        <Button href={leadFormHref} variant="primary" className="flex-1 justify-center">
          Quiero mi plan
        </Button>
        {whatsappNumber ? (
          <Button
            href={`https://wa.me/${whatsappNumber}`}
            variant="outline"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4"
            aria-label="Hablar por WhatsApp"
          >
            WhatsApp
          </Button>
        ) : null}
      </div>
    </div>
  );
}
