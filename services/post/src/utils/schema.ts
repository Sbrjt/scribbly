import { emojis } from '@app/common'
import { Types } from 'mongoose'
import { z } from 'zod'

const objectId = z.string().refine(Types.ObjectId.isValid, 'Invalid ObjectId')
// .transform((id) => new Types.ObjectId(id))

export const createPostSchema = z.object({
	title: z
		.string()
		.min(1, 'Title is required')
		.max(200, 'Title must be less than 200 characters'),
	content: z.string().min(1, 'Content is required'),
})

export const updatePostSchema = createPostSchema.partial()

export const postIdParamSchema = z.object({
	id: objectId,
})

export const getPostsQuerySchema = z.object({
	authorId: z.string().optional(),
	search: z.string().optional(),
	dateFrom: z.string().datetime({ offset: true }).optional(),
	dateTo: z.iso.datetime({ offset: true }).optional(),
	page: z.coerce.number().int().min(1).default(1),
	limit: z.coerce.number().int().min(1).max(100).default(20),
})

export const reactionParamSchema = z.object({
	postId: objectId,
})

export const reactionSchema = z.object({
	emoji: z.enum(emojis),
})

export type CreatePostInput = z.infer<typeof createPostSchema>
export type UpdatePostInput = z.infer<typeof updatePostSchema>
export type GetPostsQuery = z.infer<typeof getPostsQuerySchema>

export type ReactionParam = z.infer<typeof reactionParamSchema>
export type AddReactionInput = z.infer<typeof reactionSchema>
