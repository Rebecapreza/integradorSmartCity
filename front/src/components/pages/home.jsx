import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/style.css'; // Reaproveitando seu CSS

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
  };

  // Função para navegar para a lista filtrada
  const irParaSensor = (tipo) => {
    navigate(`/sensores/${tipo}`);
  };

  return (
    <main className="login-container" style={{ flexDirection: 'column', gap: '20px' }}>
      <header style={{ width: '100%', maxWidth: '800px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: '#93c5fd', borderRadius: '15px' }}>
        <h1 style={{ margin: 0, color: '#0d1b2a' }}>Smart City Dashboard</h1>
        <button onClick={handleLogout} className="login-button" style={{ width: 'auto', padding: '10px 20px', marginTop: 0, backgroundColor: '#ef4444', color: 'white' }}>
          Sair
        </button>
      </header>

      <section className="login-card" style={{ maxWidth: '800px', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
        
        <div style={{ width: '100%', marginBottom: '20px' }}>
            <h2>Monitoramento em Tempo Real</h2>
            <p>Selecione um tipo de sensor para visualizar:</p>
        </div>

        {/* Botões do Dashboard */}
        <button className="login-button" style={{ width: '45%', margin: '10px' }} onClick={() => irParaSensor('temperatura')}>
          🌡️ Temperatura
        </button>
        
        <button className="login-button" style={{ width: '45%', margin: '10px' }} onClick={() => irParaSensor('umidade')}>
          💧 Umidade
        </button>
        
        <button className="login-button" style={{ width: '45%', margin: '10px' }} onClick={() => irParaSensor('luminosidade')}>
          💡 Luminosidade
        </button>
        
        <button className="login-button" style={{ width: '45%', margin: '10px' }} onClick={() => irParaSensor('contador')}>
          Yz Contador
        </button>

      </section>
    </main>
  );
};

export default Home;