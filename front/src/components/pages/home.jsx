import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../utils/Sidebar'; // <--- Importe a Sidebar aqui
import '../styles/home.css';

const Home = () => {
  const navigate = useNavigate();

  // Função para navegar pelos botões do dashboard
  const irParaSensor = (tipo) => {
    navigate(`/sensores/${tipo}`);
  };

  return (
    <div className="dashboard-container">
      {/* Usando o componente Sidebar isolado */}
      <Sidebar />

      {/* --- Conteúdo Principal --- */}
      <main className="main-content">

        <section className="hero-banner">
          <h1>Bem-vindo ao SmartCity!</h1>
          <p>
            Monitore em tempo real temperatura, umidade, luminosidade e
            fluxo de pessoas. Tenha controle total e insights visuais para a
            gestão eficiente dos ambientes.
          </p>
        </section>

        <section className="monitoring-section">
          <div className="monitoring-header">
            <h2>📡 Sensores</h2>
          </div>

          <div className="sensor-grid">
            <div className="sensor-circle" onClick={() => irParaSensor('temperatura')}>
              <span className="sensor-icon">🌡️</span>
              <span className="sensor-label">Temperatura</span>
            </div>

            <div className="sensor-circle" onClick={() => irParaSensor('umidade')}>
              <span className="sensor-icon">💧</span>
              <span className="sensor-label">Umidade</span>
            </div>

            <div className="sensor-circle" onClick={() => irParaSensor('luminosidade')}>
              <span className="sensor-icon">☀️</span>
              <span className="sensor-label">Luminosidade</span>
            </div>

            <div className="sensor-circle" onClick={() => irParaSensor('contador')}>
              <span className="sensor-icon">🟰</span>
              <span className="sensor-label">Contador</span>
            </div>
          </div>
        </section>

        <footer className="dashboard-footer">
          SmartCity Project © Todos os direitos reservados
        </footer>
      </main>
    </div>
  );
};

export default Home;