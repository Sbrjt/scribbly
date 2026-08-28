import { config } from '@/utils/config'
import '@/utils/db'
import { shutdown } from '@/utils/lib'
import {
	errorHandle,
	pinoLogger as logger,
	myLogger,
	registerJsonParser,
	registerSwagger,
	useTokens,
} from '@app/common'
import fastifyAutoload from '@fastify/autoload'
import Fastify from 'fastify'
import { join } from 'path'
import './messaging'

const { JWT_SECRET } = config

export const app = Fastify({
	...logger,
	routerOptions: { ignoreTrailingSlash: true },
})

// middlewares
await registerSwagger(app, '/api/user')
registerJsonParser(app)
await useTokens(app, JWT_SECRET)
await errorHandle(app)
app.addHook('onResponse', myLogger)
app.addHook('onClose', shutdown)

// routes
app.register(fastifyAutoload, {
	dir: join(import.meta.dirname, 'routes'),
})

await app.ready()
