import { useAuthStore } from "@/lib/auth-store";
import { useProgressStore } from "@/lib/store";

export function markOpeningComplete(slug: string) {
  useProgressStore.getState().markCompleted(slug, 50);

  const user = useAuthStore.getState().user;
  if (!user) return;

  fetch("/api/progress", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ openingSlug: slug }),
  }).catch(() => {
    // best-effort server sync — local progress already reflects completion
  });
}
