'use client'

import { redirectToPathAction } from '@/app/(app)/actions'
import { Button } from './ui/button'

export function SwitchButton({
  children,
  orgSlug,
  projectSlug,
}: {
  children: React.ReactNode
  orgSlug: string
  projectSlug?: string
}) {
  return (
    <form action={() => redirectToPathAction(orgSlug, projectSlug)}>
      <Button
        type="submit"
        variant="ghost"
        className="flex w-full justify-start pl-4"
      >
        {children}
      </Button>
    </form>
  )
}
