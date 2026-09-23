'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentProps } from 'react'

interface NavLink extends ComponentProps<typeof Link> {}

export function NavLink(props: NavLink) {
  const pathname = usePathname()
  const isCurrent = props.href.toString() === pathname

  return <Link data-current={isCurrent} {...props} />
}
