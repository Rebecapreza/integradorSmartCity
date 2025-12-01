import React, { useState } from 'react';
import api from '../services/api'; 
import { useNavigate } from 'react-router-dom';
import '../styles/login.css'; 
import logo from '/src/assets/Logo.png';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Limpa erros anteriores

    try {
      // Faz a requisição POST para o endpoint de token do Django
      const response = await api.post('/token/', { 
        username: username, 
        password: password 
      });

      // Se der certo, o backend retorna { access: "...", refresh: "..." }
      const { access, refresh } = response.data;

      // Salva o token no armazenamento local do navegador
      localStorage.setItem('token', access);
      localStorage.setItem('refresh_token', refresh);

      // Configura o axios para enviar esse token em todas as próximas requisições
      api.defaults.headers.Authorization = `Bearer ${access}`;

      // Redireciona para a Home
      navigate('/home'); 

    } catch (err) {
      console.error("Erro no login", err);
      setError('Usuário ou senha incorretos. Tente novamente.');
    }
  };

  return (
    <main className="login-container">
      <section className="login-card">
        
        {<div className="logo-area">
            <img src={logo} alt="Logo SmartCity" className="logo-img" />
        </div>}

        <h1 className="login-title">Login</h1>

        <form className="login-form" onSubmit={handleLogin}>
          
          <div className="input-group">
            <label htmlFor="username" className="sr-only">Usuário ou Email</label>
            <input 
              type="text" 
              id="username" 
              placeholder="Entre com seu usuário" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
            />
          </div>

          <div className="input-group">
            <label htmlFor="password" className="sr-only">Digite sua senha</label>
            <input 
              type="password" 
              id="password" 
              placeholder="Digite sua senha" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          {error && <p style={{ color: 'red', fontSize: '0.9rem' }}>{error}</p>}

          <button type="submit" className="login-button">
            Entrar
          </button>
        </form>
      </section>
    </main>
  );
};

export default Login;