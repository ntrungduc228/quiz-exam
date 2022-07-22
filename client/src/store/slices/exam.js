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

export const getExamsByStudent = createAsyncThunk('exam/getExamsByStudent', async (data, thunkAPI) => {
  try {
    let response = await examService.getExamsByStudent(data);
    if (!response.data?.success) {
      return thunkAPI.rejectWithValue(response.data);
    }
    return response?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const createNewExam = createAsyncThunk('exam/createNewExam', async (data, thunkAPI) => {
  try {
    let response = await examService.createNewExam(data);
    if (!response.data?.success) {
      return thunkAPI.rejectWithValue(response.data);
    }
    return response?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const changeStateExam = createAsyncThunk('exam/changeStateExam', async (data, thunkAPI) => {
  try {
    let response = await examService.changeStateExam(data);
    if (!response.data?.success) {
      return thunkAPI.rejectWithValue(response.data);
    }
    return response?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteExam = createAsyncThunk('exam/deleteExam', async (data, thunkAPI) => {
  try {
    let response = await examService.deleteExam(data);
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
  examInfo: {},
  examByStudent: {}
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
    },
    [createNewExam.fulfilled]: (state, action) => {
      let item = action.payload.data;
      item.keyField = item.subjectId.concat(item.classId + item.times);
      state.exams.unshift(item);
      state.isLoading = false;
    },
    [createNewExam.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [getExamsByStudent.fulfilled]: (state, action) => {
      state.examByStudent = action.payload.data;
      state.isLoading = false;
    },
    [getExamsByStudent.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [changeStateExam.fulfilled]: (state, action) => {
      state.exams = state.exams.map((item) => {
        if (
          item.classId === action.payload.data.classId &&
          item.subjectId === action.payload.data.subjectId &&
          item.times === action.payload.data.times
        ) {
          return { ...item, keyField: item.subjectId.concat(item.classId + item.times), ...action.payload.data };
        }
        return { ...item, keyField: item.subjectId.concat(item.classId + item.times) };
      });
      state.isLoading = false;
    },
    [changeStateExam.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [deleteExam.fulfilled]: (state, action) => {
      console.log('action delete', action);
      let itemRemove = action.payload.data;
      state.exams = state.exams.filter((item) => {
        item.keyField = item.subjectId.concat(item.classId + item.times);

        return item.classId !== itemRemove.classId || item.subjectId !== itemRemove.subjectId || item.times !== itemRemove.times;
      });
      state.isLoading = false;
    },
    [deleteExam.rejected]: (state, action) => {
      state.isLoading = false;
    }
  }
});

const { reducer, actions } = examSlice;
export const { setLoading, setExamInfo } = actions;
export default reducer;
