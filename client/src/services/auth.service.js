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

const verifyResetAccount = (data) => {
  return axios.put('/account/verify-reset-account', data).then((response) => {
    if (response.data.data) {
      const user = JSON.parse(localStorage.getItem('user'));
      localStorage.setItem('user', JSON.stringify({ ...user, ...response.data.data }));
    }
    return response;
  });
};

let forgetPassword = (data) => {
  return axios.post('/account/forget-password', data);
};

const authService = {
  login,
  logout,
  changeStateAccount,
  verifyResetAccount,
  forgetPassword
};

export default authService;
