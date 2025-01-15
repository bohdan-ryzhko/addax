import { ITask } from '../interfaces';
import { Task } from '../models';

export const findTasks = (project_id: string) => Task.find({ project_id });

export const findTaskById = (id: string) => Task.findById(id);

export const findTasksByDate = (date: string) => Task.find({ date });

export const addTask = (task: ITask) => Task.create(task);

export const deleteTaskById = (id: string) => Task.findByIdAndDelete(id);

export const updateTaskById = (id: string, task: Partial<ITask>) =>
  Task.findByIdAndUpdate(id, { $set: task }, { new: true });
