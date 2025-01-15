import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { AuthState } from '../../interfaces';
import { login, logout, refresh, registration, updateUserInfo } from './thunks';
import { baseConfig } from '../../lib';

export const setAuthHeader = (token: string) => {
  baseConfig.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  baseConfig.defaults.headers.common.Authorization = '';
};

const initialState: AuthState = {
  loading: false,
  refreshing: false,
  error: null,
  user: null,
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(registration.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.accessToken = action.payload.data.accessToken;
        state.refreshToken = action.payload.data.refreshToken;
        setAuthHeader(action.payload.data.accessToken);
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.accessToken = action.payload.data.accessToken;
        state.refreshToken = action.payload.data.refreshToken;
        setAuthHeader(action.payload.data.accessToken);
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.accessToken = action.payload.data.accessToken;
        state.refreshToken = action.payload.data.refreshToken;
        setAuthHeader(action.payload.data.accessToken);
      })
      .addCase(logout.pending, state => {
        state.loading = initialState.loading;
        state.refreshing = initialState.refreshing;
        state.error = initialState.error;
        state.user = initialState.user;
        state.accessToken = initialState.accessToken;
        state.refreshToken = initialState.refreshToken;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
      })
      .addMatcher(isAnyOf(registration.pending, login.pending, updateUserInfo.pending), state => {
        state.loading = true;
      })
      .addMatcher(isAnyOf(refresh.pending), state => {
        state.refreshing = true;
      })
      .addMatcher(isAnyOf(refresh.fulfilled), state => {
        state.refreshing = false;
        state.error = null;
      })
      .addMatcher(isAnyOf(refresh.rejected), (state, action) => {
        state.refreshing = false;
        state.error = action.error;
        state.accessToken = null;
        state.refreshToken = null;
      })
      .addMatcher(
        isAnyOf(registration.fulfilled, login.fulfilled, updateUserInfo.pending),
        state => {
          state.loading = false;
          state.error = null;
        },
      )
      .addMatcher(
        isAnyOf(registration.rejected, login.rejected, updateUserInfo.rejected),
        (state, action) => {
          state.refreshing = false;
          state.loading = false;
          state.error = action.error;
        },
      )
      .addMatcher(isAnyOf(logout.fulfilled, logout.rejected), () => {
        clearAuthHeader();
      });
  },
});

export const authReducer = authSlice.reducer;
