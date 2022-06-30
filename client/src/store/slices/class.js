import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import classService from '../../services/class.service';
import { setMessage } from './message';
import errorJwt from '../../utils/errorJwt';

export const createNewClass = createAsyncThunk('class/createNewClass', async (data, thunkAPI) => {
  try {
    let response = await classService.createNewClass(data);
    console.log('data', response);

    if (!response.data?.success) {
      return thunkAPI.rejectWithValue(response.data);
    }
    return response.data;
  } catch (error) {
    console.log('err slice', error);

    thunkAPI.dispatch(setMessage(error.message));
    return thunkAPI.rejectWithValue(error);
  }
});

export const updateClassById = createAsyncThunk('class/updateClassById', async (data, thunkAPI) => {
  try {
    let response = await classService.updateClassById(data);
    if (!response.data?.success) {
      return thunkAPI.rejectWithValue(response.data);
    }
    return { newData: response.data?.data, id: data.classId, ...response.data };
  } catch (error) {
    console.log('error', error);
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteClassById = createAsyncThunk('class/deleteClassById', async (data, thunkAPI) => {
  try {
    let response = await classService.deleteClassById(data);
    console.log('res', response);
    if (!response.data?.success) {
      return thunkAPI.rejectWithValue(response.data);
    }
    return response.data;
  } catch (error) {
    console.log('error', error);
    return thunkAPI.rejectWithValue(error);
  }
});

export const getClassById = createAsyncThunk('class/getClassById', async (data, thunkAPI) => {
  try {
    let response = await classService.getClassById(data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue();
  }
});

export const getAllClasses = createAsyncThunk('class/getAllClasses', async (data, thunkAPI) => {
  try {
    let response = await classService.getAllClasses();
    // console.log('res', response);
    if (!response.data?.success) {
      if (errorJwt(response.data)) {
        // await authService.logout();
      }
      thunkAPI.dispatch(setMessage(response.message));
      return thunkAPI.rejectWithValue();
    }

    return response?.data ? response.data : null;
  } catch (error) {
    console.log('error get all classes', error);

    thunkAPI.dispatch(setMessage(error.message));
    return thunkAPI.rejectWithValue(error);
  }
});

const initialState = {
  classes: [],
  isLoading: false
};

const classSlice = createSlice({
  name: 'class',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  },
  extraReducers: {
    [getAllClasses.fulfilled]: (state, action) => {
      state.classes = action.payload.data;
    },
    [getAllClasses.rejected]: (state, action) => {
      console.log('action', action);
      state.classes = [];
    },
    [createNewClass.fulfilled]: (state, action) => {
      console.log('action', action);
      state.isLoading = false;
      state.classes.unshift(action.payload.data);
    },
    [createNewClass.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [getClassById.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [updateClassById.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.classes = state.classes.map((item) => {
        if (item.classId == action.payload.id) {
          return { classId: action.payload.newData?.classId, name: action.payload.newData?.name };
        }
        return item;
      });
    },
    [updateClassById.rejected]: (state, action) => {
      console.log('action', action);
      state.isLoading = false;
    },
    [deleteClassById.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.classes = state.classes.filter((item) => item.classId !== action.payload?.data.classId);
    },
    [deleteClassById.rejected]: (state, action) => {
      state.isLoading = false;
    }
  }
});

export const selectClass = (state) => state.class;

const { reducer, actions } = classSlice;
export const { setLoading } = actions;
export default reducer;
