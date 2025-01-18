import { BaseResponse, BaseSliceState } from './base';

export type Project = {
  name: string;
  id: string;
};

export type CreateProjectValues = Pick<Project, 'name'>;

export interface PropjectsState extends BaseSliceState<Project[]> {
  selectedProject: Project | null;
  creating: boolean;
  deleting: boolean;
}

export interface IFetchProjectsResponse extends BaseResponse<Project[]> {}

export interface ICreateProjectsResponse extends BaseResponse<Project> {}
