import axios from '../utils/axios';
import { API_SERVER } from '../config/constant.js';

let login = (username, password) => {
  return axios.post(API_SERVER + '/login', { username, password }).then((response) => {
    if (response.data.data && response.data.data.accessToken) {
      localStorage.setItem('user', JSON.stringify(response.data.data));
    }

    return response.data;
  });
};

const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  login,
  logout
};

export default authService;
