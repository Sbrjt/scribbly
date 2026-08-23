import { User } from '@/models'
import { hashPassword } from '@/utils/crypto'
import { publisher } from '@/utils/rabbit'
import { ConflictError } from '@app/common'

export async function registerUser(
	email: string,
	password: string,
	name: string,
) {
	const existing = await User.findOne({ where: { email } })

	console.log(existing)

	if (existing) {
		throw new ConflictError('Email already exists')
	}

	const hash = await hashPassword(password)
	const user = await User.save({
		email,
		password: hash,
	})

	await publisher.send('user-events', { id: user.id, email, name })
	return user
}
