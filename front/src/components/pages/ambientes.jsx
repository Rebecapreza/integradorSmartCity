import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Sidebar from '../utils/Sidebar';
import '../styles/ambientes.css';
import '../styles/sensores.css'; // Importando para reutilizar os estilos da barra e botões

const Ambientes = () => {
  const [ambientes, setAmbientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este ambiente?")) {
      try {
        await api.delete(`/ambientes/${id}/`);
        setAmbientes(ambientes.filter(amb => amb.id !== id));
        alert("Ambiente excluído!");
      } catch (err) {
        alert("Erro ao excluir ambiente. Verifique se há sensores vinculados.");
      }
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        
        <header className="page-header">
          <h1><span>🏢</span> Ambientes</h1>
        </header>
        
        {/* --- BARRA DE FERRAMENTAS --- */}
        <div className="search-bar-container">
            {/* Lado Direito: Botão Novo */}
            <button 
                className="btn-add" 
                onClick={() => navigate('/ambientes/novo')}
            >
                <span>+</span> Novo Ambiente
            </button>
        </div>

        <section className="content-box">
          {loading && <p style={{ padding: '20px' }}>Carregando dados...</p>}

          {!loading && (
            <div className="table-responsive">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Local / Descrição</th>
                    <th>Responsável</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {ambientes.map((amb) => (
                    <tr key={amb.id}>
                      <td>{amb.id}</td>
                      <td>{amb.descricao || amb.local}</td> 
                      <td>{amb.responsavel_nome || amb.responsavel || '-'}</td>
                      
                      <td className="action-cell">
                        <button 
                          className="btn-action btn-edit"
                          onClick={() => navigate(`/ambientes/editar/${amb.id}`)}
                          title="Editar"
                        >
                          ✏️
                        </button>
                        
                        <button 
                          className="btn-action btn-delete"
                          onClick={() => handleDelete(amb.id)}
                          title="Excluir"
                        >
                          🗑️
                        </button>
                      </td>
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