import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import homeService from '../../services/home.service';

export const getDashBoardTeacher = createAsyncThunk('home/getDashBoardTeacher', async (data, thunkAPI) => {
  try {
    let response = await homeService.getDashBoardTeacher();
    if (!response.data?.success) {
      return thunkAPI.rejectWithValue(response.data);
    }
    return response?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getDashBoardAdmin = createAsyncThunk('home/getDashBoardAdmin', async (data, thunkAPI) => {
  try {
    let response = await homeService.getDashBoardAdmin();
    if (!response.data?.success) {
      return thunkAPI.rejectWithValue(response.data);
    }
    return response?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const initialState = {
  dashboard: [],
  isLoading: false
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  },
  extraReducers: {
    [getDashBoardTeacher.fulfilled]: (state, action) => {
      state.dashboard = Object.keys(action.payload.data).map((key) => action.payload.data[key]);
      state.isLoading = false;
    },
    [getDashBoardTeacher.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [getDashBoardAdmin.fulfilled]: (state, action) => {
      state.dashboard = Object.keys(action.payload.data).map((key) => action.payload.data[key]);
      state.isLoading = false;
    },
    [getDashBoardAdmin.rejected]: (state, action) => {
      state.isLoading = false;
    }
  }
});

const { reducer, actions } = homeSlice;
export const { setLoading } = actions;
export default reducer;
