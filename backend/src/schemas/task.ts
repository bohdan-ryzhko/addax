import Joi from 'joi';
import { ITaskDTO, ITaskBody } from '../interfaces';

export const validateCreateTaskData = Joi.object<ITaskBody>({
  name: Joi.string().min(5).required(),
  description: Joi.string().min(10).required(),
  date: Joi.string().required(),
  countryCode: Joi.string().required(),
  project_id: Joi.string().required(),
});

export const validateUpdateTaskData = validateCreateTaskData
  .fork(['name', 'description', 'date', 'project_id'], schema => schema.optional())
  .append({
    order: Joi.number().optional(),
    countryCode: Joi.string().required(),
    reason: Joi.string().optional(),
  });

export const validateTasksArray = Joi.object({
  tasks: Joi.array().items(
    Joi.object<ITaskDTO>({
      date: Joi.string().required(),
      description: Joi.string().min(10).required(),
      id: Joi.string().required(),
      name: Joi.string().min(5).required(),
      order: Joi.number().required(),
      project_id: Joi.string().required(),
    }),
  ),
});
