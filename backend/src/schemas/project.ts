import Joi from 'joi';
import { IProject } from '../interfaces';

export const validateCreateProjectData = Joi.object<IProject>({
  name: Joi.string().min(5).required(),
});
