import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { SocketProvider } from "./context/SocketProvider.tsx";
import { RoomInfoProvider } from "./context/RoomInfoProvider.tsx";

// 카카오톡 공유하기 설정
const JAVASCRIPT_KEY = import.meta.env.VITE_KAKAO_SHARE_JAVASCRIPT_KEY;
window.Kakao.init(JAVASCRIPT_KEY);
window.Kakao.isInitialized();

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <SocketProvider>
      <RoomInfoProvider>
        <App />
      </RoomInfoProvider>
    </SocketProvider>
  </BrowserRouter>
);
