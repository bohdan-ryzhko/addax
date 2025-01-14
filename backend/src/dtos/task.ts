import { ITaskDTO, ITaskDocument } from '../interfaces';

export const TaskDto = (taskDocument: ITaskDocument): ITaskDTO => ({
  name: taskDocument.name,
  description: taskDocument.description,
  id: taskDocument._id.toString(),
  date: taskDocument.date,
  order: taskDocument.order,
});
