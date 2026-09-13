import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#0A0E1A",
        "bg-secondary": "#111827",
        "surface-glass": "rgba(255, 255, 255, 0.05)",
        "border-subtle": "rgba(255, 255, 255, 0.08)",
        "accent-primary": "#6366F1",
        "accent-glow": "#818CF8",
        "accent-success": "#10B981",
        "accent-gold": "#F59E0B",
        "text-primary": "#F9FAFB",
        "text-secondary": "#9CA3AF",
        "board-light": "#EBECD0",
        "board-dark": "#739552",
        "board-highlight": "rgba(255, 213, 79, 0.5)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-inter-tight)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      boxShadow: {
        "glow-primary": "0 0 40px rgba(99, 102, 241, 0.4)",
        "glow-primary-lg": "0 0 80px rgba(99, 102, 241, 0.35)",
        "glow-success": "0 0 40px rgba(16, 185, 129, 0.35)",
        "glow-gold": "0 0 40px rgba(245, 158, 11, 0.35)",
        glass: "0 8px 32px rgba(0, 0, 0, 0.35)",
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, #6366F1 0%, #10B981 100%)",
        "gradient-border": "linear-gradient(135deg, #6366F1 0%, #818CF8 50%, transparent 100%)",
        "gradient-radial": "radial-gradient(circle at center, var(--tw-gradient-stops))",
      },
      keyframes: {
        "aurora-float-1": {
          "0%, 100%": { transform: "translate(0%, 0%) scale(1)" },
          "33%": { transform: "translate(8%, -10%) scale(1.1)" },
          "66%": { transform: "translate(-6%, 6%) scale(0.95)" },
        },
        "aurora-float-2": {
          "0%, 100%": { transform: "translate(0%, 0%) scale(1)" },
          "33%": { transform: "translate(-10%, 8%) scale(0.9)" },
          "66%": { transform: "translate(6%, -8%) scale(1.05)" },
        },
        "aurora-float-3": {
          "0%, 100%": { transform: "translate(-50%, -50%) scale(1)" },
          "50%": { transform: "translate(-45%, -55%) scale(1.15)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(0.85)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "aurora-float-1": "aurora-float-1 24s ease-in-out infinite",
        "aurora-float-2": "aurora-float-2 28s ease-in-out infinite",
        "aurora-float-3": "aurora-float-3 32s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "pulse-glow": "pulse-glow 1.5s ease-in-out infinite",
        "spin-slow": "spin-slow 12s linear infinite",
        marquee: "marquee 24s linear infinite",
      },
      transitionTimingFunction: {
        "board-move": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
