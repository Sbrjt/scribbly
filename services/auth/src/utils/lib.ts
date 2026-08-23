import { db } from '@/utils/db'
import { rabbit } from '@/utils/rabbit'
import type { CookieSerializeOptions } from '@fastify/cookie'
import { config } from './config'

const { IS_PROD, REFRESH_TOKEN_TTL } = config

export const shutdown = async () => {
	await rabbit.close()
	await db.destroy()
}

export const cookieOptions: CookieSerializeOptions = {
	httpOnly: true,
	secure: IS_PROD,
	sameSite: 'strict',
	path: '/',
	maxAge: REFRESH_TOKEN_TTL,
}
