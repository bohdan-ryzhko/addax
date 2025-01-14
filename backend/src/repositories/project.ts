import { IProject } from '../interfaces';
import { Project } from '../models';

export const findProjects = (user_id: string) => Project.find({ user_id });

export const findProjectById = (id: string) => Project.findById(id);

export const addProject = (project: IProject) => Project.create(project);

export const updateProjectById = (id: string, project: Partial<IProject>) =>
  Project.findByIdAndUpdate(id, { $set: project }, { new: true });

export const deleteProjectById = (id: string) => Project.findByIdAndDelete(id);
