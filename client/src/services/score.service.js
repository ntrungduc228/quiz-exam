import axios from '../utils/axios';

let getListResultByStudentId = (data) => {
  return axios.get(`/result/get-all-result-by-student?studentId=${data.studentId}`);
};

const scoreService = { getListResultByStudentId };

export default scoreService;
