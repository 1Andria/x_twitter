import { create } from "zustand";
type DateState = {
  selectedMonth: number | "";
  setSelectedMonth: (month: number | "") => void;
  selectedDay: number | "";
  setSelectedDay: (day: number | "") => void;
  selectedYear: number | "";
  setSelectedYear: (day: number | "") => void;
  resetDate: () => void;
};

export const useDate = create<DateState>((set) => ({
  selectedMonth: "",
  setSelectedMonth: (month) => set({ selectedMonth: month }),
  selectedDay: "",
  setSelectedDay: (day) => set({ selectedDay: day }),
  selectedYear: "",
  setSelectedYear: (year) => set({ selectedYear: year }),
  resetDate: () =>
    set({
      selectedMonth: "",
      selectedDay: "",
      selectedYear: "",
    }),
}));
