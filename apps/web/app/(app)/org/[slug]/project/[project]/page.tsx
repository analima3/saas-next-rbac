export default async function Project({
  params,
}: {
  params: Promise<{ project: string }>
}) {
  const { project } = await params

  return (
    <div>
      <p>project {project}</p>
    </div>
  )
}
