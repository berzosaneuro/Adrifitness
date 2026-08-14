import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";

const FIT: string[] = [
  "Quieres resultados reales y estás dispuesto a ser constante.",
  "Prefieres un plan hecho a tu medida antes que una plantilla genérica.",
  "Valoras el seguimiento cercano y poder preguntar cuando lo necesites.",
  "Buscas cambios sostenibles a largo plazo, no un atajo de un mes.",
];

const NOT_FIT: string[] = [
  "Buscas un atajo mágico sin cambiar ningún hábito.",
  "No estás dispuesto a seguir un plan ni registrar tu progreso.",
  "Buscas la opción más barata del mercado, no la más adecuada para ti.",
];

export function WhoItsFor() {
  return (
    <section className="px-4 py-20 md:py-32" id="para-ti">
      <div className="mx-auto max-w-4xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl text-foreground sm:text-4xl">
            ¿Es esto para ti?
          </h2>
          <p className="mt-3 font-body text-foreground-muted">
            Antes de escribirme, léelo con sinceridad — así no le hacemos perder el tiempo a nadie.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Reveal>
            <Card glow="primary" className="h-full p-6">
              <h3 className="font-display text-sm uppercase tracking-widest text-accent-primary">
                Sí, si...
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {FIT.map((item) => (
                  <li key={item} className="flex items-start gap-3 font-body text-sm text-foreground">
                    <span aria-hidden className="mt-0.5 text-accent-primary">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>

          <Reveal delayMs={80}>
            <Card className="h-full p-6">
              <h3 className="font-display text-sm uppercase tracking-widest text-foreground-muted">
                No, si...
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {NOT_FIT.map((item) => (
                  <li key={item} className="flex items-start gap-3 font-body text-sm text-foreground-muted">
                    <span aria-hidden className="mt-0.5">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
