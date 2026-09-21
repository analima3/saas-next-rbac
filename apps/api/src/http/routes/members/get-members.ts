import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getUserPermission } from '@/utils/get-user-permissions'
import { UnauthorizedError } from '../_errors/unauthorized-error'
import { Role } from '@acl/auth'

export async function getMembers(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/organizations/:slug/members',
      {
        schema: {
          tags: ['Members'],
          summary: 'Get all members on organization.',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
          }),
          response: {
            200: z.object({
              members: z
                .object({
                  id: z.string().uuid(),
                  userId: z.string().uuid(),
                  name: z.string().nullable(),
                  avatarUrl: z.string().url().nullable(),
                  email: z.string(),
                  role: z.nativeEnum(Role),
                })
                .array(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { slug } = request.params

        const userId = await request.getCurrentUserId()
        const { membership, organization } =
          await request.getUserMembership(slug)

        const { cannot } = getUserPermission(userId, membership.role)

        if (cannot('get', 'User')) {
          throw new UnauthorizedError(
            'You are not allowed to see organization members.'
          )
        }

        const members = await prisma.member.findMany({
          select: {
            id: true,
            role: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                avatarUrl: true,
              },
            },
          },
          where: {
            organizationId: organization.id,
          },
          orderBy: {
            role: 'asc',
          },
        })

        const membersWithUsers = members.map(({ user, ...member }) => ({
          ...member,
          ...user,
          userId: user.id,
        }))

        return reply.status(200).send({ members: membersWithUsers })
      }
    )
}
