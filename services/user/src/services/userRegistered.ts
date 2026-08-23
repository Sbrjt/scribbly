import { User } from '@/models'

export type UserRegisteredEvent = {
	id: number | string
	email: string
	name: string
}

export async function createUserFromRegisteredEvent(
	event: UserRegisteredEvent,
) {
	const existingUser = await User.findOne({
		where: { id: String(event.id) },
	})

	if (existingUser) {
		console.log('User already exists:', existingUser)
		return existingUser
	}

	const user = User.create({
		id: String(event.id),
		name: event.name,
		email: event.email,
	})

	const savedUser = await User.save(user)
	console.log('User created:', savedUser)

	return savedUser
}
