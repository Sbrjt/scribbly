import { createRefreshToken } from '@/services/refresh'
import { registerUser } from '@/services/register'
import { cookieOptions } from '@/utils/lib'
import { registerBodySchema } from '@/utils/schema'
import type { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

export default async function registerRoute(app: FastifyInstance) {
	const router = app.withTypeProvider<ZodTypeProvider>()

	router.post(
		'/register',
		{
			schema: {
				body: registerBodySchema,
				tags: ['Auth'],
			},
		},
		async (req, res) => {
			const { email, password, name } = req.body

			const user = await registerUser(email, password, name)

			// create refresh token (cookie)
			const refreshToken = await createRefreshToken(user.id)
			res.setCookie('refreshToken', refreshToken, cookieOptions)

			return 'Register successful'
		},
	)
}
