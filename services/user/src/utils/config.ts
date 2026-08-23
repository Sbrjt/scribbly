import '@app/common/src/config'
import { z } from 'zod'

const schema = z.object({
	JWT_SECRET: z.string().min(32),
	USER_SERVICE_PORT: z.coerce.number(),
	USER_DB_NAME: z.string().nonempty(),
	PG_HOST: z.string().nonempty(),
	PG_PORT: z.coerce.number(),
	PG_USER: z.string().nonempty(),
	PG_PASSWORD: z.string().nonempty(),
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
