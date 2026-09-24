import { Button } from '@/components/ui/button'
import { ability } from '@/lib/ability'
import { getCurrentOrganization } from '@/lib/get-current-organization'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { ProjectList } from './project-list'

export default async function Projects() {
  const permissions = await ability()

  const currentOrg = await getCurrentOrganization()

  const canCreateProject = permissions?.can('create', 'Project')
  const canGetProject = permissions?.can('get', 'Project')

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Projects</h1>

        {canCreateProject && (
          <Button
            size="sm"
            nativeButton={false}
            render={
              <Link href={`/org/${currentOrg}/create-project`}>
                <Plus className="mr-1 size-4" />
                Create project
              </Link>
            }
          ></Button>
        )}
      </div>

      {canGetProject && <ProjectList />}
      {!canGetProject && (
        <p className="text-muted-foreground text-sm">
          You are not allowed to see organization projects.
        </p>
      )}
    </div>
  )
}
