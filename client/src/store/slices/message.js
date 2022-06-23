import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessage: (state, action) => {
      return { message: action.payload };
    },
    clearMessage: () => {
      return { message: '' };
    }
  }
});

export const selectMessage = (state) => state.message;

const { reducer, actions } = messageSlice;

export const { setMessage, clearMessage } = actions;
export default reducer;
