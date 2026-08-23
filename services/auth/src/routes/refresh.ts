import { rotateRefreshToken } from '@/services/refresh'
import { config } from '@/utils/config'
import { cookieOptions } from '@/utils/lib'
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

const { ACCESS_TOKEN_TTL } = config

const schema = { tags: ['Auth'] }

export default async function refreshRoute(app: FastifyInstance) {
	const router = app.withTypeProvider<ZodTypeProvider>()

	router.post(
		'/refresh',
		{ schema },
		async (req: FastifyRequest, res: FastifyReply) => {
			const { refreshToken, userId } = await rotateRefreshToken(
				req.cookies.refreshToken,
			)

			// issue new refresh token (cookie)
			res.setCookie('refreshToken', refreshToken, cookieOptions)

			// issue access token (jwt)
			const accessToken = await res.jwtSign(
				{ sub: userId },
				{ expiresIn: ACCESS_TOKEN_TTL },
			)

			return { accessToken }
		},
	)
}
