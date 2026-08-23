import Author from '@/models/author'
import Post from '@/models/post'
import PostCache from '@/models/postCache'
import type {
	CreatePostInput,
	GetPostsQuery,
	UpdatePostInput,
} from '@/utils/schema'
import { ForbiddenError, NotFoundError } from '@app/common'
import { getUser } from './user'

export const createPost = async (post: CreatePostInput, authorId: string) => {
	// Check if author exists, if not create one in author collection

	const author = await Author.findById(authorId)

	if (!author) {
		const user = await getUser(authorId)

		await Author.create({
			_id: authorId,
			name: user.name,
		})
	}

	const { id } = await Post.create({
		...post,
		author: authorId,
	})

	return { id }
}

export const getPostById = async (id: string) => {
	const cached = (await PostCache.fetch(id)) as any

	if (cached && cached.title) {
		return cached
	}

	const post = (await Post.findById(id).populate('author'))?.toJSON()

	if (!post) {
		throw new NotFoundError('Post not found')
	}

	await PostCache.save(id.toString(), post)
	return post
}

export const updatePost = async (
	id: string,
	data: UpdatePostInput,
	authorId: string,
) => {
	const post = await Post.findById(id)

	if (!post) {
		throw new NotFoundError('Post not found')
	}

	if (post.author !== authorId) {
		throw new ForbiddenError('You can only update your own posts')
	}

	const updated = await Post.findByIdAndUpdate(id, data, {
		runValidators: true,
	})
	await PostCache.remove(id)
	return updated
}

export const deletePost = async (id: string, authorId: string) => {
	const post = await Post.findById(id)

	if (!post) {
		throw new NotFoundError('Post not found')
	}

	if (post.author !== authorId) {
		throw new ForbiddenError('You can only delete your own posts')
	}

	await post.deleteOne()
	await PostCache.remove(id)
}

export const getAllPosts = async (filters: GetPostsQuery) => {
	const { authorId, search, dateFrom, dateTo, page, limit } = filters

	const query: Record<string, any> = {}

	if (authorId) {
		query.author = authorId
	}

	if (search) {
		query.title = { $regex: search, $options: 'i' }
	}

	if (dateFrom || dateTo) {
		query.createdAt = {}
		if (dateFrom) query.createdAt.$gte = new Date(dateFrom)
		if (dateTo) query.createdAt.$lte = new Date(dateTo)
	}

	const skip = (page - 1) * limit

	const [posts, total] = await Promise.all([
		Post.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
		Post.countDocuments(query),
	])

	return {
		posts,
		total,
		page,
		limit,
		totalPages: Math.ceil(total / limit),
	}
}
