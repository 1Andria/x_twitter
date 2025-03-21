import { create } from "zustand";

type SeenTypes = {
  seen: boolean;
  setSeen: () => void;
};

export const useSeenPassword = create<SeenTypes>((set) => ({
  seen: false,
  setSeen: () => set((state) => ({ seen: !state.seen })),
}));
