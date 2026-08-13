import { Card } from "@/components/ui/Card";

interface FAQItem {
  question: string;
  answer: string;
}

// TODO: revisar con Adrián — especialmente la de precio, que hoy responde
// sin dar cifra porque no tenemos el pricing definitivo.
const faqs: FAQItem[] = [
  {
    question: "¿Necesito equipo de gimnasio?",
    answer:
      "No. Tu plan se adapta a lo que tengas disponible: gimnasio completo, equipo básico en casa o solo tu peso corporal.",
  },
  {
    question: "¿Cuánto dura el programa?",
    answer:
      "El punto de partida habitual son 12 semanas, pero el seguimiento continúa mientras sigamos trabajando juntos y ajustando tu plan.",
  },
  {
    question: "¿Soy principiante, puedo apuntarme?",
    answer:
      "Sí. El plan se diseña según tu nivel actual, no al revés — tanto si nunca has entrenado como si llevas años.",
  },
  {
    question: "¿Cuánto cuesta?",
    answer:
      "El precio depende de tu objetivo y del nivel de seguimiento que necesites. Lo hablamos sin compromiso en la primera llamada.",
  },
];

export function FAQ() {
  return (
    <section className="px-4 py-16 md:py-24" id="faq">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center font-display text-3xl text-foreground sm:text-4xl">
          Preguntas frecuentes
        </h2>

        <div className="mt-10 flex flex-col gap-4">
          {faqs.map((faq) => (
            <Card key={faq.question} className="p-6">
              <h3 className="font-display text-base text-foreground">{faq.question}</h3>
              <p className="mt-2 font-body text-sm text-foreground-muted">{faq.answer}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
