import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import api from '../services/api';
import Sidebar from '../utils/Sidebar';
import '../styles/ambientes.css'; 
import '../styles/sensores.css'; // Importando para usar as classes .btn-action, .search-bar, etc

const Responsaveis = () => {
  const [responsaveis, setResponsaveis] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResponsaveis = async () => {
      try {
        const response = await api.get('/responsaveis/');
        setResponsaveis(response.data);
      } catch (err) {
        console.error("Erro ao buscar responsáveis", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResponsaveis();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir?")) {
      try {
        await api.delete(`/responsaveis/${id}/`);
        setResponsaveis(responsaveis.filter(item => item.id !== id));
        alert("Excluído com sucesso!");
      } catch (err) {
        alert("Erro ao excluir. Verifique se há vínculos.");
      }
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        
        <header className="page-header">
          <h1><span>👥</span> Responsáveis</h1>
        </header>
        
        <div className="search-bar-container">
            <button className="btn-add" onClick={() => navigate('/responsaveis/novo')}>
                <span>+</span> Novo Responsável
            </button>
        </div>

        <section className="content-box">
          {loading ? <p>Carregando...</p> : (
            <div className="table-responsive">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {responsaveis.map((resp) => (
                    <tr key={resp.id}>
                      <td>{resp.id}</td>
                      <td>{resp.nome}</td>
                      <td className="action-cell">
                        <button 
                          className="btn-action btn-edit"
                          onClick={() => navigate(`/responsaveis/editar/${resp.id}`)}
                          title="Editar"
                        >
                          ✏️
                        </button>
                        <button 
                          className="btn-action btn-delete"
                          onClick={() => handleDelete(resp.id)}
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

export default Responsaveis;