import { prisma } from '@/lib/prisma'
import { compare } from 'bcryptjs'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { UnauthorizedError } from '../_errors/unauthorized-error'
import { BadRequestError } from '../_errors/bad-request-error'

export async function authenticateWithGithub(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/auth/github',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Authenticate a user with github',
        body: z.object({
          code: z.string(),
        }),
        response: {
          // 401: z.object({
          //   message: z.string(),
          // }),
          // 200: z.object({
          //   token: z.string(),
          // }),
        },
      },
    },
    async (request, reply) => {
      const { code } = request.body

      const githubOAuthURL = new URL(process.env.GITHUB_ACCESS_TOKEN_URL!)

      githubOAuthURL.searchParams.set(
        'client_id',
        process.env.GITHUB_CLIENT_ID!
      )
      githubOAuthURL.searchParams.set(
        'client_secret',
        process.env.GITHUB_CLIENT_SECRET!
      )
      githubOAuthURL.searchParams.set(
        'redirect_uri',
        process.env.GITHUB_REDIRECT_URI!
      )
      githubOAuthURL.searchParams.set('code', code)

      const githubAccessTokenResponse = await fetch(githubOAuthURL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      })

      const githubAccessTokenData = await githubAccessTokenResponse.json()

      const { access_token: githubAccessToken } = z
        .object({
          access_token: z.string(),
          token_type: z.literal('bearer'),
          scope: z.string(),
        })
        .parse(githubAccessTokenData)

      const githubUserResponse = await fetch(process.env.GITHUB_GET_USER_URI!, {
        headers: {
          Authorization: `Bearer ${githubAccessToken}`,
        },
      })

      const githubUserDate = await githubUserResponse.json()

      const {
        id: githubId,
        name,
        avatar_url: avatarUrl,
        email,
      } = z
        .object({
          id: z.number().int().transform(String),
          name: z.string().nullable(),
          avatar_url: z.string().url(),
          email: z.string().email(),
        })
        .parse(githubUserDate)

      if (!email) {
        throw new BadRequestError(
          'Your github account must have an email to authenticate'
        )
      }

      let user = await prisma.user.findUnique({
        where: { email },
      })

      if (!user) {
        user = await prisma.user.create({
          data: {
            name,
            email,
            avatarUrl,
          },
        })
      }

      let account = await prisma.account.findUnique({
        where: {
          provider_userId: {
            provider: 'GITHUB',
            userId: user.id,
          },
        },
      })

      if (!account) {
        account = await prisma.account.create({
          data: {
            provider: 'GITHUB',
            providerAccountId: githubId,
            userId: user.id,
          },
        })
      }

      const token = await reply.jwtSign(
        {
          sub: user.id,
          email: user.email,
        },
        { sign: { expiresIn: '7d' } }
      )

      return reply.status(200).send({ token })
    }
  )
}
