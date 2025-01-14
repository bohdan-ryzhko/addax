import { Document, Types } from 'mongoose';

export interface ITask {
  name: string;
  description: string;
  date: string;
  order: number;
}

export interface ITaskBody extends ITask {
  countryCode: string;
}
export interface ITaskUpdateBody extends ITaskBody {
  reason?: string;
}

export interface ITaskDTO extends ITask {
  id: string;
}

export interface ITaskDocument extends ITask, Document {
  _id: Types.ObjectId;
}
