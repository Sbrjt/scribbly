import { api } from '@/lib/axios'
import type { Emoji, EmojiCounts } from '@/lib/types'

export async function getReactions(
	postId: string,
): Promise<{ reactions: EmojiCounts; userReactions: Emoji[] }> {
	return api.get(`/post/posts/${postId}/reactions`)
}

export async function addReaction(postId: string, emoji: string) {
	return api.post(`/post/posts/${postId}/reactions`, { emoji })
}

export async function removeReaction(postId: string, emoji: string) {
	return api.delete(`/post/posts/${postId}/reactions`, { data: { emoji } })
}
