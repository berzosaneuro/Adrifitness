// Renderizador compartido para las imágenes generadas con next/og
// (ImageResponse / satori): solo soporta estilos inline tipo flexbox, nada
// de Tailwind ni CSS externo — de ahí que use un objeto de estilos aparte
// en vez de className.
export function BrandOgImage({
  eyebrow,
  headline,
  highlight,
}: {
  eyebrow: string;
  headline: string;
  highlight: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0b",
        backgroundImage:
          "radial-gradient(circle at 50% 20%, rgba(139,92,246,0.35), transparent 60%)",
        fontFamily: "sans-serif",
        padding: "0 96px",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 28,
          letterSpacing: 6,
          textTransform: "uppercase",
          color: "#8b5cf6",
          marginBottom: 28,
        }}
      >
        {eyebrow}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 68,
          fontWeight: 800,
          textAlign: "center",
          lineHeight: 1.2,
          color: "#f5f5f7",
        }}
      >
        {headline}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 68,
          fontWeight: 800,
          textAlign: "center",
          lineHeight: 1.2,
          color: "#39ff14",
          marginTop: 4,
        }}
      >
        {highlight}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 30,
          color: "#a1a1aa",
          marginTop: 36,
        }}
      >
        Adrián Method
      </div>
    </div>
  );
}
