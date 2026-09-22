import OrganizationForm from '../../create-organization/organization-form'
import { InterceptedSheetContent } from '@/components/intercepted-sheet-content'

export default function CreateOrganization() {
  return (
    <InterceptedSheetContent title="Create organization">
      <div className="p-4">
        <OrganizationForm />
      </div>
    </InterceptedSheetContent>
  )
}
