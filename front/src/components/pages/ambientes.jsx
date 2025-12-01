import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Sidebar from '../utils/Sidebar'; // <--- Importe a Sidebar aqui
import '../styles/ambientes.css';

const Ambientes = () => {
  const [ambientes, setAmbientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAmbientes = async () => {
      try {
        const response = await api.get('/ambientes/');
        setAmbientes(response.data);
      } catch (err) {
        console.error("Erro ao buscar ambientes", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAmbientes();
  }, []);

  return (
    <div className="dashboard-container">
      {/* Sidebar Reutilizável */}
      <Sidebar />

      <main className="main-content">
        <header className="page-header">
          <h1><span>🏢</span> Ambientes</h1>
        </header>

        <div className="search-bar-container">
          {/* Espaço para filtros futuros */}
        </div>

        <section className="content-box">
          {loading && <p>Carregando dados...</p>}

          {!loading && (
            <div className="table-responsive">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome da Sala</th>
                    <th>Responsável</th>
                  </tr>
                </thead>
                <tbody>
                  {ambientes.map((amb) => (
                    <tr key={amb.id}>
                      <td>{amb.id}</td>
                      <td>{amb.descricao || amb.local}</td> 
                      <td>{amb.responsavel_nome || amb.responsavel || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <footer className="dashboard-footer">
          SmartCity Project © Todos os direitos reservados
        </footer>
      </main>
    </div>
  );
};

export default Ambientes;