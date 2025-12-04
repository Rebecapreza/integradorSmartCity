import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Sidebar from '../utils/Sidebar';
import '../styles/ambientes.css'; 

const Historico = () => {
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistorico = async () => {
      try {
        const response = await api.get('/historico/');
        setHistorico(response.data);
      } catch (err) {
        console.error("Erro ao carregar histórico", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistorico();
  }, []);

  const formatarData = (isoString) => {
    const data = new Date(isoString);
    return data.toLocaleString('pt-BR');
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        <header className="page-header">
          <h1><span>📅</span> Histórico de Medições</h1>
        </header>
        
        <section className="content-box">
          {loading ? <p>Carregando...</p> : (
            <div className="table-responsive">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Sensor</th>
                    <th>Valor</th>
                    <th>Data/Hora</th>
                  </tr>
                </thead>
                <tbody>
                  {historico.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.sensor}</td> 
                      <td style={{fontWeight: 'bold', color: '#000057'}}>{item.valor}</td>
                      <td>{formatarData(item.data_hora)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Historico;