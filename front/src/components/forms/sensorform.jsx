import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import Sidebar from '../utils/Sidebar';
import '../styles/sensores.css';

const SensorForm = () => {
  const [formData, setFormData] = useState({
    tipo: 'temperatura',
    mac_address: '',
    latitude: '',
    longitude: '',
    localizacao: '',
    unidade_medida: '',
    status: true,
    observacao: '',
    ambiente: '' 
  });
  
  const [ambientes, setAmbientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // Carrega os ambientes para o select
    const fetchAmbientes = async () => {
      try {
        const response = await api.get('/ambientes/');
        setAmbientes(response.data);
      } catch (error) {
        console.error("Erro ao carregar ambientes", error);
      }
    };
    fetchAmbientes();

    // Se tiver ID, carrega os dados para edição
    if (id) {
      const fetchSensor = async () => {
        try {
          const response = await api.get(`/sensores/${id}/`);
          // Garante que o ambiente seja apenas o ID
          const dados = response.data;
          if (dados.ambiente && typeof dados.ambiente === 'object') {
             dados.ambiente = dados.ambiente.id;
          }
          setFormData(dados);
        } catch (error) {
          console.error("Erro ao carregar sensor", error);
        }
      };
      fetchSensor();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await api.put(`/sensores/${id}/`, formData);
        alert('Sensor atualizado com sucesso!');
      } else {
        await api.post('/sensores/', formData);
        alert('Sensor criado com sucesso!');
      }
      navigate('/sensores/todos');
    } catch (error) {
      console.error("Erro ao salvar sensor", error);
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
          <h1><span>📡</span> {id ? 'Editar Sensor' : 'Novo Sensor'}</h1>
        </header>

        <section className="content-box">
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '600px', margin: '0 auto' }}>
            
            <div className="form-group">
              <label>Tipo:</label>
              <select name="tipo" value={formData.tipo} onChange={handleChange} className="filter-select" style={{width: '100%'}}>
                <option value="temperatura">Temperatura</option>
                <option value="umidade">Umidade</option>
                <option value="luminosidade">Luminosidade</option>
                <option value="contador">Contador</option>
              </select>
            </div>

            <div className="form-group">
              <label>MAC Address:</label>
              <input type="text" name="mac_address" value={formData.mac_address} onChange={handleChange} required className="filter-select" style={{width: '100%'}} />
            </div>

            <div className="form-group">
              <label>Ambiente:</label>
              <select name="ambiente" value={formData.ambiente || ''} onChange={handleChange} required className="filter-select" style={{width: '100%'}}>
                <option value="">Selecione um ambiente...</option>
                {ambientes.map(amb => (
                  <option key={amb.id} value={amb.id}>{amb.descricao || amb.local}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Status:</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input 
                  type="checkbox" 
                  name="status" 
                  checked={formData.status} 
                  onChange={handleChange} 
                  style={{ width: '20px', height: '20px' }}
                />
                <span>{formData.status ? 'Ativo' : 'Inativo'}</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div className="form-group">
                    <label>Latitude:</label>
                    <input type="number" step="any" name="latitude" value={formData.latitude || ''} onChange={handleChange} className="filter-select" style={{width: '100%'}}/>
                </div>
                <div className="form-group">
                    <label>Longitude:</label>
                    <input type="number" step="any" name="longitude" value={formData.longitude || ''} onChange={handleChange} className="filter-select" style={{width: '100%'}}/>
                </div>
            </div>

            <div className="form-group">
              <label>Unidade de Medida:</label>
              <input type="text" name="unidade_medida" value={formData.unidade_medida || ''} onChange={handleChange} className="filter-select" style={{width: '100%'}} />
            </div>

            <div className="form-group">
                <label>Observação:</label>
                <textarea name="observacao" value={formData.observacao || ''} onChange={handleChange} rows="3" className="filter-select" style={{width: '100%'}}></textarea>
            </div>

            <button type="submit" disabled={loading} style={{
              marginTop: '20px',
              padding: '12px',
              backgroundColor: '#2b4cba',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              cursor: 'pointer',
              opacity: loading ? 0.7 : 1
            }}>
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default SensorForm;