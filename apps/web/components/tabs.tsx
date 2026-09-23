import { Button } from './ui/button'
import { getCurrentOrganization } from '@/lib/get-current-organization'
import { NavLink } from './nav-link'
import { ability } from '@/lib/ability'

export async function Tabs() {
  const orgSlug = await getCurrentOrganization()

  const permissions = await ability()

  const canUpdateOrganization = permissions?.can('update', 'Organization')
  const canGetBilling = permissions?.can('get', 'Billing')

  const canGetProjects = permissions?.can('get', 'Project')
  const canGetMemebers = permissions?.can('get', 'User')

  return (
    <div className="border-b py-4">
      <nav className="mx-auto flex max-w-300 items-center gap-2">
        {canGetProjects && (
          <Button
            variant="ghost"
            size="sm"
            nativeButton={false}
            className="text-muted-foreground data-[current=true]:text-foreground"
            render={<NavLink href={`/org/${orgSlug}`}>Projects</NavLink>}
          />
        )}

        {canGetMemebers && (
          <Button
            variant="ghost"
            size="sm"
            nativeButton={false}
            className="text-muted-foreground data-[current=true]:text-foreground"
            render={<NavLink href={`/org/${orgSlug}/members`}>Members</NavLink>}
          />
        )}

        {(canUpdateOrganization || canGetBilling) && (
          <Button
            variant="ghost"
            size="sm"
            nativeButton={false}
            className="text-muted-foreground data-[current=true]:text-foreground"
            render={
              <NavLink href={`/org/${orgSlug}/settings`}>
                Settings & Billings
              </NavLink>
            }
          />
        )}
      </nav>
    </div>
  )
}
