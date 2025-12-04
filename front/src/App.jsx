import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../src/components/pages/login";
import Home from "../src/components/pages/home";

import Sensores from "../src/components/pages/sensores";
import Ambientes from "../src/components/pages/ambientes";
import Responsaveis from "../src/components/pages/responsaveis";

import PrivateRoute from "../src/components/utils/privateRoute";

import Historico from "../src/components/pages/historico";
import SensorForm from "../src/components/forms/sensorform";
import ResponsavelForm from "../src/components/forms/responsavelform";
import AmbienteForm from "../src/components/forms/ambientesform";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/historico" element={<Historico />} />

          {/* Rotas de Sensores */}
          <Route path="/sensores/:tipo" element={<Sensores />} />
          <Route path="/sensores/novo" element={<SensorForm />} />

          {/* Rotas de Responsáveis */}
          <Route path="/responsaveis" element={<Responsaveis />} />
          <Route path="/responsaveis/novo" element={<ResponsavelForm />} />
          <Route path="/responsaveis/editar/:id" element={<ResponsavelForm />} />

          {/* Rotas de Ambientes */}
          <Route path="/ambientes" element={<Ambientes />} />
          <Route path="/ambientes/novo" element={<AmbienteForm />} />
          <Route path="/ambientes/editar/:id" element={<AmbienteForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;