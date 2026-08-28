'use client'
import PostsTable from '@/components/PostsTable'
import { Button } from '@/components/ui/button'
import { useMyPosts } from '@/hooks/post'
import Link from 'next/link'

export default function DashboardPage() {
	const { posts, loading, handleDelete } = useMyPosts()

	return (
		<div className='flex-1 px-4 py-6 sm:px-6 lg:px-20 lg:py-20'>
			<div className='mb-8'>
				<h1 className='text-3xl font-bold tracking-tight'>Published Posts</h1>
				<p className='text-sm text-muted-foreground mt-1'>
					Manage your live content.
				</p>
			</div>

			{loading ?
				<div className='flex items-center justify-center py-12'>
					<p className='text-muted-foreground'>Loading posts...</p>
				</div>
			: posts && posts.length > 0 ?
				<PostsTable posts={posts} onDelete={handleDelete} />
			:	<div className='border rounded-lg border-dashed py-12 flex flex-col items-center justify-center'>
					<p className='text-muted-foreground mb-4'>No posts yet</p>
					<Link href='blog/new'>
						<Button>Create your first post</Button>
					</Link>
				</div>
			}
		</div>
	)
}
