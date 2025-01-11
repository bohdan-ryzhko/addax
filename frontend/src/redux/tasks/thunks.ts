/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import { CreateTaskValues, ICreateTaskResponse } from '../../interfaces';
import { baseConfig } from '../../lib';

const TasksEndpoints = {
  api: 'api',
  v1: 'v1',
  tasks() {
    return `${this.api}/${this.v1}/tasks`;
  },
};

export const createTask = createAsyncThunk<ICreateTaskResponse, CreateTaskValues>(
  'tasks/create',
  async (payload, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<ICreateTaskResponse> = await baseConfig.post(
        TasksEndpoints.tasks(),
        payload,
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);
