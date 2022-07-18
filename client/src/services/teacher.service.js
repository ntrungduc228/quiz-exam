import axios from '../utils/axios';

let getAllTeachers = () => {
  return axios.get('/teacher/get-all-teachers');
};

let createNewTeacher = (data) => {
  return axios.post('/teacher/create-teacher', data);
};

let updateTeacherById = (data) => {
  return axios.put('/teacher/update-teacher-by-id', data);
};

const teacherService = { getAllTeachers, createNewTeacher, updateTeacherById };

export default teacherService;
