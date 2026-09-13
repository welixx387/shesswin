import confetti from "canvas-confetti";

const BRAND_COLORS = ["#6366F1", "#818CF8", "#10B981", "#F59E0B"];

export function fireConfetti() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  confetti({
    particleCount: 90,
    spread: 75,
    startVelocity: 40,
    origin: { y: 0.7 },
    colors: BRAND_COLORS,
    scalar: 0.9,
    ticks: 200,
  });
  confetti({
    particleCount: 60,
    spread: 110,
    startVelocity: 30,
    origin: { y: 0.65 },
    colors: BRAND_COLORS,
    scalar: 0.7,
    ticks: 200,
  });
}
