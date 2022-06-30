import { combineReducers } from '@reduxjs/toolkit';
import { reducer as formReducer } from 'redux-form';
import authReducer from './slices/auth';
import messageReducer from './slices/message';
import classReducer from './slices/class';

const reducers = combineReducers({
  form: formReducer,
  auth: authReducer,
  message: messageReducer,
  class: classReducer
});

export default reducers;
