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

export const getAllExamsByClass = createAsyncThunk('exam/getAllExamsByClass', async (data, thunkAPI) => {
  try {
    let response = await examService.getAllExamsByClass(data);
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
  isLoading: false,
  examInfo: {}
};

const examSlice = createSlice({
  name: 'exam',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setExamInfo: (state, action) => {
      state.examInfo = action.payload;
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
    },
    [getAllExamsByClass.fulfilled]: (state, action) => {
      state.exams = action.payload.data.map((item) => {
        return { ...item, keyField: item.subjectId.concat(item.classId + item.times) };
      });
    },
    [getAllExamsByClass.rejected]: (state, action) => {
      state.exams = [];
    }
  }
});

const { reducer, actions } = examSlice;
export const { setLoading, setExamInfo } = actions;
export default reducer;
