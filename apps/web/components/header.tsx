import { LayoutDashboard, Slash } from 'lucide-react'
import { ProfileButton } from './profile-button'
import { OrganizationSwitcher } from './organization-switcher'
import { ability } from '@/ability/ability'

export async function Header() {
  const permissions = await ability()

  return (
    <div className="mx-auto flex max-w-300 items-center justify-between">
      <div className="flex items-center gap-3">
        <LayoutDashboard className="size-6" />

        <Slash className="text-border size-3 -rotate-24" />

        <OrganizationSwitcher />

        {permissions?.can('get', 'Project') && <p>projects</p>}
      </div>

      <div className="flex items-center gap-4">
        <ProfileButton />
      </div>
    </div>
  )
}
