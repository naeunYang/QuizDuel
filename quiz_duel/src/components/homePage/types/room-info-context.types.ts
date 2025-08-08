import type { RoomInfo } from "@/components/homePage/types/roomInfo.types";

export interface RoonInfoContextType {
  room: RoomInfo;
  setRoom: React.Dispatch<React.SetStateAction<RoomInfo>>;
}
