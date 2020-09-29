import axios from 'axios';

const api = axios.create({
  baseURL: 'https://quantum-balm-274511.uc.r.appspot.com',
});

export default api;
