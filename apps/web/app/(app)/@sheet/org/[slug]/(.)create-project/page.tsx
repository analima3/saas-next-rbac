import ProjectForm from '@/app/(app)/org/[slug]/create-project/project-form'
import { InterceptedSheetContent } from '@/components/intercepted-sheet-content'

export default function CreateProject() {
  return (
    <InterceptedSheetContent title="Create project">
      <div className="p-4">
        <ProjectForm />
      </div>
    </InterceptedSheetContent>
  )
}
