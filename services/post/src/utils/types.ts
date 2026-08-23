import type { Emoji } from '@app/common'
import '@fastify/jwt'

export type ReactionCount = {
	_id: Emoji
	count: number
}
