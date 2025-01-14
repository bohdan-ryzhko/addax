import express from 'express';
import { routes } from '../constants';
import { validateBody } from '../middlewares';
import { validateCreateTaskData, validateUpdateTaskData } from '../schemas';
import { checkIsHoliday, createTask, getTasks, updateTask } from '../controllers';

export const tasksRouter = express.Router();

tasksRouter
  .route(routes.base)
  .get(getTasks)
  .post(validateBody(validateCreateTaskData), checkIsHoliday, createTask);

tasksRouter.route(routes.id).put(validateBody(validateUpdateTaskData), checkIsHoliday, updateTask);
