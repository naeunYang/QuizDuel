import type { ReceiveSocketMessage } from "@/types/receive-socket-message.types";
import type { SendSocketMessage } from "@/types/send-socket-message.types";
import { useEffect, useRef, createContext, useContext, useState } from "react";

const socketUrl = "ws://localhost:3001";

type SocketContextType = {
  subscribe: (fn: (msg: ReceiveSocketMessage) => void) => () => void; // 함수를 받아서 또 다른 함수를 반환(구독 함수를 받아서 구독 해제 함수 반환)
  send: (msg: SendSocketMessage) => void;
  isConnected: boolean;
};

const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);
  const listenersRef = useRef(new Set<(msg: ReceiveSocketMessage) => void>());

  useEffect(() => {
    const socket = new WebSocket(socketUrl);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("====   WebSocket is Connected...!!!   ====");
      setIsConnected(true);
    };

    socket.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      listenersRef.current.forEach((fn) => fn(msg));
      // listenersRef에 있는 모든 구독 함수(fn)를 호출하며 메시지 전달. 즉, 구독 중인 모든 컴포넌트에 메시지를 뿌려주는 역할
    };

    socket.onerror = (e) => {
      console.error("WebSocket error:", e);
    };

    socket.onclose = () => {
      console.log("====   WebSocket is Disconnected...!!!   ====");
    };

    return () => socket.close();
  }, []);

  const subscribe = (fn: (msg: ReceiveSocketMessage) => void) => {
    listenersRef.current.add(fn);
    return () => listenersRef.current.delete(fn);
  };

  const send = (msg: SendSocketMessage) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(msg));
    }
  };

  return (
    <SocketContext.Provider value={{ subscribe, send, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) throw new Error("SocketContext에 문제가 있음");
  return context;
};
