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

export const createNewSubject = createAsyncThunk('subject/createNewSubject', async (data, thunkAPI) => {
  try {
    let response = await subjectService.createNewSubject(data);
    if (!response.data?.success) {
      return thunkAPI.rejectWithValue(response.data);
    }
    return response?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const updateSubjectById = createAsyncThunk('subject/updateSubjectById', async (data, thunkAPI) => {
  try {
    let response = await subjectService.updateSubjectById(data);
    if (!response.data?.success) {
      return thunkAPI.rejectWithValue(response.data);
    }
    return response?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteSubjectById = createAsyncThunk('subject/deleteSubjectById', async (data, thunkAPI) => {
  try {
    let response = await subjectService.deleteSubjectById(data);
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
    },
    [createNewSubject.fulfilled]: (state, action) => {
      state.subjects.unshift(action.payload.data);
      state.isLoading = false;
    },
    [createNewSubject.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [updateSubjectById.fulfilled]: (state, action) => {
      state.subjects = state.subjects.map((item) => {
        if (item.subjectId === action.payload.data.subjectId) {
          return { ...item, ...action.payload.data.newData };
        }
        return item;
      });
      state.isLoading = false;
    },
    [updateSubjectById.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [deleteSubjectById.fulfilled]: (state, action) => {
      state.subjects = state.subjects.filter((item) => item.subjectId !== action.payload.data);
      state.isLoading = false;
    },
    [deleteSubjectById.rejected]: (state, action) => {
      state.isLoading = false;
    }
  }
});

const { reducer, actions } = subjectSlice;
export const { setLoading } = actions;
export default reducer;
