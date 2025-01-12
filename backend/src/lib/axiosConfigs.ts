import axios from 'axios';

export const nagerDateConfig = axios.create({
  baseURL: 'https://date.nager.at',
});
