import express from 'express';
import { routes } from '../constants';
import { authenticate, validateBody } from '../middlewares';
import { validateCreateTaskData, validateUpdateTaskData } from '../schemas';
import { checkIsHoliday, createTask, getTasks, updateTask } from '../controllers';

export const tasksRouter = express.Router();

tasksRouter
  .route(routes.base)
  .get(getTasks)
  .post(authenticate, validateBody(validateCreateTaskData), checkIsHoliday, createTask);

tasksRouter
  .route(routes.id)
  .put(authenticate, validateBody(validateUpdateTaskData), checkIsHoliday, updateTask);
