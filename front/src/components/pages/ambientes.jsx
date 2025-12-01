import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import '../styles/style.css';

const Ambientes = () => {
  const navigate = useNavigate();
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
    <div className="login-container" style={{ alignItems: 'flex-start', paddingTop: '50px', overflowY: 'auto' }}>
      <div className="login-card" style={{ maxWidth: '800px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <h2>Ambientes da Escola</h2>
            <button onClick={() => navigate('/home')} className="login-button" style={{ width: 'auto', backgroundColor: '#64748b', color: 'white', marginTop: 0 }}>
                Voltar
            </button>
        </div>

        {loading && <p>Carregando...</p>}

        {!loading && (
          <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#bfdbfe', color: '#1e3a8a' }}>
                <th style={{ padding: '10px' }}>ID</th>
                <th style={{ padding: '10px' }}>Nome da Sala</th>
                <th style={{ padding: '10px' }}>Responsável</th>
              </tr>
            </thead>
            <tbody>
              {ambientes.map((amb) => (
                <tr key={amb.id} style={{ borderBottom: '1px solid #cbd5e1' }}>
                  <td style={{ padding: '10px' }}>{amb.id}</td>
                  <td style={{ padding: '10px' }}>{amb.descricao}</td> 
                  <td style={{ padding: '10px' }}>{amb.responsavel_nome || amb.responsavel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Ambientes;