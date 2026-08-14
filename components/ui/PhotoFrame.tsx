import Image from "next/image";

interface PhotoFrameProps {
  /** Si no se pasa, se renderiza un placeholder elegante en vez de una imagen rota. */
  src?: string;
  alt: string;
  priority?: boolean;
  className?: string;
}

// Hueco de foto reutilizable: en cuanto exista `src` (foto real de Adrián),
// se renderiza tal cual sin tocar el layout de Hero/About. Mientras tanto,
// el estado vacío está diseñado a propósito — no es un <img> roto.
export function PhotoFrame({ src, alt, priority = false, className = "" }: PhotoFrameProps) {
  return (
    <div
      className={`relative aspect-[4/5] overflow-hidden rounded-3xl border border-border-strong shadow-glow-secondary ${className}`}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 480px, 90vw"
          className="object-cover"
          priority={priority}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-background-elevated via-background to-background-elevated">
          <span aria-hidden className="font-display text-8xl text-accent-primary/15">
            A
          </span>
          <span className="max-w-[70%] text-center font-body text-xs uppercase tracking-widest text-foreground-muted">
            Foto de Adrián — próximamente
          </span>
        </div>
      )}
    </div>
  );
}
