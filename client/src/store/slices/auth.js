import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/auth.service';
import { setMessage } from './message';

const user = JSON.parse(localStorage.getItem('user'));

export const login = createAsyncThunk('auth/login', async ({ username, password }, thunkAPI) => {
  try {
    let data = await authService.login(username, password);
    console.log('data response', data);
    return { data: data && data.data ? data.data : null };
  } catch (error) {
    console.log('error', error);
    // const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(error.message));
    return thunkAPI.rejectWithValue();
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
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
      console.log('action', action);
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
    }
  }
});

export const selectAuth = (state) => state.auth;

const { reducer, actions } = authSlice;
export const { showOnLoading, showOffLoading, setLoading } = actions;
export default reducer;
