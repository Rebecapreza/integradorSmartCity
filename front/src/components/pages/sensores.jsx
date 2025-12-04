import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Sidebar from '../utils/Sidebar';
import '../styles/sensores.css';

const Sensores = () => {
  const { tipo } = useParams();
  const navigate = useNavigate();
  const [sensores, setSensores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const fetchSensores = async () => {
      setLoading(true);
      try {
        let url = '/sensores/';
        if (tipo && tipo !== 'todos') {
          url = `/sensores/?tipo=${tipo}`;
        }
        const response = await api.get(url);
        setSensores(response.data);
        setErro('');
      } catch (err) {
        console.error(err);
        setErro('Erro ao carregar sensores.');
        if (err.response && err.response.status === 401) {
            navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchSensores();
  }, [tipo, navigate]);

  const handleTypeChange = (e) => {
    navigate(`/sensores/${e.target.value}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este sensor?")) {
      try {
        await api.delete(`/sensores/${id}/`);
        setSensores(sensores.filter(sensor => sensor.id !== id));
        alert("Sensor excluído com sucesso!");
      } catch (err) {
        console.error("Erro ao excluir", err);
        alert("Erro ao excluir. Verifique vínculos.");
      }
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        
        <header className="page-header">
          <h1 style={{ textTransform: 'capitalize' }}>
            <span>📡</span> {tipo === 'todos' ? 'Todos os Sensores' : `Sensores de ${tipo}`}
          </h1>
        </header>

        <div className="search-bar-container">
          <div className="filter-group">
            <label htmlFor="sensor-type">Filtrar por:</label>
            <select 
              id="sensor-type" 
              value={tipo} 
              onChange={handleTypeChange}
              className="filter-select"
            >
              <option value="todos">Todos</option> 
              <option value="temperatura">Temperatura</option>
              <option value="umidade">Umidade</option>
              <option value="luminosidade">Luminosidade</option>
              <option value="contador">Contador</option>
            </select>
          </div>

          <button className="btn-add" onClick={() => navigate('/sensores/novo')}>
            <span>+</span> Novo Sensor
          </button>
        </div>

        <section className="content-box">
          {loading && <p style={{ padding: '20px' }}>Carregando dados...</p>}
          {erro && <p style={{ color: 'red', padding: '20px' }}>{erro}</p>}

          {!loading && !erro && sensores.length === 0 && (
              <p style={{ padding: '20px' }}>Nenhum sensor encontrado.</p>
          )}

          {!loading && sensores.length > 0 && (
            <div className="table-responsive">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    {tipo === 'todos' && <th>Tipo</th>} 
                    <th>MAC Address</th>
                    <th>Local (Ambiente)</th>
                    <th>Status</th>
                    <th>Unidade</th>
                    <th>Ações</th> 
                  </tr>
                </thead>
                <tbody>
                  {sensores.map((sensor) => (
                    <tr key={sensor.id}>
                      <td>{sensor.id}</td>
                      {tipo === 'todos' && <td style={{ textTransform: 'capitalize' }}>{sensor.tipo}</td>}
                      <td>{sensor.mac_address}</td>
                      <td>{sensor.ambiente_local || 'N/A'}</td> 
                      <td>
                        <span className={`status-badge ${sensor.status ? 'status-active' : 'status-inactive'}`}>
                          {sensor.status ? 'Ativo' : 'Inativo'}
                        </span>
                      </td>
                      <td>{sensor.unidade_medida}</td>
                      
                      <td className="action-cell">
                        <button 
                          className="btn-action btn-edit"
                          onClick={() => navigate(`/sensores/editar/${sensor.id}`)}
                          title="Editar"
                        >
                          ✏️
                        </button>

                        <button 
                          className="btn-action btn-delete"
                          onClick={() => handleDelete(sensor.id)}
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

export default Sensores;