import { ProjectDto } from '../dtos';
import { IProject, UserRequest } from '../interfaces';
import {
  addProject,
  deleteProjectById,
  findProjectById,
  findProjects,
  updateProjectById,
} from '../repositories';
import { ctrlWrapper, HttpError } from '../utils';

export const getProjects = ctrlWrapper(async (req: UserRequest, res) => {
  const user = req.user;

  if (!user) throw HttpError({ status: 401 });

  const projects = await findProjects(user._id.toString());

  if (!projects) throw HttpError({ status: 500 });

  const data = projects.map(ProjectDto);

  res.status(200).json({ data });
});

export const checkProjectId = ctrlWrapper(async (req, res, next) => {
  const projectId = req.params?.id;

  if (!projectId) throw HttpError({ status: 400, message: 'Project ID is required' });

  next();
});

export const getProjectById = ctrlWrapper(async (req, res) => {
  const projectId = req.params?.id;

  const foundProject = await findProjectById(projectId);

  if (!foundProject) throw HttpError({ status: 404, message: 'Project not found' });

  const data = ProjectDto(foundProject);

  res.status(200).json({ data });
});

export const createProject = ctrlWrapper(async (req: UserRequest, res) => {
  const newProject: IProject = req.body;
  const user = req.user;

  if (!user) throw HttpError({ status: 401 });

  const createdProject = await addProject({ ...newProject, user_id: user._id });

  if (!createdProject) throw HttpError({ status: 500 });

  const data = ProjectDto(createdProject);

  res.status(201).json({ data });
});

export const updateProject = ctrlWrapper(async (req, res) => {
  const projectId = req.params?.id;
  const newProject: IProject = req.body;

  const foundProject = await findProjectById(projectId);

  if (!foundProject) throw HttpError({ status: 404, message: 'Project not found' });

  const updatedProject = await updateProjectById(projectId, newProject);

  if (!updatedProject) throw HttpError({ status: 500 });

  const data = ProjectDto(updatedProject);

  res.status(201).json({ data });
});

export const deleteProject = ctrlWrapper(async (req, res) => {
  const projectId = req.params?.id;

  const foundProject = await findProjectById(projectId);

  if (!foundProject) throw HttpError({ status: 404, message: 'Project not found' });

  const deletedProject = await deleteProjectById(projectId);

  if (!deletedProject) throw HttpError({ status: 500 });

  res.status(204).json({});
});
