import axios from 'axios';

// 1. Cria a instância. O baseURL deve ser a raiz da API (sem o /projects)
const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1', 
});

// 2. Configura o interceptor
api.interceptors.request.use((config) => {
  // ATENÇÃO: A chave 'token' aqui deve ser EXATAMENTE a mesma que você usou no localStorage.setItem('token', ...)
  const token = localStorage.getItem('token'); 

  if (token) {
    // O Spring Boot geralmente espera o prefixo "Bearer " antes do token
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;