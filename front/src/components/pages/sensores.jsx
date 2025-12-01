import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import '../styles/style.css';

const Sensores = () => {
  const { tipo } = useParams(); // Pega o tipo da URL (ex: temperatura)
  const navigate = useNavigate();
  const [sensores, setSensores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const fetchSensores = async () => {
      try {
        // O backend espera ?tipo=temperatura (icontains)
        const response = await api.get(`/sensores/?tipo=${tipo}`);
        setSensores(response.data);
      } catch (err) {
        console.error(err);
        setErro('Erro ao carregar sensores. Verifique se você está logado.');
        if (err.response && err.response.status === 401) {
            navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSensores();
  }, [tipo, navigate]);

  return (
    <div className="login-container" style={{ alignItems: 'flex-start', paddingTop: '50px', overflowY: 'auto' }}>
      <div className="login-card" style={{ maxWidth: '900px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <h2 style={{ textTransform: 'capitalize' }}>Sensores de {tipo}</h2>
            <button onClick={() => navigate('/home')} className="login-button" style={{ width: 'auto', backgroundColor: '#64748b', color: 'white', marginTop: 0 }}>
                Voltar
            </button>
        </div>

        {loading && <p>Carregando dados...</p>}
        {erro && <p style={{ color: 'red' }}>{erro}</p>}

        {!loading && !erro && sensores.length === 0 && (
            <p>Nenhum sensor encontrado deste tipo.</p>
        )}

        {!loading && sensores.length > 0 && (
          <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#bfdbfe', color: '#1e3a8a' }}>
                <th style={{ padding: '10px' }}>ID</th>
                <th style={{ padding: '10px' }}>MAC Address</th>
                <th style={{ padding: '10px' }}>Local (Ambiente)</th>
                <th style={{ padding: '10px' }}>Status</th>
                <th style={{ padding: '10px' }}>Unidade</th>
              </tr>
            </thead>
            <tbody>
              {sensores.map((sensor) => (
                <tr key={sensor.id} style={{ borderBottom: '1px solid #cbd5e1' }}>
                  <td style={{ padding: '10px' }}>{sensor.id}</td>
                  <td style={{ padding: '10px' }}>{sensor.mac_address}</td>
                  <td style={{ padding: '10px' }}>{sensor.ambiente_local || 'N/A'}</td> 
                  <td style={{ padding: '10px', color: sensor.status ? 'green' : 'red', fontWeight: 'bold' }}>
                    {sensor.status ? 'Ativo' : 'Inativo'}
                  </td>
                  <td style={{ padding: '10px' }}>{sensor.unidade_medida}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Sensores;