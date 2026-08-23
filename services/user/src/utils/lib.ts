import { db } from '@/utils/db'
import { rabbit } from '@/utils/rabbit'

export const shutdown = async () => {
	await rabbit.close()
	await db.destroy()
}
