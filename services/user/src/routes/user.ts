import { userParamsSchema } from '@/schemas/user'
import { getUserById } from '@/services/user'
import type { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

export default async function userRoute(app: FastifyInstance) {
	const router = app.withTypeProvider<ZodTypeProvider>()

	router.get(
		'/users/:id',
		{ schema: { params: userParamsSchema } },
		async (req, res) => {
			return await getUserById(req.params.id)
		},
	)
}
