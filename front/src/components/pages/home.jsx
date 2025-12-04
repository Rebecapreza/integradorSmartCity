import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Sidebar from '../utils/Sidebar';
import '../styles/home.css';

const Home = () => {
  const navigate = useNavigate();
  
  const [sensores, setSensores] = useState([]);
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [resSensores, resHistorico] = await Promise.all([
          api.get('/sensores/'),
          api.get('/historico/')
        ]);

        setSensores(resSensores.data);
        setHistorico(resHistorico.data);
      } catch (error) {
        console.error("Erro ao buscar dados para o dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // --- Lógica ---
  const totalSensores = sensores.length;
  const sensoresAtivos = sensores.filter(s => s.status === true).length;
  const sensoresInativos = totalSensores - sensoresAtivos;

  const dadosGraficoTemp = historico
    .filter(h => {
      const sensorRelacionado = sensores.find(s => s.id === h.sensor);
      return sensorRelacionado && sensorRelacionado.tipo === 'temperatura';
    })
    .sort((a, b) => new Date(a.data_hora) - new Date(b.data_hora))
    .slice(-10)
    .map(h => ({
      hora: new Date(h.data_hora).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      valor: h.valor
    }));

  const irParaSensor = (tipo) => {
    navigate(`/sensores/${tipo}`);
  };

  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="main-content">
        <section className="hero-banner">
          <h1>Bem-vindo ao SmartCity!</h1>
          <p>Visão geral do sistema de monitoramento urbano em tempo real.</p>
        </section>

        {/* --- DASHBOARDS --- */}
        <section className="dashboard-metrics">
          
          {/* Cards de Resumo */}
          <div className="kpi-container">
            <div className="card-kpi">
              <h3>Total de Sensores</h3>
              <p className="card-number">{loading ? '...' : totalSensores}</p>
            </div>
            
            <div className="card-kpi card-active">
              <h3>Sensores Ativos</h3>
              <p className="card-number text-green">{loading ? '...' : sensoresAtivos}</p>
            </div>
            
            <div className="card-kpi card-inactive">
              <h3>Sensores Inativos</h3>
              <p className="card-number text-red">{loading ? '...' : sensoresInativos}</p>
            </div>
          </div>

        </section>

        {/* --- Botões de Navegação --- */}
        <section className="monitoring-section">
          <div className="monitoring-header">
            <h2>
              <span className="material-symbols-outlined" style={{ fontSize: '36px', marginRight: '10px', verticalAlign: 'middle' }}>
                sensors
              </span> 
              Acesso Rápido
            </h2>
          </div>

          <div className="sensor-grid">
            <div className="sensor-circle" onClick={() => irParaSensor('temperatura')}>
              <span className="material-symbols-outlined">device_thermostat</span>
              <span className="sensor-label">Temperatura</span>
            </div>

            <div className="sensor-circle" onClick={() => irParaSensor('umidade')}>
              <span className="material-symbols-outlined">humidity_percentage</span>
              <span className="sensor-label">Umidade</span>
            </div>

            <div className="sensor-circle" onClick={() => irParaSensor('luminosidade')}>
              <span className="material-symbols-outlined">light_mode</span>
              <span className="sensor-label">Luminosidade</span>
            </div>

            <div className="sensor-circle" onClick={() => irParaSensor('contador')}>
              <span className="material-symbols-outlined">people</span>
              <span className="sensor-label">Contador</span>
            </div>
            
            <div className="sensor-circle" onClick={() => navigate("/historico")}>
              <span className="material-symbols-outlined">calendar_month</span>
              <span className="sensor-label">Histórico</span>
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