import { create } from "zustand";

type RegisterStepTypes = {
  firstLevel: boolean;
  passwordLevel: boolean;
  setToPasswordLevel: () => void;
  setToPasswordLevelReverse: () => void;
};

export const useRegistrationSteps = create<RegisterStepTypes>((set) => ({
  firstLevel: true,
  passwordLevel: false,
  setToPasswordLevel: () =>
    set(() => ({
      firstLevel: false,
      passwordLevel: true,
    })),
  setToPasswordLevelReverse: () =>
    set(() => ({
      firstLevel: true,
      passwordLevel: false,
    })),
}));
