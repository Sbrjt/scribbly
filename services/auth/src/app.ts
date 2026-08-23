import { config } from '@/utils/config'
import { initializeDatabase } from '@/utils/db'
import { shutdown } from '@/utils/lib'
import '@/utils/rabbit'
import {
	errorHandle,
	pinoLogger as logger,
	myLogger,
	registerSwagger,
	useTokens,
} from '@app/common'
import fastifyAutoload from '@fastify/autoload'
import Fastify from 'fastify'
import { join } from 'path'

const { JWT_SECRET } = config

export const app = Fastify({ ...logger, ignoreTrailingSlash: true })

// initialize database
await initializeDatabase()

// middlewares
await registerSwagger(app, '/api/auth')
await useTokens(app, JWT_SECRET)
await errorHandle(app)
app.addHook('onResponse', myLogger)
app.addHook('onClose', shutdown)

// routes
app.register(fastifyAutoload, {
	dir: join(import.meta.dirname, 'routes'),
})

await app.ready()
