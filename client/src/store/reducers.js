import { combineReducers } from '@reduxjs/toolkit';
import { reducer as formReducer } from 'redux-form';
import authReducer from './slices/auth';
import messageReducer from './slices/message';
import classReducer from './slices/class';
import studentReducer from './slices/student';
import teacherReducer from './slices/teacher';
import subjectReducer from './slices/subject';
import questionReducer from './slices/question';
import examReducer from './slices/exam';
import answerReducer from './slices/answer';
import scoreReducer from './slices/score';
import homeReducer from './slices/home';

const reducers = combineReducers({
  form: formReducer,
  auth: authReducer,
  message: messageReducer,
  class: classReducer,
  student: studentReducer,
  teacher: teacherReducer,
  subject: subjectReducer,
  question: questionReducer,
  exam: examReducer,
  answer: answerReducer,
  score: scoreReducer,
  home: homeReducer
});

export default reducers;
