import ReactionDisplay from '@/components/Reactions'
import { toast } from '@/components/ui/toast'
import type { Post } from '@/lib/types'
import { formatRelativeTime, readingTime } from '@/lib/utils'
import Link from 'next/link'
import { LuLink, LuPen } from 'react-icons/lu'
import { useAuth } from './AuthContext'
import Avatar from './Avatar'
import { SpeechButton } from './SpeechButton'

export function Header({ post }: { post: Post }) {
	const { user } = useAuth()

	return (
		<header className='border-b pb-5'>
			<h1 className='text-4xl font-bold mb-4'>{post.title}</h1>

			<div className='grid grid-cols-[auto_1fr] gap-4 mb-6'>
				<Avatar user={post.author} />
				<div className='flex flex-col gap-1'>
					<div className='font-medium text-foreground'>{post.author.name}</div>
					<div className='flex items-center gap-2 text-sm text-muted-foreground'>
						<span>{formatRelativeTime(post.createdAt)}</span>
						<span>•</span>
						<span>{readingTime(post.content)} min read</span>
					</div>
				</div>
			</div>

			<div className='flex justify-between items-center'>
				<ReactionDisplay postId={post.id} />
				<div className='flex items-center gap-4'>
					{/* <buton className='flex items-center gap-1 text-sm text-muted-foreground'>
						<MessageCircle size={18} />
						<span>42</span>
					</buton> */}
					{post.author.id === user?.id && (
						<Link href={`/blog/${post.id}/edit`} className='icon-btn'>
							<LuPen size={18} />
						</Link>
					)}
					<SpeechButton content={post.content} />
					<button
						onClick={() => {
							navigator.clipboard.writeText(window.location.href)
							toast.add({
								title: 'Link copied to clipboard',
								type: 'success',
							})
						}}
						className='icon-btn'
					>
						<LuLink size={18} />
					</button>
				</div>
			</div>
		</header>
	)
}
