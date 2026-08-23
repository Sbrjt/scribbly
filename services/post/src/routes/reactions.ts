import { addReaction, getReactions, removeReaction } from '@/services/reaction'
import { reactionParamSchema, reactionSchema } from '@/utils/schema'
import { optionalJwt, verifyJwt } from '@app/common'
import type { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

const schema = {
	tags: ['Reaction'],
	security: [{ bearerAuth: [] }],
}

export default async function reactionsRoute(app: FastifyInstance) {
	const router = app.withTypeProvider<ZodTypeProvider>()

	// GET /posts/:postId/reactions — get reaction counts and user's reactions
	router.get(
		'/posts/:postId/reactions',
		{
			preHandler: optionalJwt,
			schema: {
				...schema,
				params: reactionParamSchema,
			},
		},
		async (req, res) => {
			const reactions = await getReactions(req.params.postId, req.user?.sub)
			return reactions
		},
	)

	// POST /posts/:postId/reactions — add or update a reaction (auth required)
	router.post(
		'/posts/:postId/reactions',
		{
			preHandler: verifyJwt,
			schema: {
				...schema,
				params: reactionParamSchema,
				body: reactionSchema,
			},
		},
		async (req, res) => {
			await addReaction(req.params.postId, req.user.sub, req.body.emoji)
			return res.status(201).send('Reaction added')
		},
	)

	// DELETE /posts/:postId/reactions — remove a reaction (auth required)
	router.delete(
		'/posts/:postId/reactions',
		{
			preHandler: verifyJwt,
			schema: {
				...schema,
				params: reactionParamSchema,
				body: reactionSchema,
			},
		},
		async (req, res) => {
			await removeReaction(req.params.postId, req.user.sub, req.body.emoji)
			return 'Reaction deleted'
		},
	)
}
