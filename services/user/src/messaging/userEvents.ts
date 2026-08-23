import { createUserFromRegisteredEvent } from '@/services/userRegistered'
import { rabbit } from '../utils/rabbit'

rabbit.createConsumer(
	{
		queue: 'user-events',
		queueOptions: { durable: true },
	},
	async (req) => {
		console.log(req)
		await createUserFromRegisteredEvent(req.body)
	},
)
