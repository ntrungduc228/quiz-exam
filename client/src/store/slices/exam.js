import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import examService from '../../services/exam.service';

export const getAllExams = createAsyncThunk('exam/getAllExams', async (data, thunkAPI) => {
  try {
    let response = await examService.getAllExams();
    if (!response.data?.success) {
      return thunkAPI.rejectWithValue(response.data);
    }
    return response?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const initialState = {
  exams: [],
  isLoading: false
};

const examSlice = createSlice({
  name: 'exam',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  },
  extraReducers: {
    [getAllExams.fulfilled]: (state, action) => {
      state.exams = action.payload.data.map((item) => {
        return { ...item, keyField: item.subjectId.concat(item.classId + item.times) };
      });
    },
    [getAllExams.rejected]: (state, action) => {
      state.exams = [];
    }
  }
});

const { reducer, actions } = examSlice;
export const { setLoading } = actions;
export default reducer;
