import { create } from "zustand";
import type { UserStatus as status } from "@/types/user-status";

interface UserStatus {
  userStatus: status;
  setUserStatus: (status: status) => void;
}

export const useUserStatus = create<UserStatus>((set) => ({
  userStatus: "Non-Submit",
  setUserStatus: (stat: status) => set({ userStatus: stat }),
}));
