import { config } from '@/utils/config'
import { shutdown } from '@/utils/lib'
import { connectToDatabase } from '@/utils/mongoose'
import '@/utils/redis'
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

const { JWT_SECRET } = config

await connectToDatabase()

export const app = Fastify({
	...logger,
	routerOptions: { ignoreTrailingSlash: true },
})

// middlewares
await registerSwagger(app, '/api/post')
registerJsonParser(app)
await useTokens(app, JWT_SECRET)
await errorHandle(app)
app.addHook('onResponse', myLogger)
app.addHook('onClose', shutdown)

// register routes
app.register(fastifyAutoload, {
	dir: join(import.meta.dirname, 'routes'),
})

await app.ready()
