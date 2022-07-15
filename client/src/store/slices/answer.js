import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import examService from '../../services/exam.service';

export const doingExam = createAsyncThunk('exam/doingExam', async (data, thunkAPI) => {
  try {
    let response = await examService.doingExam(data);
    if (!response.data?.success) {
      return thunkAPI.rejectWithValue(response.data);
    }
    return response?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const initialState = {
  answers: [],
  isLoading: false,
  examDetail: null
};

const answerSlice = createSlice({
  name: 'answer',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  },
  extraReducers: {
    [doingExam.fulfilled]: (state, action) => {
      state.examDetail = action.payload.data;
      state.isLoading = false;
    },
    [doingExam.rejected]: (state, action) => {
      state.isLoading = false;
    }
  }
});

const { reducer, actions } = answerSlice;
export const { setLoading, setExamInfo } = actions;
export default reducer;
