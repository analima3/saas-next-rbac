import type { InternalProject } from '../models/project'

type Actions = 'manage' | 'get' | 'create' | 'update' | 'delete'
type Subject = 'Project' | InternalProject

export type ProjectSubject = [Actions, Subject]
