import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import Sidebar from '../utils/Sidebar';
import '../styles/sensores.css'; // Reutilizando o CSS de formulário

const ResponsavelForm = () => {
  const [formData, setFormData] = useState({ nome: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchDados = async () => {
        try {
          const response = await api.get(`/responsaveis/${id}/`);
          setFormData(response.data);
        } catch (error) {
          console.error("Erro ao carregar dados", error);
        }
      };
      fetchDados();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await api.put(`/responsaveis/${id}/`, formData);
        alert('Responsável atualizado!');
      } else {
        await api.post('/responsaveis/', formData);
        alert('Responsável criado!');
      }
      navigate('/responsaveis');
    } catch (error) {
      console.error("Erro ao salvar", error);
      alert('Erro ao salvar. Verifique os dados.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        <header className="page-header">
          <h1><span>👥</span> {id ? 'Editar Responsável' : 'Novo Responsável'}</h1>
        </header>

        <section className="content-box">
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '600px', margin: '0 auto' }}>
            
            <div className="form-group">
              <label>Nome:</label>
              <input 
                type="text" 
                value={formData.nome} 
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })} 
                required 
                className="filter-select" 
                style={{width: '100%'}} 
              />
            </div>

            <button type="submit" disabled={loading} style={{
              marginTop: '20px', padding: '12px', backgroundColor: '#0d1b2a',
              color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer'
            }}>
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default ResponsavelForm;