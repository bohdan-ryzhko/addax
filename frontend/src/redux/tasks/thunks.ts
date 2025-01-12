/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import { CreateTaskPayload, ICreateTaskResponse, IFetchTaskResponse } from '../../interfaces';
import { baseConfig } from '../../lib';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../../utils';

const TasksEndpoints = {
  api: 'api',
  v1: 'v1',
  tasks() {
    return `${this.api}/${this.v1}/tasks`;
  },
};

export const fetchTasks = createAsyncThunk<IFetchTaskResponse>(
  'fetch/tasks',
  async (_, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<IFetchTaskResponse> = await baseConfig.get(
        TasksEndpoints.tasks(),
      );

      return response.data;
    } catch (error: any) {
      toast.error(getErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const createTask = createAsyncThunk<ICreateTaskResponse, CreateTaskPayload>(
  'create/task',
  async (payload, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<ICreateTaskResponse> = await baseConfig.post(
        TasksEndpoints.tasks(),
        payload,
      );

      return response.data;
    } catch (error: any) {
      toast.error(getErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);
