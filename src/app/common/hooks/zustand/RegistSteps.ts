import { create } from "zustand";

type RegisterStepTypes = {
  firstLevel: boolean;
  passwordLevel: boolean;
  setToPasswordLevel: () => void;
};

export const useRegistrationSteps = create<RegisterStepTypes>((set) => ({
  firstLevel: true,
  passwordLevel: false,
  setToPasswordLevel: () =>
    set(() => ({
      firstLevel: false,
      passwordLevel: true,
    })),
}));
