/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import {
  CreateTaskPayload,
  ICreateTaskResponse,
  IFetchTaskResponse,
  UpdateDndTasksPayload,
  UpdateTaskByIdPayload,
} from '../../interfaces';
import { baseConfig } from '../../lib';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../../utils';

const TasksEndpoints = {
  api: 'api',
  v1: 'v1',
  tasks() {
    return `${this.api}/${this.v1}/tasks`;
  },
  tasksId(id: string) {
    return `${this.api}/${this.v1}/tasks/${id}`;
  },
  tasksDnd() {
    return `${this.api}/${this.v1}/tasks/dnd`;
  },
};

export const fetchTasks = createAsyncThunk<IFetchTaskResponse, string>(
  'fetch/tasks',
  async (id, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<IFetchTaskResponse> = await baseConfig.get(
        TasksEndpoints.tasksId(id),
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

      toast.success('Task was created successfully!');

      return response.data;
    } catch (error: any) {
      toast.error(getErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const updateTaskById = createAsyncThunk<ICreateTaskResponse, UpdateTaskByIdPayload>(
  'update/task',
  async (payload, { rejectWithValue }) => {
    try {
      const { id, ...body } = payload;

      const response: AxiosResponse<ICreateTaskResponse> = await baseConfig.put(
        TasksEndpoints.tasksId(id),
        body,
      );

      toast.success('Task was updated successfully!');

      return response.data;
    } catch (error: any) {
      toast.error(getErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const updateDndTasks = createAsyncThunk<IFetchTaskResponse, UpdateDndTasksPayload>(
  'update/dnd-tasks',
  async (payload, { rejectWithValue }) => {
    try {
      const resonse: AxiosResponse<IFetchTaskResponse> = await baseConfig.post(
        TasksEndpoints.tasksDnd(),
        payload,
      );

      toast.success('Task was updated successfully!');

      return resonse.data;
    } catch (error: any) {
      toast.error(getErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const deleteTask = createAsyncThunk<string, string>(
  'delete/task',
  async (id, { rejectWithValue }) => {
    try {
      await baseConfig.delete(TasksEndpoints.tasksId(id));

      toast.info('Task was deleted successfully');

      return id;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);
