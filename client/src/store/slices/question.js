import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import questionService from '../../services/question.service';

export const getAllQuestions = createAsyncThunk('question/getAllQuestions', async (data, thunkAPI) => {
  try {
    let response = await questionService.getAllQuestions();
    if (!response.data?.success) {
      return thunkAPI.rejectWithValue(response.data);
    }
    return response?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const createNewQuestion = createAsyncThunk('question/createNewQuestion', async (data, thunkAPI) => {
  try {
    let response = await questionService.createNewQuestion(data);
    if (!response.data?.success) {
      return thunkAPI.rejectWithValue(response.data);
    }
    return response?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const updateQuestionById = createAsyncThunk('question/updateQuestionById', async (data, thunkAPI) => {
  try {
    let response = await questionService.updateQuestionById(data);
    if (!response.data?.success) {
      return thunkAPI.rejectWithValue(response.data);
    }
    return response?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteQuestionById = createAsyncThunk('question/deleteQuestionById', async (data, thunkAPI) => {
  try {
    let response = await questionService.deleteQuestionById(data);
    if (!response.data?.success) {
      return thunkAPI.rejectWithValue(response.data);
    }
    return response?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const initialState = {
  questions: [],
  isLoading: false
};

const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  },
  extraReducers: {
    [getAllQuestions.fulfilled]: (state, action) => {
      state.questions = action.payload.data;
    },
    [getAllQuestions.rejected]: (state, action) => {
      state.questions = [];
    },
    [createNewQuestion.fulfilled]: (state, action) => {
      state.questions.unshift(action.payload.data);
      state.isLoading = false;
    },
    [createNewQuestion.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [updateQuestionById.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.questions = state.questions.map((item) => {
        if (item.questionId === action.payload.data.questionId) {
          return { ...action.payload.data };
        }
        return item;
      });
    },
    [updateQuestionById.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [deleteQuestionById.fulfilled]: (state, action) => {
      state.questions = state.questions.filter((item) => item.questionId !== action.payload.data);
      state.isLoading = false;
    },
    [deleteQuestionById.rejected]: (state, action) => {
      state.isLoading = false;
    }
  }
});

const { reducer, actions } = questionSlice;
export const { setLoading } = actions;
export default reducer;
