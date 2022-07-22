import axios from '../utils/axios';

let getListResultByStudentId = (data) => {
  return axios.get(`/result/get-all-result-by-student?studentId=${data.studentId}`);
};

let getListResult = () => {
  return axios.get(`/result/get-all-results`);
};

const scoreService = { getListResultByStudentId, getListResult };

export default scoreService;
