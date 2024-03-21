import axios from 'axios';
import { getToken } from "../hooks/useAuth";

const api = axios.create({
    baseURL: 'http://localhost:8099',
    responseType: 'json'
});

api.interceptors.request.use(async config => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
