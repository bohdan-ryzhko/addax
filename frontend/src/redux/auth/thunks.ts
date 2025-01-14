/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ILoginResponse,
  IRegistrationResponse,
  IFetchUserResponse,
  ILoginData,
  IRegistrationData,
} from '../../interfaces';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../../utils';
import { baseConfig } from '../../lib';

const AuthEndpoints = {
  api: 'api',
  v1: 'v1',
  base: 'users/auth',
  registration() {
    return `/${this.api}/${this.v1}/${this.base}/registration`;
  },
  login() {
    return `/${this.api}/${this.v1}/${this.base}/login`;
  },
  refresh() {
    return `/${this.api}/${this.v1}/${this.base}/refresh`;
  },
  logout() {
    return `/${this.api}/${this.v1}/${this.base}/logout`;
  },
};

export const registration = createAsyncThunk<IRegistrationResponse, IRegistrationData>(
  'auth/registration',
  async (payload, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<IRegistrationResponse> = await baseConfig.post(
        AuthEndpoints.registration(),
        payload,
      );

      toast.success('Registration success');

      return response.data;
    } catch (error: any) {
      toast.error(getErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const login = createAsyncThunk<ILoginResponse, ILoginData>(
  'auth/login',
  async (payload, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<ILoginResponse> = await baseConfig.post(
        AuthEndpoints.login(),
        payload,
      );

      toast.success('Login success');

      return response.data;
    } catch (error: any) {
      toast.error(getErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const refresh = createAsyncThunk<IFetchUserResponse, string>(
  'auth/refresh',
  async (refreshToken, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<IFetchUserResponse> = await baseConfig.post(
        AuthEndpoints.refresh(),
        { refreshToken },
      );

      return response.data;
    } catch (error: any) {
      toast.error(getErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    const response = await baseConfig.post(AuthEndpoints.logout());

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});
