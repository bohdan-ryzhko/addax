import { BaseResponse, BaseSliceState } from './base';

export type Task = {
  name: string;
  description: string;
  id: string;
  order: number;
  date: string;
  project_id: string;
};

export type CreateTaskValues = Pick<Task, 'name' | 'description'>;

export type CreateTaskPayload = Pick<Task, 'date'> &
  CreateTaskValues & {
    countryCode: string;
    project_id: string;
  };

export type UpdateTaskByIdPayload = Partial<Task> &
  Pick<Task, 'id'> & { countryCode: string; reason?: string };

export type UpdateDndTasksPayload = {
  tasks: Task[];
};

export interface ICreateTaskResponse extends BaseResponse<Task> {}

export interface IFetchTaskResponse extends BaseResponse<Task[]> {}

export interface TasksState extends BaseSliceState<Task[]> {
  creating: boolean;
  updating: boolean;
}
