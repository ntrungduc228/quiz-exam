import axios from '../utils/axios';

let getDashBoardTeacher = () => {
  return axios.get('/dashboard/teacher');
};

let getDashBoardAdmin = () => {
  return axios.get('/dashboard/admin');
};

const homeService = { getDashBoardTeacher, getDashBoardAdmin };

export default homeService;
