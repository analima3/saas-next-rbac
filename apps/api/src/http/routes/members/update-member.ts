import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getUserPermission } from '@/utils/get-user-permissions'
import { UnauthorizedError } from '../_errors/unauthorized-error'
import { Role } from '@acl/auth'

export async function updateMember(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
      '/organizations/:slug/members/:memberId',
      {
        schema: {
          tags: ['Members'],
          summary: 'Update a member from a organization.',
          security: [{ bearerAuth: [] }],
          body: z.object({
            role: z.nativeEnum(Role),
          }),
          params: z.object({
            slug: z.string(),
            memberId: z.string().uuid(),
          }),
          response: {
            204: z.undefined(),
          },
        },
      },
      async (request, reply) => {
        const { slug, memberId } = request.params

        const userId = await request.getCurrentUserId()
        const { membership, organization } =
          await request.getUserMembership(slug)

        const { cannot } = getUserPermission(userId, membership.role)

        if (cannot('update', 'User')) {
          throw new UnauthorizedError(
            'You are not allowed to update this member.'
          )
        }

        const { role } = request.body

        await prisma.member.update({
          where: {
            id: memberId,
            organizationId: organization.id,
          },
          data: {
            role,
          },
        })

        return reply.status(204).send()
      }
    )
}
