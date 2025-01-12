import { BaseResponse, BaseSliceStateWithCreate } from './base';

export type Task = {
  name: string;
  description: string;
  id: string;
  order: number;
  date: string;
};

export type CreateTaskValues = Pick<Task, 'name' | 'description'>;

export type CreateTaskPayload = Pick<Task, 'date'> &
  CreateTaskValues & {
    countryCode: string;
  };

export interface ICreateTaskResponse extends BaseResponse<Task> {}

export interface IFetchTaskResponse extends BaseResponse<Task[]> {}

export interface TasksState extends BaseSliceStateWithCreate<Task[]> {}
