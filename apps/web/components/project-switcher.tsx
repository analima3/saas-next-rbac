'use client'

import { ChevronsUpDown, PlusCircle } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import Link from 'next/link'
import { SwitchButton } from './switch-button'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getProjects } from '@/dal/get-projects'
import { Skeleton } from './ui/skeleton'

export function ProjectSwitcher() {
  const { slug: orgSlug, project: projectSlug } = useParams<{
    slug: string
    project: string
  }>()

  const { data, isLoading } = useQuery({
    queryKey: [orgSlug, 'projects'],
    queryFn: () => getProjects(orgSlug),
    enabled: !!orgSlug,
  })

  const currentProject = data?.projects.find(
    (project) => project.slug === projectSlug
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-visible:ring-primary flex w-42 items-center gap-2 rounded p-1 text-sm font-medium outline-none focus-visible:ring-2">
        {isLoading ? (
          <>
            <Skeleton className="size-4 rounded-full" />
            <Skeleton className="size-4 w-full flex-1" />
          </>
        ) : (
          <>
            {currentProject ? (
              <>
                <Avatar className="mr-1 size-4">
                  {currentProject.avatarUrl && (
                    <AvatarImage src={currentProject.avatarUrl} />
                  )}
                  <AvatarFallback />
                </Avatar>
                <span className="truncate">{currentProject.name}</span>
              </>
            ) : (
              <span className="text-muted-foreground">Select project</span>
            )}
          </>
        )}
        <ChevronsUpDown className="text-muted-foreground ml-auto size-4 shrink-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-50"
        alignOffset={-16}
        align="end"
        sideOffset={12}
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>Projects</DropdownMenuLabel>
          {data?.projects.map((project) => {
            return (
              <DropdownMenuItem
                key={project.id}
                nativeButton={false}
                render={
                  <SwitchButton orgSlug={orgSlug} projectSlug={project.slug}>
                    <Avatar className="mr-1 size-4">
                      {project.avatarUrl && (
                        <AvatarImage src={project.avatarUrl} />
                      )}
                      <AvatarFallback />
                    </Avatar>
                    <span className="truncate">{project.name}</span>
                  </SwitchButton>
                }
              ></DropdownMenuItem>
            )
          })}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          render={
            <Link href={`/org/${orgSlug}/create-project`}>
              <PlusCircle className="mr-1 size-4" /> <span>Create new</span>
            </Link>
          }
        ></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
