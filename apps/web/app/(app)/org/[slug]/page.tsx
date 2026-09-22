export default async function Projects({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return (
    <div>
      <p>projects {slug}</p>
    </div>
  )
}
