import type { Config } from "tailwindcss";

// Design tokens centralizados. Cualquier valor de color/tipografía/sombra usado
// en componentes debe venir de aquí — evita valores sueltos tipo `bg-[#111]`.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#0a0a0b", // negro casi puro, base de toda la página
          elevated: "#141417", // superficie de tarjetas antes del efecto glass
          overlay: "#1c1c21",
        },
        foreground: {
          DEFAULT: "#f5f5f7", // texto principal sobre fondo oscuro (AA garantizado)
          muted: "#a1a1aa", // texto secundario, sigue en AA sobre background.DEFAULT
        },
        accent: {
          primary: "#39ff14", // verde neón — CTAs y highlights de máxima jerarquía
          "primary-dim": "#2bd60f",
          secondary: "#8b5cf6", // violeta eléctrico — acentos secundarios, badges
          "secondary-dim": "#7c4fe0",
        },
        border: {
          DEFAULT: "rgba(255,255,255,0.08)",
          strong: "rgba(255,255,255,0.16)",
        },
      },
      fontFamily: {
        display: ["var(--font-orbitron)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        "glow-primary": "0 0 24px rgba(57,255,20,0.35), 0 0 48px rgba(57,255,20,0.12)",
        "glow-primary-sm": "0 0 12px rgba(57,255,20,0.45)",
        "glow-secondary": "0 0 24px rgba(139,92,246,0.4), 0 0 48px rgba(139,92,246,0.15)",
        card: "0 8px 32px rgba(0,0,0,0.4)",
      },
      backgroundImage: {
        "grid-fade":
          "radial-gradient(circle at 50% 0%, rgba(139,92,246,0.15), transparent 60%)",
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
