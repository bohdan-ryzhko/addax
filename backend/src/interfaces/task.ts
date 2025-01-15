import { Document, Types } from 'mongoose';

export interface ITask {
  name: string;
  description: string;
  date: string;
  order: number;
  project_id: Types.ObjectId;
}

export interface ITaskBody extends Omit<ITask, 'project_id'> {
  countryCode: string;
  project_id: string;
}

export interface ITaskUpdateBody extends Omit<ITaskBody, 'project_id'> {
  reason?: string;
}

export interface ITaskDTO extends Omit<ITask, 'project_id'> {
  id: string;
  project_id: string;
}

export interface ITaskDocument extends ITask, Document {
  _id: Types.ObjectId;
}
