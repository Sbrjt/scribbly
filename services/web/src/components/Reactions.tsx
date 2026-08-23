'use client'
import { Button } from '@/components/ui/button'
import { useReactions } from '@/hooks/reactions'
import { emojis } from '@/lib/types'
import { cn } from '@/lib/utils'

export default function ReactionDisplay({ postId }: { postId: string }) {
	const { reactions, userReactions, handleClick, isLoading, isAddingReaction } =
		useReactions(postId)

	if (isLoading) {
		return (
			<div className='text-sm text-muted-foreground'>Loading reactions...</div>
		)
	}

	return (
		<div className='flex flex-wrap gap-2'>
			{emojis.map((emoji) => {
				const count = reactions?.[emoji] || 0
				const hasReacted = userReactions?.includes(emoji)

				return (
					<Button
						key={emoji}
						variant='outline'
						size='sm'
						onClick={() => handleClick(emoji)}
						disabled={isAddingReaction}
						className={cn('gap-1', hasReacted && 'border border-blue-900')}
					>
						<span>{emoji}</span>
						{count > 0 && <span className='text-xs'>{count}</span>}
					</Button>
				)
			})}
		</div>
	)
}
