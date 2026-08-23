import { updateProfileSchema } from '@/schemas/user'
import { getUserById, updateUser } from '@/services/user'
import { verifyJwt } from '@app/common'
import type { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

const schema = {
	tags: ['Auth'],
	security: [{ bearerAuth: [] }],
}

export default async function meRoute(app: FastifyInstance) {
	const router = app.withTypeProvider<ZodTypeProvider>()

	router.get(
		'/me',
		{
			preHandler: verifyJwt, //
			schema,
		},
		async (req, res) => {
			const user = req.user
			return await getUserById(user.sub)
		},
	)

	router.patch(
		'/',
		{
			preHandler: verifyJwt,
			schema: {
				...schema,
				body: updateProfileSchema,
			},
		},
		async (req, res) => {
			const user = req.user
			await updateUser(user.sub, req.body)
			return res.send({})
		},
	)
}
