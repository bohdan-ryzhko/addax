/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  CreateProjectValues,
  ICreateProjectsResponse,
  IFetchProjectsResponse,
} from '../../interfaces';
import { baseConfig } from '../../lib';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../../utils';
import { AxiosResponse } from 'axios';

const ProjectsEndpoints = {
  api: 'api',
  v1: 'v1',
  projects() {
    return `${this.api}/${this.v1}/projects`;
  },
};

export const fetchProjects = createAsyncThunk<IFetchProjectsResponse>(
  'fetch/projects',
  async (_, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<IFetchProjectsResponse> = await baseConfig.get(
        ProjectsEndpoints.projects(),
      );

      return response.data;
    } catch (error: any) {
      toast.error(getErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const createProject = createAsyncThunk<ICreateProjectsResponse, CreateProjectValues>(
  'create/project',
  async (payload, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<ICreateProjectsResponse> = await baseConfig.post(
        ProjectsEndpoints.projects(),
        payload,
      );

      toast.success('Project was created successfully');

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);
