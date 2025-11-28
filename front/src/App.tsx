import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../src/components/pages/login';
import Cadastro from '../src/components/pages/cadastro.jsx'; 
import Home from '../src/components/pages/home.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} /> 
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;