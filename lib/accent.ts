import type { AccentColor } from "@/types/opening";

export const accentClasses: Record<
  AccentColor,
  { text: string; bg: string; border: string; glow: string; solidBg: string }
> = {
  primary: {
    text: "text-accent-glow",
    bg: "bg-accent-primary/15",
    border: "border-accent-primary/40",
    glow: "hover:shadow-glow-primary",
    solidBg: "bg-accent-primary",
  },
  gold: {
    text: "text-accent-gold",
    bg: "bg-accent-gold/15",
    border: "border-accent-gold/40",
    glow: "hover:shadow-glow-gold",
    solidBg: "bg-accent-gold",
  },
  success: {
    text: "text-accent-success",
    bg: "bg-accent-success/15",
    border: "border-accent-success/40",
    glow: "hover:shadow-glow-success",
    solidBg: "bg-accent-success",
  },
};
