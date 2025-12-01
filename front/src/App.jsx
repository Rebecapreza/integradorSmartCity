import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/pages/login";
// ... outros imports
import Home from "./components/pages/home";
import Sensores from "./components/pages/sensores";
import Ambientes from "./components/pages/ambientes"; // <--- 1. IMPORTAR AQUI
import PrivateRoute from "./components/utils/privateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/sensores/:tipo" element={<Sensores />} />
          {/* 2. ADICIONAR A ROTA ABAIXO */}
          <Route path="/ambientes" element={<Ambientes />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;