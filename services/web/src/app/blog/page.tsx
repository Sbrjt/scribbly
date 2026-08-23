'use client'
import { getRecentPosts } from '@/api/post'
import { Button } from '@/components/ui/button'
import type { Post } from '@/lib/types'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function PostsPage() {
	const [posts, setPosts] = useState<Post[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const loadPosts = async () => {
			try {
				setIsLoading(true)
				const response = await getRecentPosts(5)
				setPosts(response.posts || [])
				setError(null)
			} catch (err: any) {
				setError(err?.response?.data?.detail || 'Failed to load posts')
				setPosts([])
			} finally {
				setIsLoading(false)
			}
		}

		loadPosts()
	}, [])

	if (isLoading) {
		return (
			<div className='flex items-center justify-center min-h-screen'>
				<div className='text-lg font-semibold'>Loading posts...</div>
			</div>
		)
	}

	if (error) {
		return (
			<div className='flex items-center justify-center min-h-screen'>
				<div className='text-lg font-semibold text-red-500'>Error: {error}</div>
			</div>
		)
	}

	return (
		<div className='container mx-auto py-8'>
			<div className='flex justify-between items-center mb-8'>
				<h1 className='text-4xl font-bold'>Recent Posts</h1>
			</div>

			{posts.length === 0 ?
				<div className='text-center py-12'>
					<p className='text-muted-foreground mb-4'>No posts found</p>
					<Link href='/blog/new'>
						<Button>Create Your First Post</Button>
					</Link>
				</div>
			:	<div className='grid gap-6 md:grid-cols-1 lg:grid-cols-2'>
					{posts.map((post) => (
						<article
							key={post.id}
							className='border rounded-lg p-6 hover:shadow-lg transition-shadow'
						>
							<div className='flex justify-between items-start mb-4'>
								<div className='flex-1'>
									<h2 className='text-2xl font-bold mb-2 hover:text-blue-600'>
										<Link href={`/blog/${post.id}`}>{post.title}</Link>
									</h2>
									{post.author && (
										<p className='text-sm text-muted-foreground'>
											By {post.author.name}
										</p>
									)}
								</div>
							</div>

							<p className='text-muted-foreground line-clamp-3 mb-4'>
								{post.content}
							</p>

							<div className='flex justify-between items-center'>
								<time className='text-sm text-muted-foreground'>
									{formatDate(post.createdAt)}
								</time>
								<Link href={`/blog/${post.id}`}>
									<Button variant='outline' size='sm'>
										Read More
									</Button>
								</Link>
							</div>
						</article>
					))}
				</div>
			}
		</div>
	)
}
