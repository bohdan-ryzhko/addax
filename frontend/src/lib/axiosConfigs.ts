import axios from 'axios';

export const nagerDateConfig = axios.create({
  baseURL: 'https://date.nager.at',
});

export const baseConfig = axios.create({
  baseURL: 'http://localhost:4000/',
});
