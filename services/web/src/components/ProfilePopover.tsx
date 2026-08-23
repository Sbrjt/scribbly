'use client'
import { useAuth } from '@/components/AuthContext'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { useRouter } from 'next/navigation'
import { LuLogOut } from 'react-icons/lu'
import Avatar from './Avatar'

export function ProfilePopover() {
	const { user, logoutUser } = useAuth()
	const router = useRouter()

	if (!user) return null

	async function handleLogout() {
		await logoutUser()
		router.push('/')
	}

	return (
		<Popover>
			<PopoverTrigger>
				<div className='h-7'>
					<Avatar user={user} />
				</div>
			</PopoverTrigger>
			<PopoverContent align='end' className='w-auto p-6 flex flex-col gap-4'>
				<div className='flex flex-col gap-y-4 text-sm'>
					Welcome {user.name}!{/* <Logout /> */}
				</div>

				<button
					className='unstyled flex w-full justify-start items-center gap-3'
					onClick={handleLogout}
				>
					<LuLogOut className='size-4' />
					Sign out
				</button>
			</PopoverContent>
		</Popover>
	)
}
