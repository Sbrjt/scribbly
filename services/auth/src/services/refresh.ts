import { RefreshToken } from '@/models'
import { config } from '@/utils/config'
import { generateRefreshToken, hashToken } from '@/utils/crypto'
import { UnauthorizedError } from '@app/common'

const { REFRESH_TOKEN_TTL } = config

export async function createRefreshToken(userId: string) {
	const token = generateRefreshToken()
	const hash = hashToken(token)

	await RefreshToken.save(hash, { userId })
	await RefreshToken.expire(hash, REFRESH_TOKEN_TTL / 1000)
	// redis expects ttl in seconds lol

	return token
}

export async function rotateRefreshToken(oldToken?: string) {
	if (!oldToken) {
		throw new UnauthorizedError('Refresh token not found')
	}

	const hash = hashToken(oldToken)
	const entity = await RefreshToken.fetch(hash)

	if (!entity.userId) {
		throw new UnauthorizedError('Invalid refresh token')
	}

	await RefreshToken.remove(hash)
	const newToken = await createRefreshToken(entity.userId)
	return { refreshToken: newToken, userId: entity.userId }

	// this should be an atomic operation?
}
