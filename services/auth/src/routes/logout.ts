import { cookieOptions } from '@/utils/lib'
import type { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

export default async function logoutRoute(app: FastifyInstance) {
	const router = app.withTypeProvider<ZodTypeProvider>()

	router.post(
		'/logout',
		{
			schema: {
				tags: ['Auth'],
			},
		},
		async (req, res) => {
			res.clearCookie('refreshToken', cookieOptions)
			return 'Logout successful'
		},
	)
}
