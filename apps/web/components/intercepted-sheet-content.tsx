'use client'

import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet'

import { useRouter } from 'next/navigation'

export function InterceptedSheetContent({
  children,
  title,
}: {
  children: React.ReactNode
  title: string
}) {
  const router = useRouter()

  function handleOpenChange(open: boolean) {
    if (!open) {
      router.back()
    }
  }

  return (
    <Sheet defaultOpen onOpenChange={handleOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>

        {children}
      </SheetContent>
    </Sheet>
  )
}
