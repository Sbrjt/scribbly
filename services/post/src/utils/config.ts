import '@app/common/src/config'
import { z } from 'zod'

const schema = z.object({
	JWT_SECRET: z.string().min(32),
	POST_SERVICE_PORT: z.coerce.number(),
	POST_DB_NAME: z.string().nonempty(),
	MONGO_HOST: z.string().nonempty(),
	REDIS_PORT: z.coerce.number(),
	REDIS_HOST: z.string().nonempty(),
	MONGO_USERNAME: z.string().nonempty(),
	MONGO_PASSWORD: z.string().nonempty(),
	MONGO_PORT: z.coerce.number(),
	RABBITMQ_USER: z.string().nonempty(),
	RABBITMQ_PASSWORD: z.string().nonempty(),
	RABBITMQ_PORT: z.coerce.number(),
	NODE_ENV: z.enum(['development', 'production']),
})

const env = schema.parse(process.env)

export const config = {
	...env,
	IS_PROD: env.NODE_ENV === 'production',
}

export const shutdown = async () => {}
