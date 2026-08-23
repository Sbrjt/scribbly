import '@app/common/src/config'
import ms, { StringValue } from 'ms'
import { z } from 'zod'

const msTime = z.transform((v) => ms(v as StringValue))

const schema = z.object({
	JWT_SECRET: z.string().min(32),
	ACCESS_TOKEN_TTL: msTime,
	REFRESH_TOKEN_TTL: msTime,
	AUTH_SERVICE_PORT: z.coerce.number(),
	AUTH_DB_NAME: z.string().nonempty(),
	PG_HOST: z.string().nonempty(),
	PG_PORT: z.coerce.number(),
	PG_USER: z.string().nonempty(),
	PG_PASSWORD: z.string().nonempty(),
	RABBITMQ_USER: z.string().nonempty(),
	RABBITMQ_PASSWORD: z.string().nonempty(),
	RABBITMQ_PORT: z.coerce.number(),
	REDIS_PORT: z.coerce.number(),
	REDIS_HOST: z.string().nonempty(),
	NODE_ENV: z.enum(['development', 'production']),
})

const env = schema.parse(process.env)

export const config = {
	...env,
	IS_PROD: env.NODE_ENV === 'production',
}
