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
import { getOrganizations } from '@/dal/get-organizations'
import { cookies } from 'next/headers'

export async function OrganizationSwitcher() {
  const cookieStore = await cookies()
  const orgSlug = cookieStore.get('org')?.value

  const { organizations } = await getOrganizations()
  const currentOrganization = organizations.find((org) => org.slug === orgSlug)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-visible:ring-primary flex w-42 items-center gap-2 rounded p-1 text-sm font-medium outline-none focus-visible:ring-2">
        {currentOrganization ? (
          <>
            <Avatar className="mr-1 size-4">
              {currentOrganization.avatarUrl && (
                <AvatarImage src={currentOrganization.avatarUrl} />
              )}
              <AvatarFallback />
            </Avatar>
            <span className="truncate">{currentOrganization.name}</span>
          </>
        ) : (
          <span className="text-muted-foreground">Select organization</span>
        )}
        <ChevronsUpDown className="text-muted-foreground ml-auto size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-50"
        alignOffset={-16}
        align="end"
        sideOffset={12}
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>Organizations</DropdownMenuLabel>
          {organizations.map((org) => {
            return (
              <DropdownMenuItem
                key={org.id}
                nativeButton={false}
                render={
                  <a href={`/org/${org.slug}`}>
                    <Avatar className="mr-1 size-4">
                      {org.avatarUrl && <AvatarImage src={org.avatarUrl} />}
                      <AvatarFallback />
                    </Avatar>
                    <span className="truncate">{org.name}</span>
                  </a>
                }
              ></DropdownMenuItem>
            )
          })}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          nativeButton={false}
          render={
            <a href="/create-organization">
              <PlusCircle className="mr-1 size-4" /> <span>Create new</span>
            </a>
          }
        ></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
