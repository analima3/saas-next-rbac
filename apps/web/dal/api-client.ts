import { env } from '@acl/env'
import ky from 'ky'
import { cookies } from 'next/headers'

export const api = ky.create({
  baseUrl: env.NEXT_PUBLIC_API_URL,
  hooks: {
    beforeRequest: [
      async ({ request }) => {
        const cookieStore = await cookies()
        const token = cookieStore.get('token')?.value

        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`)
        }
      },
    ],
  },
})
