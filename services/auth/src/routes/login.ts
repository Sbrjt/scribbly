import { loginUser } from '@/services/login'
import { createRefreshToken } from '@/services/refresh'
import { cookieOptions } from '@/utils/lib'
import { loginBodySchema } from '@/utils/schema'
import { UnauthorizedError } from '@app/common'
import type { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

export default async function loginRoute(app: FastifyInstance) {
	const router = app.withTypeProvider<ZodTypeProvider>()

	router.post(
		'/login',
		{
			schema: {
				body: loginBodySchema,
				tags: ['Auth'],
			},
		},
		async (req, res) => {
			const { email, password } = req.body

			const user = await loginUser(email, password)

			if (!user) {
				throw new UnauthorizedError('Wrong email or password')
			}

			// create refresh token (cookie)
			const refreshToken = await createRefreshToken(user.id)
			res.setCookie('refreshToken', refreshToken, cookieOptions)

			return 'Login successful'
		},
	)
}
