import { create } from "zustand";

interface CurrentQuizState {
  currentIndex: number;
  increase: () => void;
}

// create: store 생성
export const useCurrentQuizStore = create<CurrentQuizState>((set) => ({
  currentIndex: 0, // 상태
  increase: () => set((state) => ({ currentIndex: state.currentIndex + 1 })), // 상태 변경 함수
}));
