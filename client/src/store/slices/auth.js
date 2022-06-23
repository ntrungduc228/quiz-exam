import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/auth.service';
import { setMessage } from './message';

const user = JSON.parse(localStorage.getItem('user'));

export const login = createAsyncThunk('auth/login', async ({ username, password }, thunkAPI) => {
  try {
    const data = await authService.login(username, password);
    console.log('data response', data);
    return { data: data && data.data ? data.data : null };
  } catch (error) {
    console.log('error login123', error);
    // const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(error.message));
    return thunkAPI.rejectWithValue();
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

let initialState = user ? { isLoggedIn: true, user } : { isLoggedIn: false, user: null };

initialState = { ...initialState, isLoading: false };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    decrement: (state, action) => {
      state.isLoggedIn = true;
    },
    showOnLoading: (state) => {
      state.isLoading = true;
    },
    showOffLoading: (state) => {
      state.isLoading = false;
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
export const { decrement, showOnLoading, showOffLoading } = actions;
export default reducer;
