import { client } from '@/utils/redis'
import type { FastifyInstance } from 'fastify'
import mongoose from 'mongoose'

export default async function loginRoute(app: FastifyInstance) {
	app.get('/', async (req, res) => {
		return {
			message: 'Welcome to my Post API',
		}
	})

	app.get(
		'/health', //
		async (req, res) => {
			try {
				await mongoose.connection.db?.command({ ping: 1 })
				await client.ping()

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
