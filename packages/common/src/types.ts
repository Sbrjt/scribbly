import '@fastify/jwt'
import { Types } from 'mongoose'
import type { emojis } from './lib'

export type Json = Record<string, any>

type JwtData = {
	sub: string
}

declare module '@fastify/jwt' {
	interface FastifyJWT {
		payload: JwtData
		user: JwtData
	}
}

export type Emoji = (typeof emojis)[number]
export type ObjectId = Types.ObjectId
