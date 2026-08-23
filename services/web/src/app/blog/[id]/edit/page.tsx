'use client'
import { Editor } from '@/components/Editor'
import { usePost, useUpdatePost } from '@/hooks/post'
import type { Post } from '@/lib/types'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function page() {
	const { id } = useParams<{ id: string }>()
	const router = useRouter()

	const [post, setPost] = useState<Pick<Post, 'content' | 'title'>>()

	const { post: loadedPost, isLoading: isLoadingPost } = usePost(id)
	const { updatePost, isLoading: isUpdating } = useUpdatePost()

	useEffect(() => {
		if (loadedPost) {
			setPost({ title: loadedPost.title, content: loadedPost.content })
		}
	}, [loadedPost])

	async function handlePublish() {
		const updated = await updatePost(id, {
			content: post?.content,
			title: post?.title,
		})

		if (updated) {
			router.push(`/blog/${loadedPost?.id}`)
		}
	}

	if (isLoadingPost || !post) {
		return (
			<div className='h-screen flex items-center justify-center'>
				<p className='text-muted-foreground'>Loading post...</p>
			</div>
		)
	}

	return (
		<Editor
			handlePublish={handlePublish}
			post={post}
			setPost={setPost}
			isLoading={isUpdating}
		/>
	)
}
