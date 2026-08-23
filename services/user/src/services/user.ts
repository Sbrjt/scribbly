import { User } from '@/models'
import type UserT from '@/models/user'
import { NotFoundError } from '@app/common'

// export async function getAllUsers() {
// 	return await User.find()
// }

export async function getUserById(id: string) {
	const user = await User.findOne({ where: { id } })

	if (!user) {
		throw new NotFoundError('User not found')
	}

	return user
}

export async function createUser(name: string, email: string, age?: number) {
	const user = await User.save({
		name,
		email,
	})

	return user
}

export async function updateUser(
	id: string,
	data: Partial<Pick<UserT, 'name' | 'avatar'>>,
) {
	const user = await User.update(id, data)

	console.log(user)
}

export async function deleteUser(id: string) {
	const user = await User.findOne({ where: { id } })
	if (!user) {
		return null
	}

	await User.remove(user)
	return user
}
