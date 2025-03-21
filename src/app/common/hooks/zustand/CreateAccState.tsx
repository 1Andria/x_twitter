import { create } from "zustand";

type CrAccType = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

export const useCreateAcc = create<CrAccType>((set) => ({
  open: false,
  setOpen: (value) => set(() => ({ open: value })),
}));
