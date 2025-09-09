import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Battle from "./pages/Battle.tsx";
import Admin from "./pages/Admin.tsx";
import Notfound from "./pages/Notfound.tsx";
import CreateQuiz from "./pages/CreateQuiz.tsx";
import { ProtectedRoute } from "./ProtectedRoute.tsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/battle/:code" element={<Battle />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/createquiz"
          element={
            <ProtectedRoute>
              <CreateQuiz />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;
