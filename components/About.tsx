import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Reveal } from "@/components/ui/Reveal";

interface AboutProps {
  name: string;
  tagline: string;
  bio: string;
  photoUrl?: string;
  /** Credenciales verificables (certificaciones, títulos). Omitir si no hay ninguna confirmada. */
  credentials?: string[];
}

/**
 * name/tagline/bio de abajo (en page.tsx) son copy genérico y defendible
 * sobre la filosofía del método — no inventan cifras, años de experiencia
 * ni credenciales. `credentials` se deja vacío a propósito: publicar
 * certificaciones inventadas es peor que no mostrar ninguna. En cuanto
 * Adrián confirme las suyas, se añaden aquí sin tocar el componente.
 * `photoUrl` usa el mismo PhotoFrame que Hero — placeholder honesto hasta
 * que llegue la foto real.
 */
export function About({ name, tagline, bio, photoUrl, credentials }: AboutProps) {
  return (
    <section className="px-4 py-20 md:py-32" id="sobre-mi">
      <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <PhotoFrame src={photoUrl} alt={`Foto de ${name}`} className="mx-auto max-w-sm lg:max-w-none" />
        </Reveal>

        <Reveal delayMs={80}>
          <h2 className="font-display text-3xl text-foreground sm:text-4xl">{name}</h2>
          <p className="mt-2 font-body text-sm uppercase tracking-widest text-accent-primary">
            {tagline}
          </p>
          <p className="mt-5 font-body text-lg text-foreground-muted">{bio}</p>
          {credentials && credentials.length > 0 ? (
            <ul className="mt-6 flex flex-wrap gap-2">
              {credentials.map((credential) => (
                <li
                  key={credential}
                  className="rounded-full border border-border-strong bg-white/5 px-3 py-1 text-xs text-foreground-muted"
                >
                  {credential}
                </li>
              ))}
            </ul>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
