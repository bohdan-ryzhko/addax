import { Document, Types } from 'mongoose';

export interface IProject {
  name: string;
  user_id: Types.ObjectId;
}

export interface IProjectDTO extends Pick<IProject, 'name'> {
  id: string;
}

export interface IProjectDocument extends IProject, Document {
  _id: Types.ObjectId;
}
