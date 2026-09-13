import { create } from "zustand";

export type AuthUser = { id: string; email: string; name: string; createdAt: string };
type AuthStatus = "loading" | "authenticated" | "unauthenticated";

type AuthState = {
  user: AuthUser | null;
  status: AuthStatus;
  setUser: (user: AuthUser | null) => void;
  setStatus: (status: AuthStatus) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  status: "loading",
  setUser: (user) => set({ user, status: user ? "authenticated" : "unauthenticated" }),
  setStatus: (status) => set({ status }),
}));
