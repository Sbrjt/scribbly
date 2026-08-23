import type { User } from '@/lib/types'

function Avatar({ user }: { user: User }) {
	return (
		<img
			src={
				user.avatar ??
				`https://api.dicebear.com/10.x/thumbs/svg?seed=${encodeURIComponent(user.id)}`
			}
			className='rounded-full h-full w-fit'
		/>
	)
}
export default Avatar
