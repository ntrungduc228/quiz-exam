import axios from '../utils/axios';

let getAllStudents = () => {
  return axios.get('/student/get-all-students');
};

let createNewStudent = (data) => {
  return axios.post('/class/create-student', data);
};

let updateStudentById = (data) => {
  return axios.post('/class/update-student-by-id', data);
};

const studentService = { getAllStudents, createNewStudent, updateStudentById };

export default studentService;
