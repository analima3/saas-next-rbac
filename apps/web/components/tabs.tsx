import { Button } from './ui/button'
import { getCurrentOrganization } from '@/lib/get-current-organization'
import { NavLink } from './nav-link'

export async function Tabs() {
  const orgSlug = await getCurrentOrganization()

  return (
    <div className="border-b py-4">
      <nav className="mx-auto flex max-w-300 items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          nativeButton={false}
          className="text-muted-foreground data-[current=true]:text-foreground"
          render={<NavLink href={`/org/${orgSlug}`}>Projects</NavLink>}
        />
        <Button
          variant="ghost"
          size="sm"
          nativeButton={false}
          className="text-muted-foreground data-[current=true]:text-foreground"
          render={<NavLink href={`/org/${orgSlug}/members`}>Members</NavLink>}
        />
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
      </nav>
    </div>
  )
}
