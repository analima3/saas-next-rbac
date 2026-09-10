import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { BadRequestError } from '../_errors/bad-request-error'
import { toInternalOrganization } from '@acl/auth'
import { UnauthorizedError } from '../_errors/unauthorized-error'
import { getUserPermission } from '@/utils/get-user-permissions'
import { z } from 'zod'

export async function transferOrganization(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .patch(
      '/organizations/:slug/owner',
      {
        schema: {
          tags: ['Organization'],
          summary: 'Tranfer a organization ownership by slug',
          security: [{ bearerAuth: [] }],
          body: z.object({
            newOwnerId: z.string().uuid(),
          }),
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
          ownerId: userId,
        })

        const { cannot } = getUserPermission(userId, membership.role)

        if (cannot('transfer_ownership', authOrganization)) {
          throw new UnauthorizedError(
            'You are not allowed to update this organization.'
          )
        }

        const { newOwnerId } = request.body

        const transferToMembership = await prisma.member.findUnique({
          where: {
            organizationId_userId: {
              organizationId: organization.id,
              userId: newOwnerId,
            },
          },
        })

        if (!transferToMembership) {
          throw new BadRequestError(
            'Target user is not a member of this organization.'
          )
        }

        await prisma.$transaction([
          prisma.member.update({
            where: {
              organizationId_userId: {
                organizationId: organization.id,
                userId: newOwnerId,
              },
            },
            data: {
              role: 'ADMIN',
            },
          }),
          prisma.organization.update({
            where: {
              id: organization.id,
            },
            data: {
              ownerId: newOwnerId,
            },
          }),
        ])

        return reply.status(204).send()
      }
    )
}
