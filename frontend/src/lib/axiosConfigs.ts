import axios from 'axios';

export const nagerDateConfig = axios.create({
  baseURL: import.meta.env.VITE_API_NAGER_BASE_URL,
});

export const baseConfig = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});
