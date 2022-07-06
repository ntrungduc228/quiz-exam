import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import studentService from '../../services/student.service';
import authService from '../../services/auth.service';

export const getAllStudents = createAsyncThunk('student/getAllStudents', async (data, thunkAPI) => {
  try {
    let response = await studentService.getAllStudents();
    if (!response.data?.success) {
      return thunkAPI.rejectWithValue(response.data);
    }
    return response?.data ? response.data : null;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const createNewStudent = createAsyncThunk('student/createNewStudent', async (data, thunkAPI) => {
  try {
    let response = await studentService.createNewStudent(data);
    if (!response.data?.success) {
      return thunkAPI.rejectWithValue(response.data);
    }
    return response?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const updateStudentById = createAsyncThunk('student/updateStudentById', async (data, thunkAPI) => {
  try {
    let response = await studentService.updateStudentById(data);
    if (!response.data?.success) {
      return thunkAPI.rejectWithValue(response.data);
    }
    return response?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const changeState = createAsyncThunk('student/changeState', async (data, thunkAPI) => {
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
  students: [],
  isLoading: false
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  },
  extraReducers: {
    [getAllStudents.fulfilled]: (state, action) => {
      state.students = action.payload.data.map((item) => ({ ...item, fullName: `${item.lastName} ${item.firstName}` }));
    },
    [getAllStudents.rejected]: (state, action) => {
      state.students = [];
    },
    [createNewStudent.fulfilled]: (state, action) => {
      state.isLoading = false;
      let newInstance = action.payload.data;
      newInstance.fullName = `${newInstance.lastName} ${newInstance.firstName}`;
      state.students.unshift(newInstance);
    },
    [createNewStudent.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [updateStudentById.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.students = state.students.map((item) => {
        if (item.studentId === action.payload.data?.studentId) {
          return { ...action.payload.data, fullName: `${action.payload.data.lastName} ${action.payload.data.firstName}` };
        }
        return item;
      });
    },
    [updateStudentById.rejected]: (state, action) => {
      console.log('action', action);
      state.isLoading = false;
    },
    [changeState.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.students = state.students.map((item) => {
        if (item.studentId === action.payload.data?.username) {
          return {
            ...item,
            studentAccountData: {
              ...item.studentAccountData,
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

const { reducer, actions } = studentSlice;
export const { setLoading } = actions;
export default reducer;
