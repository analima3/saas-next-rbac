import { auth } from '@/http/middlewares/auth'
import { Role } from '@acl/auth'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export async function getMembership(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/organizations/:slug/membership',
      {
        schema: {
          tags: ['Organization'],
          summary: 'Get user membership by slug on organization.',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
          }),
          response: {
            200: z.object({
              membership: z.object({
                id: z.string().uuid(),
                role: z.nativeEnum(Role),
                organizationId: z.string().uuid(),
                userId: z.string(),
              }),
            }),
          },
        },
      },
      async (request) => {
        const { slug } = request.params

        const {
          membership: { id, role, organizationId, userId },
        } = await request.getUserMembership(slug)

        return {
          membership: {
            id,
            role,
            organizationId,
            userId,
          },
        }
      }
    )
}
