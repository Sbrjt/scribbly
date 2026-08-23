import { refresh } from '@/api'
import axios from 'axios'

let accessToken: string | null = null

export const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_URL + 'api',
	headers: { 'Content-Type': 'application/json' },
})

// extract content (json, blob, text, etc)
// extract error message
api.interceptors.response.use(
	(res) => res.data,
	(err) => {
		err.detail = err.response?.data?.message
		return Promise.reject(err)
	},
)

// attach access token
api.interceptors.request.use((config) => {
	if (accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}

	return config
})

// retry with refresh token
// Note: Multiple simultaneous 401s can trigger multiple refresh calls!
api.interceptors.response.use(
	(res) => res,

	async (err) => {
		const req = err.config

		if (
			err.response?.status !== 401 ||
			req._retry ||
			req.url === '/auth/refresh'
		) {
			return Promise.reject(err)
		}

		req._retry = true

		try {
			const user = await refresh()
			accessToken = user.accessToken
			return api(req)
		} catch {
			accessToken = null
			return Promise.reject(err)
		}
	},
)

export const clearAccessToken = () => {
	accessToken = null
}

/* 
Not working:

createAuthRefreshInterceptor(
	api,
	async (req: any) => {
		try {
			const data = await refresh()
			accessToken = data.accessToken
			req.response.config.headers.Authorization = `Bearer ${accessToken}`
		} catch (err) {
			accessToken = null
			throw err
		}
	},
	{
		deduplicateRefresh: false, 
	},
)

https://github.com/Flyrell/axios-auth-refresh/issues/307
*/
