import argon2 from 'argon2'
import crypto from 'node:crypto'

export function generateRefreshToken() {
	return crypto.randomBytes(32).toString('base64')
}

export function hashToken(token: string) {
	return crypto.createHash('sha256').update(token).digest('base64')
}

export async function hashPassword(password: string) {
	return await argon2.hash(password)
}

export async function checkPassword(password: string, hash: string) {
	try {
		return await argon2.verify(hash, password)
	} catch {
		return false
	}
}

/* 
Refresh tokens are already randomly generated, so SHA-256 is used.
We only need a deterministic one-way hash to safely store the token in the DB.

Passwords are user-chosen and therefore potentially weak or guessable.
Argon2 is intentionally slow and salted to make password cracking harder.
*/
