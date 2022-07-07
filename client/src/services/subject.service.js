import axios from '../utils/axios';

let getAllSubjects = () => {
  return axios.get('/subject/get-all-subjects');
};

let createNewSubject = (data) => {
  return axios.post('/subject/create-subject', data);
};

let updateSubjectById = (data) => {
  return axios.post('/subject/update-subject-by-id', data);
};

let deleteSubjectById = (data) => {
  return axios.post('/subject/delete-subject-by-id', data);
};

const subjectService = { getAllSubjects, createNewSubject, updateSubjectById, deleteSubjectById };

export default subjectService;
