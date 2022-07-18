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

export const updateStudentAnswer = createAsyncThunk('exam/updateStudentAnswer', async (data, thunkAPI) => {
  try {
    let response = await examService.updateStudentAnswer(data);
    if (!response.data?.success) {
      return thunkAPI.rejectWithValue(response.data);
    }
    return response?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getResultByExam = createAsyncThunk('exam/getResultByExam', async (data, thunkAPI) => {
  try {
    let response = await examService.getResultByExam(data);
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
  examDetail: null,
  examResult: null
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
      console.log('action', action.payload);
      state.examDetail = action.payload.data;
      if (!state.examDetail?.info?.timeRemain) {
        let timeRemain = new Date();
        timeRemain.setMinutes(timeRemain.getMinutes() + state.examDetail.info.timeExam);
        console.log('time remain', timeRemain.getTime());
        state.examDetail.info.timeRemain = timeRemain.getTime();
      }

      state.isLoading = false;
    },
    [doingExam.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [updateStudentAnswer.fulfilled]: (state, action) => {
      let questionList = state.examDetail?.questionList;
      questionList = questionList.map((item) => {
        if (item.questionId === action.payload.data.questionId) {
          return { ...item, studentChoice: action.payload.data.studentChoice };
        }
        return item;
      });
      state.examDetail = { ...state.examDetail, questionList: questionList };
      state.isLoading = false;
    },
    [updateStudentAnswer.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [getResultByExam.fulfilled]: (state, action) => {
      state.examResult = { result: action.payload.data, ...state.examDetail?.info };
      state.isLoading = false;
    },
    [getResultByExam.rejected]: (state, action) => {
      state.examResult = null;
      state.isLoading = false;
    }
  }
});

const { reducer, actions } = answerSlice;
export const { setLoading, setExamInfo } = actions;
export default reducer;
