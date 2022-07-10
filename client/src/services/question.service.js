import axios from '../utils/axios';

let getAllQuestions = () => {
  return axios.get('/question/get-all-questions');
};

let createNewQuestion = (data) => {
  return axios.post('/question/create-question', data);
};

let updateQuestionById = (data) => {
  return axios.post('/question/update-question-by-id', data);
};

let deleteQuestionById = (data) => {
  return axios.post('/question/delete-question-by-id', data);
};

const questionService = { getAllQuestions, createNewQuestion, updateQuestionById, deleteQuestionById };

export default questionService;
