import { AxiosResponse } from 'axios';
import { TaskDto } from '../dtos';
import { Holiday, ITaskBody, ITaskDTO, ITaskUpdateBody } from '../interfaces';
import {
  addTask,
  findProjectById,
  findTaskById,
  findTasks,
  findTasksByDate,
  updateTaskById,
} from '../repositories';
import { ctrlWrapper, HttpError } from '../utils';
import { nagerDateConfig } from '../lib';
import { Types } from 'mongoose';

export const getTasks = ctrlWrapper(async (req, res) => {
  const projectId = req.params?.id;

  if (!projectId) throw HttpError({ status: 400, message: 'Project ID is required' });

  const tasks = await findTasks(projectId);

  const data = tasks.map(TaskDto).toSorted((a, b) => a.order - b.order);

  res.status(200).json({ data });
});

export const checkIsHoliday = ctrlWrapper(async (req, res, next) => {
  const { date, countryCode }: ITaskBody = req.body;

  const [year] = date.split('-');

  const holidaysResponse: AxiosResponse<Holiday[]> = await nagerDateConfig.get(
    `/api/v3/PublicHolidays/${year}/${countryCode}`,
  );

  const findHoliday = holidaysResponse.data.find(holiday => holiday.date === date);

  if (findHoliday)
    throw HttpError({
      status: 403,
      message: 'You cannot create a task for the selected day because it is a holiday.',
    });

  next();
});

export const createTask = ctrlWrapper(async (req, res) => {
  const { name, description, date, project_id }: ITaskBody = req.body;

  const foundProject = await findProjectById(project_id);

  if (!foundProject) throw HttpError({ status: 404, message: 'Project not found' });

  const existingTasksByDate = await findTasksByDate(date);

  const createdTask = await addTask({
    name,
    description,
    project_id: foundProject._id,
    date,
    order: existingTasksByDate.length,
  });

  await createdTask.save();

  if (!createdTask) throw HttpError({ status: 500 });

  const data = TaskDto(createdTask);

  res.status(201).json({ data });
});

export const updateTask = ctrlWrapper(async (req, res) => {
  const taskId = req.params?.id;

  const task: ITaskUpdateBody = req.body;

  if (!taskId) throw HttpError({ status: 400, message: 'Task ID is required params' });

  const foundTask = await findTaskById(taskId);

  if (!foundTask) throw HttpError({ status: 404, message: 'Task not found' });

  const updatedTask = await updateTaskById(taskId, task);

  if (!updatedTask) throw HttpError({ status: 500 });

  const data = TaskDto(updatedTask);

  res.status(200).json({ data });
});

export const updateDndTasks = ctrlWrapper(async (req, res) => {
  const newTasks: { tasks: ITaskDTO[] } = req.body;

  const data = await Promise.all(
    newTasks.tasks.map(async ({ id, ...task }) => {
      const foundTask = await findTaskById(id);

      if (!foundTask)
        throw HttpError({ status: 404, message: `Task ${task.name || id} not found` });

      const updatedTask = await updateTaskById(foundTask._id.toString(), {
        ...task,
        project_id: new Types.ObjectId(task.project_id),
      });

      if (!updatedTask) throw HttpError({ status: 500 });

      return TaskDto(updatedTask);
    }),
  );

  res.status(201).json({ data });
});
