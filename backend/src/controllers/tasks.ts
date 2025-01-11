import { TaskDto } from '../dtos';
import { ITask } from '../interfaces';
import { addTask, findTasks } from '../repositories';
import { ctrlWrapper, HttpError } from '../utils';

export const getTasks = ctrlWrapper(async (req, res) => {
  const tasks = await findTasks();

  const data = tasks.map(TaskDto);

  res.status(200).json({ data });
});

export const createTask = ctrlWrapper(async (req, res) => {
  const newTask: ITask = req.body;

  const createdTask = await addTask(newTask);

  await createdTask.save();

  if (!createdTask) throw HttpError({ status: 500 });

  const data = TaskDto(createdTask);

  res.status(201).json({ data });
});
