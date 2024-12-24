import axios from 'axios';

const api = axios.create({
   // baseURL: 'https://simplify-backend.onrender.com/api',
   baseURL: 'http://localhost:5000/api',
});

export default api;
