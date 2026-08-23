import { config } from '@/utils/config'
import { createClient } from 'redis'
import { Client } from 'redis-om'

const { REDIS_PORT, REDIS_HOST } = config

export const connection = createClient({
	url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
})

await connection.connect()

export const redis = await new Client().use(connection)
