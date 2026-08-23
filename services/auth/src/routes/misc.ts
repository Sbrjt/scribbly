import { db } from '@/utils/db'
import type { FastifyInstance } from 'fastify'

export default async function loginRoute(app: FastifyInstance) {
	app.get('/', async (req, res) => {
		return {
			message: 'Welcome to my Auth API',
		}
	})

	app.get(
		'/health', //
		async (req, res) => {
			try {
				await db.query(`SELECT 1`)

				res.send({
					status: 'healthy',
					uptime: process.uptime(),
				})
			} catch (err) {
				res.status(503).send({
					status: 'unhealthy',
					database: 'disconnected',
				})
			}
		},
	)
}
