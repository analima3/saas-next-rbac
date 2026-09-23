'use client'

import { ThemeProvider } from '@teispace/next-themes'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/react-query'

export function Providers({ children }: { children: React.ReactNode }) {
  const scriptProps =
    typeof window === 'undefined'
      ? undefined
      : ({ type: 'application/json' } as const)

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        scriptProps={scriptProps}
        attribute="class"
        defaultTheme="dark"
        disableTransitionOnChange
        enableSystem
      >
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  )
}
