import axios from '../utils/axios';

let getAllExams = () => {
  return axios.get('/exam/get-all-exams');
};

let createNewExam = (data) => {
  return axios.post('/exam/create-exam', data);
};

let changeStateExam = (data) => {
  return axios.post('/exam/change-state-exam', data);
};

let deleteExam = (data) => {
  return axios.post('/exam/delete-exam', data);
};

const examService = { getAllExams, createNewExam, changeStateExam, deleteExam };

export default examService;
