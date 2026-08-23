import Post from '@/models/post'
import Reaction from '@/models/reaction'
import type { ReactionCount } from '@/utils/types'
import type { Emoji } from '@app/common'
import { ConflictError, NotFoundError } from '@app/common'

export const addReaction = async (
	postId: string,
	userId: string,
	emoji: Emoji,
) => {
	const post = await Post.findById(postId)
	if (!post) throw new NotFoundError('Post not found')

	const existing = await Reaction.exists({
		postId,
		userId,
		emoji,
	})

	if (existing) {
		throw new ConflictError('Reaction already exists')
	}

	await Reaction.create({
		postId,
		userId,
		emoji,
	})
}

export const removeReaction = async (
	postId: string,
	userId: string,
	emoji: Emoji,
) => {
	const reaction = await Reaction.findOneAndDelete({ postId, userId, emoji })
	if (!reaction) throw new NotFoundError('Reaction not found')
	return reaction
}

export const getReactions = async (postId: string, userId?: string) => {
	const post = await Post.findById(postId)

	if (!post) {
		throw new NotFoundError('Post not found')
	}

	const reactions = await Reaction.aggregate<ReactionCount>([
		{ $match: { postId } },
		{
			$group: {
				_id: '$emoji',
				count: { $sum: 1 },
			},
		},
	])

	const userReactions =
		userId ? await Reaction.find({ postId, userId }, { emoji: 1 }) : null

	return {
		reactions: Object.fromEntries(
			reactions.map(({ _id, count }) => [_id, count]),
		),
		userReactions: userReactions?.map(({ emoji }) => emoji),
	}
}
