import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/pages/login";
import Home from "./components/pages/home";
import Sensores from "./components/pages/sensores";
import Ambientes from "./components/pages/ambientes";
import PrivateRoute from "./components/utils/privateRoute";
import Historico from "./components/pages/historico";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/sensores/:tipo" element={<Sensores />} />
          <Route path="/ambientes" element={<Ambientes />} /> 
          <Route path="/historico" element={<Historico />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;