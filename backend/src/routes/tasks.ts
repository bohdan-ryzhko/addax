import express from 'express';
import { routes } from '../constants';
import { authenticate, validateBody } from '../middlewares';
import { validateCreateTaskData, validateTasksArray, validateUpdateTaskData } from '../schemas';
import { checkIsHoliday, createTask, getTasks, updateDndTasks, updateTask } from '../controllers';

export const tasksRouter = express.Router();

tasksRouter
  .route(routes.base)
  .post(authenticate, validateBody(validateCreateTaskData), checkIsHoliday, createTask);

tasksRouter
  .route(routes.id)
  .get(authenticate, getTasks)
  .put(authenticate, validateBody(validateUpdateTaskData), checkIsHoliday, updateTask);

tasksRouter
  .route(routes.tasks.dnd)
  .post(authenticate, validateBody(validateTasksArray), updateDndTasks);
