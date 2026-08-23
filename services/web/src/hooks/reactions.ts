import { addReaction, getReactions, removeReaction } from '@/api'
import { useAuth } from '@/components/AuthContext'
import { toast } from '@/components/ui/toast'
import { type Emoji, type EmojiCounts } from '@/lib/types'
import { useEffect, useState } from 'react'

export function useReactions(postId: string) {
	const { user } = useAuth()
	const [reactions, setReactions] = useState<EmojiCounts | null>(null)
	const [userReactions, setUserReactions] = useState<Emoji[] | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [isAddingReaction, setIsAddingReaction] = useState(false)

	const loadReactions = async () => {
		try {
			const data = await getReactions(postId)
			setReactions(data.reactions)
			setUserReactions(data.userReactions)
		} catch (err) {
			toast.add({
				title: 'Error fetching reactions',
				description: err?.detail,
				type: 'error',
			})
		}
		setIsLoading(false)
	}

	const handleClick = async (emoji: Emoji) => {
		if (!user) {
			toast.add({
				title: 'Please sign up to react',
				type: 'error',
			})

			return
		}

		setIsAddingReaction(true)

		try {
			if (userReactions?.includes(emoji)) {
				await removeReaction(postId, emoji)
			} else {
				await addReaction(postId, emoji)
			}
			await loadReactions()
		} catch (err) {
			toast.add({
				title: 'Error adding reaction',
				description: err?.detail,
				type: 'error',
			})
		}
		setIsAddingReaction(false)
	}

	useEffect(() => {
		loadReactions()
	}, [postId, user])

	return {
		reactions,
		userReactions,
		handleClick,
		isLoading,
		isAddingReaction,
	}
}
