import { api } from '@/lib/axios'
import type { Post } from '@/lib/types'

export async function getPost(id: string): Promise<Post> {
	return api.get(`/post/post/${id}`)
}

export async function getMyPosts(): Promise<Post[]> {
	console.log('/post/post/me')
	return api.get('/post/post/me')
}

export async function postPost(postData: {
	title: string
	content: string
}): Promise<Post> {
	return api.post('/post/post', postData)
}

export async function patchPost(
	id: string,
	postData: Partial<{
		title: string
		content: string
	}>,
) {
	return api.patch(`/post/post/${id}`, postData)
}

export async function deletePost(id: string) {
	return api.delete(`/post/post/${id}`)
}

export async function getRecentPosts(limit: number = 5) {
	return api.get('/post/post', {
		params: {
			limit,
			page: 1,
		},
	})
}
