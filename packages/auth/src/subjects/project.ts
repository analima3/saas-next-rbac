import type { Project } from '../models/project'

type Actions = 'manage' | 'get' | 'create' | 'update' | 'delete'
type Subject = 'Project' | Project

export type ProjectSubject = [Actions, Subject]
