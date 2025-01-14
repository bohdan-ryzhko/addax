import { model, Schema } from 'mongoose';
import { IProject } from '../interfaces';

const projectSchema = new Schema<IProject>({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
  },
});

export const Project = model<IProject>('Project', projectSchema);
