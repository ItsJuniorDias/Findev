import axios from 'axios';

const api = axios.create({
  baseURL: '192.168.88.139:3333',
});

export default api;