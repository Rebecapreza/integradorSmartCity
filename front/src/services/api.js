import axios from 'axios';

// Usa variável de ambiente (VITE_API_URL) ou o padrão localhost
const baseURL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: baseURL,
});

// Interceptor de Requisição: Adiciona o Token automaticamente
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor de Resposta: Trata o Erro 401 (Token Inválido/Expirado)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.warn("Sessão expirada. Redirecionando para login...");
            localStorage.removeItem('token');
            localStorage.removeItem('refresh_token');
            // Redireciona via window.location pois o interceptor não é um componente React
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;