import axios from 'axios';
import { API_SERVER } from '../config/constant';
import authHeader from './authHeader';

const axiosServices = axios.create({
  baseURL: API_SERVER,
  headers: {
    'Content-type': 'application/json'
  }
});

axiosServices.interceptors.request.use(
  (config) => {
    if (authHeader()) {
      config.headers['x-access-token'] = authHeader();
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosServices.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Wrong Services')
);

export default axiosServices;
