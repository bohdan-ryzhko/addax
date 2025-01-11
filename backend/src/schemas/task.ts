import Joi from 'joi';
import { ITask } from '../interfaces';

export const validateCreateTaskData = Joi.object<ITask>({
  name: Joi.string().min(5).required(),
  description: Joi.string().min(10).required(),
});
