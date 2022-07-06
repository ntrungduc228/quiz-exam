import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import teacherService from '../../services/teacher.service';
import authService from '../../services/auth.service';

export const getAllTeachers = createAsyncThunk('teacher/getAllTeachers', async (data, thunkAPI) => {
  try {
    let response = await teacherService.getAllTeachers();
    if (!response.data?.success) {
      return thunkAPI.rejectWithValue(response.data);
    }
    return response?.data ? response.data : null;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const createNewTeacher = createAsyncThunk('teacher/createNewTeacher', async (data, thunkAPI) => {
  try {
    let response = await teacherService.createNewTeacher(data);
    if (!response.data?.success) {
      return thunkAPI.rejectWithValue(response.data);
    }
    return response?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const updateTeacherById = createAsyncThunk('teacher/updateTeacherById', async (data, thunkAPI) => {
  try {
    let response = await teacherService.updateTeacherById(data);
    if (!response.data?.success) {
      return thunkAPI.rejectWithValue(response.data);
    }
    return response?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const changeState = createAsyncThunk('teacher/changeState', async (data, thunkAPI) => {
  try {
    let response = await authService.changeStateAccount(data);
    if (!response.data?.success) {
      return thunkAPI.rejectWithValue(response.data);
    }
    return response?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const initialState = {
  teachers: [],
  isLoading: false
};

const teacherSlice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  },
  extraReducers: {
    [getAllTeachers.fulfilled]: (state, action) => {
      state.teachers = action.payload.data.map((item) => ({ ...item, fullName: `${item.lastName} ${item.firstName}` }));
    },
    [getAllTeachers.rejected]: (state, action) => {
      state.teachers = [];
    },
    [createNewTeacher.fulfilled]: (state, action) => {
      state.isLoading = false;
      let newInstance = action.payload.data;
      newInstance.fullName = `${newInstance.lastName} ${newInstance.firstName}`;
      state.teachers.unshift(newInstance);
    },
    [createNewTeacher.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [updateTeacherById.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.teachers = state.teachers.map((item) => {
        if (item.teacherId === action.payload.data?.teacherId) {
          return { ...action.payload.data, fullName: `${action.payload.data.lastName} ${action.payload.data.firstName}` };
        }
        return item;
      });
    },
    [updateTeacherById.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [changeState.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.teachers = state.teachers.map((item) => {
        if (item.teacherId === action.payload.data?.username) {
          return {
            ...item,
            teacherAccountData: {
              ...item.teacherAccountData,
              state: action.payload.data.state
            }
          };
        }
        return item;
      });
    },
    [changeState.rejected]: (state, action) => {
      state.isLoading = false;
    }
  }
});

const { reducer, actions } = teacherSlice;
export const { setLoading } = actions;
export default reducer;
