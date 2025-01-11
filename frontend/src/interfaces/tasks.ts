import { BaseResponse, BaseSliceState } from './base';

export type Task = {
  name: string;
  description: string;
  id: string;
};

export type CreateTaskValues = Pick<Task, 'name' | 'description'>;

export interface ICreateTaskResponse extends BaseResponse<Task> {}

export interface TasksState extends BaseSliceState<Task[]> {}
