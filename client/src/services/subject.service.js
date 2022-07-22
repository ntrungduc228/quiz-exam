import axios from '../utils/axios';

let getAllSubjects = () => {
  return axios.get('/subject/get-all-subjects');
};

let createNewSubject = (data) => {
  return axios.post('/subject/create-subject', data);
};

let updateSubjectById = (data) => {
  return axios.put('/subject/update-subject-by-id', data);
};

let deleteSubjectById = (data) => {
  return axios.delete('/subject/delete-subject-by-id', { data: data });
};

const subjectService = { getAllSubjects, createNewSubject, updateSubjectById, deleteSubjectById };

export default subjectService;
