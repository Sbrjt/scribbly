import User from '@/models/user'
import { DataSource } from 'typeorm'
import { config } from './config'

const {
	PG_HOST: host,
	PG_PORT: port,
	USER_DB_NAME: database,
	PG_USER: username,
	PG_PASSWORD: password,
	IS_PROD,
} = config

export const db = new DataSource({
	type: 'postgres',
	host,
	port,
	database,
	username,
	password,
	entities: [User],
	synchronize: !IS_PROD,
})

await db.initialize()
