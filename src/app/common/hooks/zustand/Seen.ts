import { create } from "zustand";
import { SeenTypes } from "../../Types/Common";

export const useSeenPassword = create<SeenTypes>((set) => ({
  seen: false,
  setSeen: () => set((state) => ({ seen: !state.seen })),
}));
