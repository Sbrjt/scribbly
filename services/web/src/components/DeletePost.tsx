'use client'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { useState } from 'react'
import { LuTrash2 as Trash2 } from 'react-icons/lu'

export default function DeletePost({ postTitle, onDelete }: Props) {
	const [open, setOpen] = useState(false)

	function handleDelete() {
		onDelete()
		setOpen(false)
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger
				render={
					<Button variant='ghost' size='sm'>
						<Trash2 className='size-4 text-destructive' />
					</Button>
				}
			/>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Delete post?</DialogTitle>
					<DialogDescription>
						<span className='font-medium text-foreground'>{postTitle}</span>{' '}
						will be permanently deleted. This action cannot be undone.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose render={<Button variant='outline' />}>
						Cancel
					</DialogClose>
					<Button variant='destructive' onClick={handleDelete}>
						Delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

type Props = {
	postTitle: string
	onDelete: () => void
}
