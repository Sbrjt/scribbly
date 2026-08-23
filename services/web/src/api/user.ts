import { api } from '@/lib/axios'
import type { User } from '@/lib/types'

export async function getMe(): Promise<User> {
	return api.get('/user/me')
}

export async function logout() {
	await api.post('/auth/logout')
}

export async function login(email: string, password: string) {
	await api.post('/auth/login', { email, password })
}

export async function register(name: string, email: string, password: string) {
	await api.post('/auth/register', { name, email, password })
}

// export async function refresh(): Promise<{ accessToken: string }> {
// 	return api.post('/auth/refresh', undefined, {
// 		skipAuthRefresh: true,
// 	} as AxiosAuthRefreshRequestConfig)
// }

export async function refresh(): Promise<{ accessToken: string }> {
	return api.post('/auth/refresh')
}
