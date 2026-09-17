import { FastifyInstance } from 'fastify'
import { BadRequestError } from './routes/_errors/bad-request-error'
import { NotFoundError } from './routes/_errors/not-found-error'
import { UnauthorizedError } from './routes/_errors/unauthorized-error'
import { hasZodFastifySchemaValidationErrors } from 'fastify-type-provider-zod'

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, _, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: error.validation,
    })
  }

  if (error instanceof BadRequestError) {
    return reply.status(400).send({
      message: error.message,
    })
  }

  if (error instanceof NotFoundError) {
    return reply.status(404).send({
      message: error.message,
    })
  }

  if (error instanceof UnauthorizedError) {
    return reply.status(401).send({
      message: error.message,
    })
  }

  console.error(error)

  return reply.status(500).send({
    message: 'Internal server error',
  })
}
