import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getProjects } from '@/dal/get-projects'
import { getCurrentOrganization } from '@/lib/get-current-organization'
import { ArrowRight } from 'lucide-react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export async function ProjectList() {
  const currentOrg = await getCurrentOrganization()

  const { projects } = await getProjects(currentOrg!)
  return (
    <div className="grid grid-cols-3 gap-4">
      {projects.map((project) => {
        return (
          <Card key={project.id}>
            <CardHeader>
              <CardTitle className="text-xl font-medium">
                {project.name}
              </CardTitle>
              <CardDescription className="line-clamp-3 leading-relaxed">
                {project.description}
              </CardDescription>
            </CardHeader>

            <CardFooter className="flex flex-col items-end justify-between gap-6">
              <div className="flex items-center gap-2">
                <Avatar className="size-4">
                  {project.owner.avatarUrl && (
                    <AvatarImage src={project.owner.avatarUrl} />
                  )}
                  <AvatarFallback />
                </Avatar>

                <span className="text-muted-foreground text-xs">
                  Created by{' '}
                  <span className="text-foreground font-medium">
                    {project.owner.name}
                  </span>{' '}
                  {dayjs(project.createdAt).fromNow()}
                </span>
              </div>

              <Button size="xs" variant="outline">
                View <ArrowRight />
              </Button>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
