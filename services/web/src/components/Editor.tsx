'use client'
import MilkDown from '@/components/MilkDown'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { LuFileText } from 'react-icons/lu'

export function Editor({ handlePublish, post, setPost, isLoading }: Props) {
	return (
		<div className='h-screen flex flex-col'>
			<Topbar
				handlePublish={handlePublish}
				post={post}
				setPost={setPost}
				isLoading={isLoading}
			/>

			<div className='flex-1'>
				<MilkDown
					readonly={false}
					value={post.content}
					onChange={(content) => setPost({ ...post, content })}
				/>
			</div>
		</div>
	)
}

function Topbar({
	handlePublish,
	post,
	setPost,
	isLoading,
}: Pick<Props, 'handlePublish' | 'post' | 'setPost' | 'isLoading'>) {
	const [isEditingTitle, setIsEditingTitle] = useState(false)
	const router = useRouter()

	function handleDiscard() {
		router.back()
	}

	return (
		<div className='flex items-center justify-between border bg-background px-5 py-3 shadow-sm'>
			<h1 className='flex items-center gap-4  text-2xl'>
				<LuFileText className='size-6' />
				<div className='min-w-sm'>
					{isEditingTitle ?
						<input
							type='text'
							value={post.title}
							onChange={(e) => setPost({ ...post, title: e.target.value })}
							onBlur={() => setIsEditingTitle(false)}
							className='w-full border-0 border-b border-input bg-transparent px-2 py-1 outline-none focus:border-primary'
							disabled={isLoading}
							autoFocus
						/>
					:	<p
							onClick={() => setIsEditingTitle(true)}
							className='w-full cursor-pointer border-b border-transparent px-2 py-1 hover:border-input'
						>
							{post.title || '\u00A0'}
						</p>
					}
				</div>
			</h1>
			<div className='flex items-center gap-2'>
				<Button variant='outline' onClick={handleDiscard} disabled={isLoading}>
					Discard
				</Button>
				<Button
					onClick={handlePublish}
					disabled={isLoading || !post.title.trim()}
				>
					{isLoading ? 'Publishing...' : 'Publish'}
				</Button>
			</div>
		</div>
	)
}

type Props = {
	handlePublish: () => void
	post: { title: string; content: string }
	setPost: (post: { title: string; content: string }) => void
	isLoading: boolean
}
