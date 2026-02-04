import axios from 'axios';

export const agent = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});
agent.interceptors.request.use(config => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

