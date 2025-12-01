import axios from 'axios';

// URL base da API Django
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

// 1. Interceptor de Requisição:
// Antes de enviar o pedido, verifica se temos um token salvo e adiciona ao cabeçalho.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 2. Interceptor de Resposta:
// Se a API retornar erro 401 (Não Autorizado), significa que o token expirou ou é inválido.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Sessão expirada ou token inválido.");
      
      // Limpa o armazenamento local
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      
      // Força o redirecionamento para a tela de login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;