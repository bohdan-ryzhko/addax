import { model, Schema } from 'mongoose';
import { ITask } from '../interfaces';

const taskSchema = new Schema<ITask>({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
});

export const Task = model<ITask>('Task', taskSchema);
