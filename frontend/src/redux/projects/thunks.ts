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
  projectsId(id: string) {
    return `${this.api}/${this.v1}/projects/${id}`;
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

export const deleteProject = createAsyncThunk<string, string>(
  'delte/project',
  async (id, { rejectWithValue }) => {
    try {
      await baseConfig.delete(ProjectsEndpoints.projectsId(id));

      toast.info('Project was deleted successfully');

      return id;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);
