import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/pages/login";
import Cadastro from "./components/pages/cadastro";
import Home from "./components/pages/home";
import Sensores from "./components/pages/sensores"; // Importe a nova página
import PrivateRoute from "./components/utils/privateRoute"; // Importe o Guard
import Ambientes from "./components/pages/ambientes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/login" element={<Login />} />

        {/* Redirecionar raiz para login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Rotas Privadas (Protegidas) */}
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          {/* Rota dinâmica para pegar o tipo (temperatura, umidade, etc) */}
          <Route path="/sensores/:tipo" element={<Sensores />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
