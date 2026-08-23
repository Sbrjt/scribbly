import { rabbit } from '@/utils/rabbit'
import mongoose from 'mongoose'

export const shutdown = async () => {
	await mongoose.disconnect()
	await rabbit.close()
}
