import Joi from 'joi';
import { ITaskBody } from '../interfaces';

export const validateCreateTaskData = Joi.object<ITaskBody>({
  name: Joi.string().min(5).required(),
  description: Joi.string().min(10).required(),
  date: Joi.string().required(),
  countryCode: Joi.string().required(),
});

export const validateUpdateTaskData = validateCreateTaskData
  .fork(['name', 'description', 'date'], schema => schema.optional())
  .append({
    order: Joi.number().optional(),
    countryCode: Joi.string().required(),
    reason: Joi.string().optional(),
  });
