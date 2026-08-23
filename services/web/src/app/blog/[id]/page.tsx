'use client'
import { Header } from '@/components/ArticleHeader'
import MilkDown from '@/components/MilkDown'
import { usePost } from '@/hooks/post'
import { useParams } from 'next/navigation'

export default function page() {
	const { id } = useParams<{ id: string }>()
	const { post, isLoading } = usePost(id)

	if (isLoading) {
		return <div className='mx-auto w-full max-w-3xl px-4 py-12'>Loading...</div>
	}

	if (!post) {
		return (
			<div className='mx-auto w-full max-w-3xl px-4 py-12'>Post not found</div>
		)
	}

	return (
		<article className='flex flex-col flex-1 sm:w-1/2 p-5 mx-auto sm:mt-10'>
			<Header post={post} />

			<div className='flex-1 flex flex-col [&_.milkdown_.editor]:p-0!'>
				<MilkDown readonly={true} value={post.content} />
			</div>
		</article>
	)
}
