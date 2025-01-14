import { TaskDto } from '../dtos';
import { Holiday, ITaskBody, ITaskUpdateBody } from '../interfaces';
import { addTask, findTaskById, findTasks, findTasksByDate, updateTaskById } from '../repositories';
import { ctrlWrapper, HttpError } from '../utils';
import { nagerDateConfig } from '../lib';
import { AxiosResponse } from 'axios';

export const getTasks = ctrlWrapper(async (req, res) => {
  const tasks = await findTasks();

  const data = tasks.map(TaskDto);

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
  const { name, description, date }: ITaskBody = req.body;

  const existingTasksByDate = await findTasksByDate(date);

  const createdTask = await addTask({ name, description, date, order: existingTasksByDate.length });

  await createdTask.save();

  if (!createdTask) throw HttpError({ status: 500 });

  const data = TaskDto(createdTask);

  res.status(201).json({ data });
});

export const updateTask = ctrlWrapper(async (req, res) => {
  const taskId = req.params?.id;

  const task: ITaskUpdateBody = req.body;

  console.log('task', task);

  if (!taskId) throw HttpError({ status: 400, message: 'Task ID is required params' });

  const foundTask = await findTaskById(taskId);

  if (!foundTask) throw HttpError({ status: 404, message: 'Task not found' });

  const updatedTask = await updateTaskById(taskId, task);

  if (!updatedTask) throw HttpError({ status: 500 });

  if (task.reason === 'DROP') {
    const foundTasksByDate = await findTasksByDate(task.date);

    await Promise.all(
      foundTasksByDate
        .filter(task => task._id.toString() !== taskId)
        .map(async task => await updateTaskById(task._id.toString(), { order: task.order - 1 })),
    );
  }

  const data = TaskDto(updatedTask);

  res.status(200).json({ data });
});
