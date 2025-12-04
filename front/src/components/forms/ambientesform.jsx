import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import Sidebar from '../utils/Sidebar';
import '../styles/sensores.css';

const AmbienteForm = () => {
  const [formData, setFormData] = useState({
    descricao: '',
    responsavel: '', // ID do responsável
    local: ''        // ID do local (FK)
  });
  
  const [responsaveis, setResponsaveis] = useState([]);
  const [locais, setLocais] = useState([]); // Caso tenha endpoint de locais
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // 1. Carregar Responsáveis para o Select
    const fetchAuxData = async () => {
      try {
        const resResp = await api.get('/responsaveis/');
        setResponsaveis(resResp.data);
        
        // Tenta carregar locais se existir endpoint, senão ignora erro silenciosamente
        try {
            const resLocais = await api.get('/locais/'); // Se não tiver esse endpoint, o select ficará vazio ou usaremos input texto
            setLocais(resLocais.data);
        } catch (e) { console.log("Endpoint locais não encontrado, usando input manual"); }

      } catch (error) {
        console.error("Erro ao carregar dados auxiliares", error);
      }
    };
    fetchAuxData();

    // 2. Carregar dados se for edição
    if (id) {
      const fetchAmbiente = async () => {
        try {
          const response = await api.get(`/ambientes/${id}/`);
          const dados = response.data;
          // Ajustes se o backend retornar objeto aninhado
          if (dados.responsavel && typeof dados.responsavel === 'object') dados.responsavel = dados.responsavel.id;
          if (dados.local && typeof dados.local === 'object') dados.local = dados.local.id;
          
          setFormData(dados);
        } catch (error) {
          console.error("Erro ao carregar ambiente", error);
        }
      };
      fetchAmbiente();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await api.put(`/ambientes/${id}/`, formData);
        alert('Ambiente atualizado!');
      } else {
        await api.post('/ambientes/', formData);
        alert('Ambiente criado!');
      }
      navigate('/ambientes');
    } catch (error) {
      console.error("Erro ao salvar", error);
      alert('Erro ao salvar. Verifique se o ID do Local é válido.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        <header className="page-header">
          <h1><span>🏢</span> {id ? 'Editar Ambiente' : 'Novo Ambiente'}</h1>
        </header>

        <section className="content-box">
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '600px', margin: '0 auto' }}>
            
            <div className="form-group">
              <label>Descrição:</label>
              <input type="text" name="descricao" value={formData.descricao} onChange={handleChange} required className="filter-select" style={{width: '100%'}} />
            </div>

            {/* Select de Responsável */}
            <div className="form-group">
              <label>Responsável:</label>
              <select name="responsavel" value={formData.responsavel || ''} onChange={handleChange} className="filter-select" style={{width: '100%'}}>
                <option value="">Selecione...</option>
                {responsaveis.map(resp => (
                  <option key={resp.id} value={resp.id}>{resp.nome}</option>
                ))}
              </select>
            </div>

            {/* Input de Local (Se tiver lista usa select, se não usa input numérico ID) */}
            <div className="form-group">
              <label>Local (ID ou Seleção):</label>
              {locais.length > 0 ? (
                  <select name="local" value={formData.local || ''} onChange={handleChange} required className="filter-select" style={{width: '100%'}}>
                    <option value="">Selecione o Local...</option>
                    {locais.map(loc => (
                        <option key={loc.id} value={loc.id}>{loc.local}</option>
                    ))}
                  </select>
              ) : (
                  <input type="number" name="local" value={formData.local} onChange={handleChange} required placeholder="ID do Local" className="filter-select" style={{width: '100%'}} />
              )}
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

export default AmbienteForm;