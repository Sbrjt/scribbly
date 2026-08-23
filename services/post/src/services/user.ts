import type { Author } from '@/models/author'
import { rpcClient } from '@/utils/rabbit'

export const getUser = async (userId: string): Promise<Author> => {
	const res = await rpcClient.send('user.get', { userId })
	return res.body
}
