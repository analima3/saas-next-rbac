import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { toInternalOrganization } from '@acl/auth'
import { UnauthorizedError } from '../_errors/unauthorized-error'
import { getUserPermission } from '@/utils/get-user-permissions'
import { z } from 'zod'

export async function shutdownOrganization(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/organizations/:slug',
      {
        schema: {
          tags: ['Organization'],
          summary: 'Shutdown a organization by slug',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
          }),
          response: {
            204: z.undefined(),
          },
        },
      },
      async (request, reply) => {
        const { slug } = request.params

        const userId = await request.getCurrentUserId()
        const { membership, organization } =
          await request.getUserMembership(slug)

        const authOrganization = toInternalOrganization({
          id: organization.id,
          ownerId: organization.ownerId,
        })

        const { cannot } = getUserPermission(userId, membership.role)

        if (cannot('delete', authOrganization)) {
          throw new UnauthorizedError(
            'You are not allowed to shutdown this organization.'
          )
        }

        await prisma.organization.delete({
          where: {
            id: organization.id,
          },
        })

        return reply.status(204).send()
      }
    )
}
