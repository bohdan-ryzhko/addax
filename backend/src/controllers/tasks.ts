import { TaskDto } from '../dtos';
import { Holiday, ITaskBody } from '../interfaces';
import { addTask, findTasks } from '../repositories';
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

  const createdTask = await addTask({ name, description, date });

  await createdTask.save();

  if (!createdTask) throw HttpError({ status: 500 });

  const data = TaskDto(createdTask);

  res.status(201).json({ data });
});
