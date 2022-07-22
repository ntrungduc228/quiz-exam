import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import scoreService from '../../services/score.service';

export const getListResultByStudentId = createAsyncThunk('score/getListResultByStudentId', async (data, thunkAPI) => {
  try {
    let response = await scoreService.getListResultByStudentId(data);
    if (!response.data?.success) {
      return thunkAPI.rejectWithValue(response.data);
    }
    return response?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getListResult = createAsyncThunk('score/getListResult', async (data, thunkAPI) => {
  try {
    let response = await scoreService.getListResult();
    if (!response.data?.success) {
      return thunkAPI.rejectWithValue(response.data);
    }
    return response?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const initialState = {
  scores: [],
  isLoading: false
};

const scoreSlice = createSlice({
  name: 'score',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  },
  extraReducers: {
    [getListResultByStudentId.fulfilled]: (state, action) => {
      state.scores = action.payload.data.map((item) => {
        return { ...item, keyField: item.subjectId.concat(item.studentId + item.times) };
      });
      state.isLoading = false;
    },
    [getListResultByStudentId.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [getListResult.fulfilled]: (state, action) => {
      state.scores = action.payload.data.map((item) => {
        return {
          ...item,
          keyField: item.subjectId.concat(item.studentId + item.times),
          fullName: `${item.scoreStudentData.lastName} ${item.scoreStudentData.firstName}`
        };
      });
      state.isLoading = false;
    },
    [getListResult.rejected]: (state, action) => {
      state.isLoading = false;
    }
  }
});

const { reducer, actions } = scoreSlice;
export const { setLoading } = actions;
export default reducer;
