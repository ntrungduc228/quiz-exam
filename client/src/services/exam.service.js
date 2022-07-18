import axios from '../utils/axios';

let getAllExams = () => {
  return axios.get('/exam/get-all-exams');
};

let createNewExam = (data) => {
  return axios.post('/exam/create-exam', data);
};

let changeStateExam = (data) => {
  return axios.put('/exam/change-state-exam', data);
};

let deleteExam = (data) => {
  return axios.delete('/exam/delete-exam', data);
};

let getAllExamsByClass = (data) => {
  return axios.get(`/exam/get-exams-by-class?classId=${data.classId}`);
};

let doingExam = (data) => {
  return axios.post('/exam/doing-exam', data);
};

let getExamsByStudent = (data) => {
  return axios.get(`/exam/get-exams-by-student?studentId=${data.studentId}&classId=${data.classId}`);
};

let updateStudentAnswer = (data) => {
  return axios.put('/exam/update-student-answer', data);
};

let getResultByExam = (data) => {
  return axios.get(`/exam/get-result-by-exam?studentId=${data.studentId}&subjectId=${data.subjectId}&times=${data.times}`);
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
