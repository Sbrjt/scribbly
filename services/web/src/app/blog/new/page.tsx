'use client'
import { Editor } from '@/components/Editor'
import { useCreatePost } from '@/hooks/post'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function page() {
	const router = useRouter()

	const [post, setPost] = useState({ title: 'Untitled', content: '' })
	const { createPost, isLoading } = useCreatePost()

	async function handlePublish() {
		const createdPost = await createPost({
			content: post.content,
			title: post.title,
		})

		if (createdPost) {
			router.push(`/blog/${createdPost.id}`)
		}
	}

	return (
		<Editor
			handlePublish={handlePublish}
			post={post}
			setPost={setPost}
			isLoading={isLoading}
		/>
	)
}
