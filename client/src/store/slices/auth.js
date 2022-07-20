import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/auth.service';
import { setMessage } from './message';

const user = JSON.parse(localStorage.getItem('user'));

export const login = createAsyncThunk('auth/login', async ({ username, password }, thunkAPI) => {
  try {
    let data = await authService.login(username, password);
    return { data: data && data.data ? data.data : null };
  } catch (error) {
    console.log('error', error);
    thunkAPI.dispatch(setMessage(error.message));
    return thunkAPI.rejectWithValue();
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

export const verifyResetAccount = createAsyncThunk('auth/verifyResetAccount', async (data, thunkAPI) => {
  try {
    let response = await authService.verifyResetAccount(data);
    console.log('ré', response);
    if (!response.data?.success) {
      return thunkAPI.rejectWithValue(response.data);
    }
    return response?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const forgetPassword = createAsyncThunk('auth/forgetPassword', async (data, thunkAPI) => {
  try {
    let response = await authService.forgetPassword(data);
    if (!response.data?.success) {
      return thunkAPI.rejectWithValue(response.data);
    }
    return response?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const changePassword = createAsyncThunk('auth/changePassword', async (data, thunkAPI) => {
  try {
    let response = await authService.changePassword(data);
    if (!response.data?.success) {
      return thunkAPI.rejectWithValue(response.data);
    }
    return response?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const updateProfileInfo = createAsyncThunk('auth/updateProfileInfo', async (data, thunkAPI) => {
  try {
    let response = await authService.updateProfileInfo(data);
    if (!response.data?.success) {
      return thunkAPI.rejectWithValue(response.data);
    }
    return response?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

let initialState = user?.accessToken ? { isLoggedIn: true, user } : { isLoggedIn: false, user: null };

initialState = { ...initialState, isLoading: false };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    showOnLoading: (state) => {
      state.isLoading = true;
    },
    showOffLoading: (state) => {
      state.isLoading = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.data;
      state.isLoading = false;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      console.log('action', action);
      state.user = null;
      state.isLoading = false;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [verifyResetAccount.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = { ...state.user, ...action.payload.data };
    },
    [verifyResetAccount.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [forgetPassword.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [forgetPassword.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [changePassword.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [changePassword.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [updateProfileInfo.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = { ...state.user, ...action.payload.data };
    },
    [updateProfileInfo.rejected]: (state, action) => {
      state.isLoading = false;
    }
  }
});

export const selectAuth = (state) => state.auth;

const { reducer, actions } = authSlice;
export const { showOnLoading, showOffLoading, setLoading } = actions;
export default reducer;
