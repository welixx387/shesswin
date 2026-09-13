import { create } from "zustand";
import { persist } from "zustand/middleware";

type ProgressState = {
  completedSlugs: string[];
  xp: number;
  markCompleted: (slug: string, xpReward?: number) => void;
  isCompleted: (slug: string) => boolean;
  resetProgress: () => void;
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedSlugs: [],
      xp: 0,
      markCompleted: (slug, xpReward = 50) => {
        if (get().completedSlugs.includes(slug)) return;
        set((state) => ({
          completedSlugs: [...state.completedSlugs, slug],
          xp: state.xp + xpReward,
        }));
      },
      isCompleted: (slug) => get().completedSlugs.includes(slug),
      resetProgress: () => set({ completedSlugs: [], xp: 0 }),
    }),
    { name: "shesswin-progress" }
  )
);
