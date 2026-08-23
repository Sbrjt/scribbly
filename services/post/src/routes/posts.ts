import {
	createPost,
	deletePost,
	getAllPosts,
	getPostById,
	updatePost,
} from '@/services/post'
import {
	createPostSchema,
	getPostsQuerySchema,
	postIdParamSchema,
	updatePostSchema,
} from '@/utils/schema'
import { optionalJwt, verifyJwt } from '@app/common'
import type { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

export const autoPrefix = '/post'

const schema = {
	tags: ['Post'],
	security: [{ bearerAuth: [] }],
}

export default async function postsRoute(app: FastifyInstance) {
	const router = app.withTypeProvider<ZodTypeProvider>()

	// create post
	router.post(
		'/',
		{
			preHandler: verifyJwt,
			schema: {
				...schema,
				body: createPostSchema,
			},
		},
		async (req, res) => {
			const { title, content } = req.body
			const authorId = req.user.sub

			const post = await createPost({ title, content }, authorId)

			return res.status(201).send(post)
		},
	)

	// Get post by id
	router.get(
		'/:id',
		{
			preHandler: optionalJwt,
			schema: {
				...schema,
				params: postIdParamSchema,
			},
		},
		async (req, res) => {
			const { id } = req.params
			const post = await getPostById(id)
			return post
		},
	)

	// Update a post
	router.patch(
		'/:id',
		{
			preHandler: verifyJwt,
			schema: {
				...schema,
				params: postIdParamSchema,
				body: updatePostSchema,
			},
		},
		async (req, res) => {
			const { id } = req.params
			const authorId = req.user.sub

			const updated = await updatePost(id, req.body, authorId)
			return updated
		},
	)

	// Delete a post
	router.delete(
		'/:id',
		{
			preHandler: verifyJwt,
			schema: {
				...schema,
				params: postIdParamSchema,
			},
		},
		async (req, res) => {
			const { id } = req.params
			const authorId = req.user.sub
			await deletePost(id, authorId)
			return 'Post deleted'
		},
	)

	// List all posts — public, with optional filtering
	router.get(
		'/',
		{
			schema: {
				querystring: getPostsQuerySchema,
				tags: ['Post'],
			},
		},
		async (req, res) => {
			const result = await getAllPosts(req.query)
			return res.send({
				posts: result.posts,
				meta: {
					total: result.total,
					page: result.page,
					limit: result.limit,
					totalPages: result.totalPages,
				},
			})
		},
	)

	// Get authenticated user's own posts — must be before //:id
	router.get(
		'/me',
		{
			preHandler: verifyJwt,
			schema: {
				...schema,
				querystring: getPostsQuerySchema.omit({
					authorId: true,
					search: true,
					dateFrom: true,
					dateTo: true,
					page: true,
					limit: true,
				}),
			},
		},
		async (req, res) => {
			const result = await getAllPosts({
				authorId: req.user.sub,
				page: 1,
				limit: 1000,
			})
			return result.posts
		},
	)
}
