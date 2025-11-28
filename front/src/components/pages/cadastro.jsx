import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../styles/style.css'; 

const Cadastro = () => {
  const navigate = useNavigate();
  
  // Estados para os campos
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleCadastro = async (e) => {
    e.preventDefault();
    setError('');

    // Validação simples de frontend
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    try {
      // Envia para o back
      await api.post('/register/', {
        username: nome, 
        password: password
      });

      // Sucesso: Redireciona para o Login
      alert('Cadastro realizado com sucesso!');
      navigate('/'); 

    } catch (err) {
      console.error("Erro no cadastro", err);
      // Tenta pegar a mensagem de erro específica do Django, se houver
      if (err.response && err.response.data) {
         const msg = Object.values(err.response.data).flat().join(' ');
         setError(msg || 'Erro ao cadastrar. Tente novamente.');
      } else {
         setError('Erro ao conectar com o servidor.');
      }
    }
  };

  return (
    <main className="login-container">
      <section className="login-card">

        <div style={{ fontSize: '3rem', color: '#0d1b2a', marginBottom: '0px' }}>SC</div>

        <h1 className="login-title">Cadastro</h1>

        <form className="login-form" onSubmit={handleCadastro}>
          
          {/* Campo Nome */}
          <div className="input-group">
            <label htmlFor="nome" className="sr-only">Digite seu nome</label>
            <input 
              type="text" 
              id="nome" 
              placeholder="Digite seu nome" 
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required 
            />
          </div>

          {/* Campo Email */}
          <div className="input-group">
            <label htmlFor="email" className="sr-only">Digite seu email</label>
            <input 
              type="email" 
              id="email" 
              placeholder="Digite seu email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Campo Senha */}
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

          {/* Campo Confirmar Senha */}
          <div className="input-group">
            <label htmlFor="confirmPassword" className="sr-only">Digite novamente sua senha</label>
            <input 
              type="password" 
              id="confirmPassword" 
              placeholder="Digite novamente sua senha" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required 
            />
          </div>

          {/* Exibição de Erros */}
          {error && <p style={{ color: 'red', fontSize: '0.9rem', marginTop: '10px' }}>{error}</p>}

          <button type="submit" className="login-button">
            Cadastrar 
          </button>
        </form>

        <p className="signup-text">
          Já tem uma conta? <a href="/" className="signup-link">Fazer Login</a>
        </p>

      </section>
    </main>
  );
};

export default Cadastro;