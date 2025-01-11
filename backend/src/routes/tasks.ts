import express from 'express';
import { routes } from '../constants';
import { validateBody } from '../middlewares';
import { validateCreateTaskData } from '../schemas';
import { createTask, getTasks } from '../controllers';

export const tasksRouter = express.Router();

tasksRouter.route(routes.base).get(getTasks).post(validateBody(validateCreateTaskData), createTask);
