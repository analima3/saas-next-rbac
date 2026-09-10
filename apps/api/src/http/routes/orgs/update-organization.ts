import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { BadRequestError } from '../_errors/bad-request-error'
import { toInternalOrganization } from '@acl/auth'
import { UnauthorizedError } from '../_errors/unauthorized-error'
import { getUserPermission } from '@/utils/get-user-permissions'
import { z } from 'zod'

export async function updateOrganization(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
      '/organizations/:slug',
      {
        schema: {
          tags: ['Organization'],
          summary: 'Update a organization by slug',
          security: [{ bearerAuth: [] }],
          body: z.object({
            name: z.string(),
            domain: z.string().nullish(),
            shouldAttachUsersByDomain: z.boolean().optional(),
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
        const { name, domain, shouldAttachUsersByDomain } = request.body

        const userId = await request.getCurrentUserId()
        const { membership, organization } =
          await request.getUserMembership(slug)

        const authOrganization = toInternalOrganization({
          id: organization.id,
          ownerId: userId,
        })

        const { cannot } = getUserPermission(userId, membership.role)

        if (cannot('update', authOrganization)) {
          throw new UnauthorizedError(
            'You are not allowed to update this organization.'
          )
        }

        const organizationBySlug = await prisma.organization.findUnique({
          where: {
            id: organization.id,
          },
        })

        if (!organizationBySlug) {
          throw new BadRequestError('Organization not found by slug.')
        }

        await prisma.organization.update({
          where: {
            id: organization.id,
          },
          data: {
            name,
            domain,
            shouldAttachUsersByDomain,
          },
        })

        return reply.status(204).send()
      }
    )
}
