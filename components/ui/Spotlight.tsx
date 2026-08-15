// Glow radial decorativo que sigue al cursor. Puramente presentacional y
// pointer-events-none: quien actualiza --spot-x/--spot-y es el contenedor
// padre (ver Hero.tsx, que escucha mousemove en la section y setea las
// custom properties ahí — CSS custom properties heredan por el árbol del
// DOM aunque este nodo tenga pointer-events-none). Así el spotlight nunca
// bloquea clicks ni necesita su propio listener.
export function Spotlight({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 -z-10 ${className}`}
      style={{
        background:
          "radial-gradient(600px circle at var(--spot-x,50%) var(--spot-y,20%), rgba(57,255,20,0.06), transparent 60%)",
      }}
    />
  );
}
