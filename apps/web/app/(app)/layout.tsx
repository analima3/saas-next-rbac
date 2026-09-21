import { Header } from '@/components/header'

export default function AppLayout({ children }: LayoutProps<'/'>) {
  return (
    <div className="space-y-4 py-4">
      <Header />

      <main className="mx-auto w-full max-w-300">{children}</main>
    </div>
  )
}
