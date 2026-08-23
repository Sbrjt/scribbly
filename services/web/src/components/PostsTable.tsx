'use client'

import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import type { Post } from '@/lib/types'
import { formatDate } from '@/lib/utils'
import type { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import { LuEye as Eye, LuPencil as Pencil } from 'react-icons/lu'
import DeletePost from './DeletePost'

type Props = {
	posts: Post[]
	onDelete: (id: string) => void
}

const columns = (onDelete: (id: string) => void): ColumnDef<Post>[] => [
	{
		accessorKey: 'title',
		size: 600,
		cell: ({ row }) => (
			<span className='font-medium'>{row.original.title}</span>
		),
	},
	{
		id: 'status',
		cell: () => (
			<div className='inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm font-medium dark:bg-green-950 dark:text-green-400'>
				Published
			</div>
		),
	},
	{
		accessorKey: 'createdAt',
		cell: ({ row }) => {
			const { createdAt } = row.original
			return createdAt ?
					<span className='text-sm text-muted-foreground'>
						{formatDate(createdAt)}
					</span>
				:	<span className='text-sm text-muted-foreground'>N/A</span>
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => (
			<div className='flex items-center gap-2'>
				<Link href={`/blog/${row.original.id}`}>
					<Button variant='ghost' size='sm'>
						<Eye className='size-4' />
					</Button>
				</Link>
				<Link href={`/blog/${row.original.id}/edit`}>
					<Button variant='ghost' size='sm'>
						<Pencil className='size-4' />
					</Button>
				</Link>
				<DeletePost
					postTitle={row.original.title}
					onDelete={() => onDelete(row.original.id)}
				/>
			</div>
		),
	},
]

export default function PostsTable({ posts, onDelete }: Props) {
	return (
		<DataTable columns={columns(onDelete)} data={posts} headerCase='upper' />
	)
}
