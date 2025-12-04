import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/sidebar.css';
import logo from '../../assets/Logo.png';


const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Hook para saber em qual URL estamos

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
  };

  // Função auxiliar para definir se o botão está ativo
  const isActive = (path) => {
    return location.pathname.startsWith(path) ? 'nav-item active' : 'nav-item';
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="Logo" className="sidebar-logo-img" />
      </div>

      <nav className="sidebar-nav">
        <button
          className={isActive('/home')}
          onClick={() => navigate('/home')}
        >
          <span className="nav-icon material-symbols-outlined">home</span>
          <span>Home</span>
        </button>

        <button
          className={isActive('/ambientes')}
          onClick={() => navigate('/ambientes')}
        >
          <span className="nav-icon material-symbols-outlined">business</span>
          <span>Ambientes</span>
        </button>

        <button
          className={isActive('/sensores')}
          onClick={() => navigate('/sensores/temperatura')}
        >
          <span className="nav-icon material-symbols-outlined">sensors</span>
          <span>Sensores</span>
        </button>

        <button
          className={isActive('/responsaveis')}
          onClick={() => navigate('/responsaveis')}
        >
          <span className="nav-icon material-symbols-outlined">groups</span>
          <span>Responsáveis</span>
        </button>

        <button className="nav-item" onClick={handleLogout}>
          <span className="nav-icon material-symbols-outlined">logout</span>
          <span>Sair</span>
        </button>

        

      </nav>
    </aside>
  );
};

export default Sidebar;