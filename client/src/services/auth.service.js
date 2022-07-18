import axios from '../utils/axios';

let login = (username, password) => {
  return axios.post('/login', { username, password }).then((response) => {
    if (response.data.data && response.data.data.accessToken) {
      localStorage.setItem('user', JSON.stringify(response.data.data));
    }

    return response.data;
  });
};

const logout = () => {
  localStorage.removeItem('user');
};

const changeStateAccount = (data) => {
  return axios.put('/update-state', data);
};

const authService = {
  login,
  logout,
  changeStateAccount
};

export default authService;
