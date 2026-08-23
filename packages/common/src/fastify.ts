import cookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { FastifyInstance } from 'fastify'
import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
} from 'fastify-type-provider-zod'
import { UnauthorizedError } from './error'

export const pinoLogger = {
	logger: {
		level: 'error',
		transport: {
			target: 'pino-pretty',
			options: {
				ignore: 'time,pid,hostname',
			},
		},
	},
}

export const myLogger = async (req: FastifyRequest, res: FastifyReply) => {
	console.info(`${req.method} ${req.url} -> ${res.statusCode}`)
}

export const registerSwagger = async (app: FastifyInstance, prefix: string) => {
	app.setValidatorCompiler(validatorCompiler)
	app.setSerializerCompiler(serializerCompiler)

	await app.register(fastifySwagger, {
		openapi: {
			servers: [{ url: prefix }],
			components: {
				securitySchemes: {
					bearerAuth: {
						type: 'http',
						scheme: 'bearer',
						bearerFormat: 'JWT',
					},
				},
			},
		},
		transform: jsonSchemaTransform,
	})

	await app.register(fastifySwaggerUi, {
		routePrefix: '/docs',
		indexPrefix: prefix,
	})
}

export async function errorHandle(app: FastifyInstance) {
	app.setErrorHandler((err: any, req, res) => {
		if (err?.statusCode == 500) {
			req.log.error(err)
			res.status(500).send({ error: 'Somthing went wrong :(' })
			return
		}

		throw err
	})
}

export async function useTokens(app: FastifyInstance, secret: string) {
	await app.register(fastifyJwt, { secret }) // for access token
	await app.register(cookie) // for refresh token
}

export const verifyJwt = async (req: FastifyRequest, res: FastifyReply) => {
	try {
		await req.jwtVerify()
		// later use req.user to retrieve the user information
	} catch {
		throw new UnauthorizedError('Access token not found')
	}
}

export const optionalJwt = async (req: FastifyRequest) => {
	try {
		await req.jwtVerify()
	} catch {
		// unauthenticated: pass
	}
}
