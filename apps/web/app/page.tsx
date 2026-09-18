import { getUserProfile } from '@/dal/get-user-profile'

export default async function Home() {
  const user = await getUserProfile()
  return <pre>{JSON.stringify(user)}</pre>
}
