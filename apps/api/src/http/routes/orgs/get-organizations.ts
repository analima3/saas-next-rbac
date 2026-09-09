import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { Role } from '@prisma/client'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export async function getOrganizations(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/organizations',
      {
        schema: {
          tags: ['Organization'],
          summary: 'Get organization where user is a member.',
          security: [{ bearerAuth: [] }],
          response: {
            200: z.object({
              organizations: z
                .object({
                  id: z.string().uuid(),
                  name: z.string(),
                  slug: z.string(),
                  avatarUrl: z.string().nullable(),
                  role: z.nativeEnum(Role),
                })
                .array(),
            }),
          },
        },
      },
      async (request) => {
        const userId = await request.getCurrentUserId()

        const organizations = await prisma.member.findMany({
          select: {
            role: true,
            organization: {
              select: {
                id: true,
                name: true,
                slug: true,
                avatarUrl: true,
              },
            },
          },
          where: {
            userId,
          },
        })

        const organizationWithRole = organizations.map(
          ({ organization, role }) => {
            return {
              ...organization,
              role,
            }
          }
        )

        return {
          organizations: organizationWithRole,
        }
      }
    )
}
