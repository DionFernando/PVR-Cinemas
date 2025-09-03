import { create } from 'zustand';

type AuthState = {
  user: { uid: string; email?: string } | null;
  setUser: (u: AuthState['user']) => void;
  signOutLocal: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (u) => set({ user: u }),
  signOutLocal: () => set({ user: null }),
}));
