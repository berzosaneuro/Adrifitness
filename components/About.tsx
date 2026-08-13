import Image from "next/image";
import { Card } from "@/components/ui/Card";

interface AboutProps {
  name: string;
  tagline: string;
  bio: string;
  photoUrl?: string;
  credentials?: string[];
}

/**
 * Componente listo para recibir la bio real de Adrián, pero NO se monta
 * todavía en app/page.tsx: no tenemos foto, biografía ni credenciales
 * reales, y publicar credenciales inventadas es más grave que no tener la
 * sección (falsa acreditación profesional). Ver lista de pendientes al
 * final de la respuesta — en cuanto llegue el copy real, se pasa como
 * props aquí sin tocar el componente.
 */
export function About({ name, tagline, bio, photoUrl, credentials }: AboutProps) {
  return (
    <section className="px-4 py-16 md:py-24" id="sobre-mi">
      <div className="mx-auto max-w-4xl">
        <Card className="grid grid-cols-1 gap-8 p-8 sm:grid-cols-[auto_1fr] sm:items-center">
          {photoUrl ? (
            <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full border-2 border-accent-primary/50 sm:mx-0">
              <Image src={photoUrl} alt={`Foto de ${name}`} fill sizes="128px" className="object-cover" />
            </div>
          ) : null}
          <div>
            <h2 className="font-display text-2xl text-foreground">{name}</h2>
            <p className="mt-1 font-body text-sm text-accent-primary">{tagline}</p>
            <p className="mt-4 font-body text-foreground-muted">{bio}</p>
            {credentials && credentials.length > 0 ? (
              <ul className="mt-4 flex flex-wrap gap-2">
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
          </div>
        </Card>
      </div>
    </section>
  );
}
