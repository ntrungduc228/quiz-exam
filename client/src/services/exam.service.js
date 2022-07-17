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

let getAllExamsByClass = (data) => {
  return axios.post('/exam/get-exams-by-class', data);
};

let doingExam = (data) => {
  return axios.post('/exam/doing-exam', data);
};

let getExamsByStudent = (data) => {
  return axios.post('/exam/get-exams-by-student', data);
};

let updateStudentAnswer = (data) => {
  return axios.post('/exam/update-student-answer', data);
};

let getResultByExam = (data) => {
  return axios.post('/exam/get-result-by-exam', data);
};

const examService = {
  getAllExams,
  createNewExam,
  changeStateExam,
  deleteExam,
  getAllExamsByClass,
  doingExam,
  getExamsByStudent,
  updateStudentAnswer,
  getResultByExam
};

export default examService;
