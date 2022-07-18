import axios from '../utils/axios';

let getAllClasses = () => {
  return axios.get('/class/get-all-classes');
};

let createNewClass = (data) => {
  return axios.post('/class/create-class', data);
};

let getClassById = (data) => {
  return axios.get(`/class/get-class-by-id?classId=${data.classId}`);
};

let updateClassById = (data) => {
  return axios.post('/class/update-class-by-id', data);
};

let deleteClassById = (data) => {
  return axios.post('/class/delete-class-by-id', data);
};

const classService = { getAllClasses, createNewClass, getClassById, updateClassById, deleteClassById };

export default classService;
