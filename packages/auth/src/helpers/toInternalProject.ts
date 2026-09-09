import type { InternalProject, Project } from '../models/project'

export function toInternalProject(project: Project): InternalProject {
  return {
    __typename: 'Project',
    ...project,
  }
}
