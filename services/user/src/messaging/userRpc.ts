import { getUserById } from '@/services/user'
import { rabbit } from '../utils/rabbit'

rabbit.createConsumer(
	{
		queue: 'user.get',
		queueOptions: { durable: true },
	},
	async (req, res) => {
		const user = await getUserById(req.body.userId)
		await res(user)
	},
)
