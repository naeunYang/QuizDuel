import { create } from "zustand";

interface TimeOver {
  isTimeOver: boolean;
  setTimeOver: (isTimeOver: boolean) => void;
}

export const useTimeOver = create<TimeOver>((set) => ({
  isTimeOver: false,
  setTimeOver: (isTimeOver) => set({ isTimeOver }),
}));
