import React, { createContext, useContext, useState } from "react";

interface RoomInfoContext {
  code: string;
  title?: string;
}

const defaultRoomInfo = {
  code: "",
  title: "",
};

const RoomInfoValueContext = createContext<RoomInfoContext>(defaultRoomInfo);
const SetRoomInfoSetContext = createContext<React.Dispatch<
  React.SetStateAction<RoomInfoContext>
> | null>(null);

export const RoomInfoProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [room, setRoom] = useState<RoomInfoContext>(defaultRoomInfo);

  return (
    <RoomInfoValueContext.Provider value={room}>
      <SetRoomInfoSetContext.Provider value={setRoom}>
        {children}
      </SetRoomInfoSetContext.Provider>
    </RoomInfoValueContext.Provider>
  );
};

export function useRoomInfoValueContext() {
  const value = useContext(RoomInfoValueContext);
  return value;
}

export function useSetRoomInfoContext() {
  const value = useContext(SetRoomInfoSetContext);
  if (!value) throw new Error("SetRoomInfoSetContext에 문제가 있음");
  return value;
}
