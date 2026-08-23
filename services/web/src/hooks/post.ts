import { deletePost, getMyPosts, getPost, patchPost, postPost } from '@/api'
import { toast } from '@/components/ui/toast'
import type { Post } from '@/lib/types'
import { useEffect, useState } from 'react'

export function usePost(id: string) {
	const [post, setPost] = useState<Post | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		async function loadPost() {
			try {
				const data = await getPost(id)
				setPost(data)
			} catch (err) {
				toast.add({
					title: 'Error fetching post',
					description: err?.detail,
					type: 'error',
				})
			}
			setIsLoading(false)
		}

		loadPost()
	}, [id])

	return {
		post,
		setPost,
		isLoading,
	}
}

export function useCreatePost() {
	const [isLoading, setIsLoading] = useState(false)

	const createPost = async (postData: { title: string; content: string }) => {
		setIsLoading(true)

		try {
			const newPost = await postPost(postData)
			toast.add({
				title: 'Post Created',
				type: 'success',
			})
			return newPost
		} catch (err) {
			toast.add({
				title: 'Failed to Create Post',
				description: err.response?.data?.message,
				type: 'error',
			})
		} finally {
			setIsLoading(false)
		}
	}

	return {
		createPost,
		isLoading,
	}
}

export function useUpdatePost() {
	const [isLoading, setIsLoading] = useState(false)

	const updatePost = async (
		id: string,
		postData: Partial<{
			title: string
			content: string
		}>,
	) => {
		setIsLoading(true)
		try {
			const updatedPost = await patchPost(id, postData)
			toast.add({
				title: 'Post Updated',
				type: 'success',
			})
			return updatedPost
		} catch (err) {
			toast.add({
				title: 'Failed to Update Post',
				description: err.response?.data?.message,
				type: 'error',
			})
		} finally {
			setIsLoading(false)
		}
	}

	return {
		updatePost,
		isLoading,
	}
}

export function useMyPosts() {
	const [posts, setPosts] = useState<Post[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		async function loadPosts() {
			try {
				setLoading(true)
				const data = await getMyPosts()
				setPosts(data)
			} catch (err) {
				setPosts([])
				toast.add({
					title: 'Failed to Load Posts',
					description: err?.detail,
					type: 'error',
				})
			} finally {
				setLoading(false)
			}
		}

		loadPosts()
	}, [])

	async function handleDelete(id: string) {
		try {
			await deletePost(id)
			setPosts((prev) => prev.filter((p) => p.id !== id))
			toast.add({
				title: 'Post Deleted',
				type: 'success',
			})
		} catch (err) {
			toast.add({
				title: 'Delete Failed',
				description: err?.detail,
				type: 'error',
			})
		}
	}

	return { posts, loading, handleDelete }
}
