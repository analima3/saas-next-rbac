import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ability } from '@/lib/ability'
import OrganizationForm from '../../organization-form'
import { ShutdownOrganization } from './shutdown-organization-button'
import { getCurrentOrganization } from '@/lib/get-current-organization'
import { getOrganization } from '@/dal/get-organization'
import { Billing } from './billing'

export default async function Settings() {
  const currentOrg = await getCurrentOrganization()

  const permissions = await ability()

  const canUpdateOrganization = permissions?.can('update', 'Organization')
  const canShutdownOrganization = permissions?.can('delete', 'Organization')
  const canGetBilling = permissions?.can('get', 'Billing')

  const organization = await getOrganization(currentOrg!)

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Settings</h1>

      {canUpdateOrganization && (
        <Card>
          <CardHeader>
            <CardTitle>Organization settings</CardTitle>
            <CardDescription>Update your organization details</CardDescription>
          </CardHeader>
          <CardContent>
            <OrganizationForm initialData={organization} isUpdating />
          </CardContent>
        </Card>
      )}

      {canGetBilling && <Billing />}

      {canShutdownOrganization && (
        <Card>
          <CardHeader>
            <CardTitle>Shutdown organization</CardTitle>
            <CardDescription>
              This will delete all organization data including all projects. You
              cannot undo this action.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ShutdownOrganization />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
