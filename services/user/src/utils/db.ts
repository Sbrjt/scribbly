import User from '@/models/user'
import pg from 'pg'
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

const ensureDatabaseExists = async () => {
	const client = new pg.Client({
		host,
		port,
		database: 'postgres',
		user: username,
		password,
		ssl: IS_PROD ? { rejectUnauthorized: false } : false,
	})

	try {
		await client.connect()
		const res = await client.query(
			'SELECT 1 FROM pg_database WHERE datname = $1',
			[database]
		)
		if (res.rowCount === 0) {
			await client.query(`CREATE DATABASE "${database}"`)
		}
	} catch (error) {
		console.error('Error verifying/creating database:', error)
		throw error
	} finally {
		await client.end().catch(() => {})
	}
}

export const db = new DataSource({
	type: 'postgres',
	host,
	port,
	database,
	username,
	password,
	ssl: IS_PROD ? { rejectUnauthorized: false } : false,
	entities: [User],
	synchronize: true,
})

await ensureDatabaseExists()
await db.initialize()
