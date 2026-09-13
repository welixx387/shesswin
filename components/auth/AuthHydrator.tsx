"use client";

import { useEffect } from "react";
import { useAuthStore, type AuthUser } from "@/lib/auth-store";
import { useProgressStore } from "@/lib/store";

export function AuthHydrator() {
  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        const res = await fetch("/api/auth/me");
        const data: { user: AuthUser | null } = await res.json();
        if (cancelled) return;
        useAuthStore.getState().setUser(data.user);

        if (data.user) {
          const progressRes = await fetch("/api/progress");
          if (progressRes.ok && !cancelled) {
            const progressData: { progress: { openingSlug: string; xp: number }[] } = await progressRes.json();
            const completedSlugs = progressData.progress.map((p) => p.openingSlug);
            const xp = progressData.progress.reduce((sum, p) => sum + p.xp, 0);
            useProgressStore.setState({ completedSlugs, xp });
          }
        }
      } catch {
        if (!cancelled) useAuthStore.getState().setStatus("unauthenticated");
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
