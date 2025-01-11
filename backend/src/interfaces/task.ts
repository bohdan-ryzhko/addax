import { Document, Types } from 'mongoose';

export interface ITask {
  name: string;
  description: string;
}

export interface ITaskDTO extends ITask {
  id: string;
}

export interface ITaskDocument extends ITask, Document {
  _id: Types.ObjectId;
}
