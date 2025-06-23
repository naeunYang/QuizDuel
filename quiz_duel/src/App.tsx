import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Battle from "./pages/Battle.tsx";
import Admin from "./pages/Admin.tsx";
import Notfound from "./pages/Notfount.tsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/battle/:code" element={<Battle />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;
