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
  date: {
    type: String,
    required: [true, 'Date is required'],
  },
  order: {
    type: Number,
  },
  project_id: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: [true, 'Project ID is required'],
  },
});

export const Task = model<ITask>('Task', taskSchema);
