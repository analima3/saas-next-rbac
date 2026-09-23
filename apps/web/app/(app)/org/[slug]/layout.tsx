import { Tabs } from '@/components/tabs'

export default function OrgLayout({ children }: LayoutProps<'/'>) {
  return (
    <div className="space-y-4 py-4">
      <Tabs />

      {children}
    </div>
  )
}
