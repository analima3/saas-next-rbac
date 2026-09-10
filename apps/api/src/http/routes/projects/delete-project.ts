import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getUserPermission } from '@/utils/get-user-permissions'
import { UnauthorizedError } from '../_errors/unauthorized-error'
import { toInternalProject } from '@acl/auth'

export async function deleteProject(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/organizations/:slug/projects/:projectId',
      {
        schema: {
          tags: ['Project'],
          summary: 'Delete a project from a organization.',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
            projectId: z.string().uuid(),
          }),
          response: {
            204: z.undefined(),
          },
        },
      },
      async (request, reply) => {
        const { slug, projectId } = request.params

        const userId = await request.getCurrentUserId()
        const { membership } = await request.getUserMembership(slug)

        const authProject = toInternalProject({
          id: projectId,
          ownerId: userId,
        })

        const { cannot } = getUserPermission(userId, membership.role)

        if (cannot('delete', authProject)) {
          throw new UnauthorizedError(
            'You are not allowed to create new projects.'
          )
        }

        await prisma.project.delete({
          where: {
            id: projectId,
          },
        })

        return reply.status(204).send()
      }
    )
}
