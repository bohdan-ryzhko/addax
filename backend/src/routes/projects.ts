import express from 'express';
import { routes } from '../constants';
import { authenticate, validateBody } from '../middlewares';
import {
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
  updateProject,
} from '../controllers';
import { validateCreateProjectData } from '../schemas';

export const projectRouter = express.Router();

projectRouter
  .route(routes.base)
  .get(authenticate, getProjects)
  .post(authenticate, validateBody(validateCreateProjectData), createProject);

projectRouter
  .route(routes.id)
  .get(authenticate, getProjectById)
  .put(authenticate, validateBody(validateCreateProjectData), updateProject)
  .delete(authenticate, deleteProject);
