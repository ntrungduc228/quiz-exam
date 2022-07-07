import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import subjectService from '../../services/subject.service';

export const getAllSubjects = createAsyncThunk('subject/getAllSubjects', async (data, thunkAPI) => {
  try {
    let response = await subjectService.getAllSubjects();
    if (!response.data?.success) {
      return thunkAPI.rejectWithValue(response.data);
    }
    return response?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const initialState = {
  subjects: [],
  isLoading: false
};

const subjectSlice = createSlice({
  name: 'subject',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  },
  extraReducers: {
    [getAllSubjects.fulfilled]: (state, action) => {
      state.subjects = action.payload.data;
    },
    [getAllSubjects.rejected]: (state, action) => {
      state.subjects = [];
    }
  }
});

const { reducer, actions } = subjectSlice;
export const { setLoading } = actions;
export default reducer;
