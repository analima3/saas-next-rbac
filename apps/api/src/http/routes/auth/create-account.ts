import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

const bodyCreateAccount = {
  body: z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
  }),
}

export async function createAccount(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .post('/users', { schema: bodyCreateAccount }, async (request, reply) => {
      const { name, email, password } = request.body

      const userWithSameEmail = await prisma.user.findUnique({
        where: { email },
      })

      if (userWithSameEmail) {
        return reply.status(400).send({ message: 'User already exists' })
      }

      const passwordHash = await bcrypt.hash(password, 6)

      const user = await prisma.user.create({
        data: {
          name,
          email,
          passwordHash,
        },
      })

      return reply.status(201).send({ message: 'User created successfully' })
    })
}
