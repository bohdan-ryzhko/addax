import { IProjectDocument, IProjectDTO } from '../interfaces';

export const ProjectDto = (projectDocument: IProjectDocument): IProjectDTO => ({
  id: projectDocument._id.toString(),
  name: projectDocument.name,
});
