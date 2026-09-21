import { LayoutDashboard, Slash } from 'lucide-react'
import { ProfileButton } from './profile-button'
import { OrganizationSwitcher } from './organization-switcher'
import { ability } from '@/ability/ability'
import { Separator } from './ui/separator'
import { ThemeSwitcher } from './theme/theme-switcher'

export async function Header() {
  const permissions = await ability()

  return (
    <div className="mx-auto flex max-w-300 items-center justify-between">
      <div className="flex items-center gap-3">
        <LayoutDashboard className="size-6" />

        <Slash className="text-border size-3 rotate-[-24deg]" />

        <OrganizationSwitcher />

        {permissions?.can('get', 'Project') && <p>Project</p>}
      </div>

      <div className="flex items-center gap-4">
        <ThemeSwitcher />
        <div className="h-5">
          <Separator orientation="vertical" className="h-5" />
        </div>
        <ProfileButton />
      </div>
    </div>
  )
}
