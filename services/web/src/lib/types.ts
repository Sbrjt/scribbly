import type { AxiosError } from 'axios'

export type FetchOptions = {
	body?: Object
	method?: string
	headers?: Record<string, string>
	[key: string]: any
}

export type User = {
	id: string
	name: string
	email: string
	avatar?: string
}

export type Post = {
	id: string
	title: string
	content: string
	createdAt: string
	updatedAt: string
	author: User
}

export const emojis = ['❤️', '😂', '👏', '😵'] as const
export type Emoji = (typeof emojis)[number]
export type EmojiCounts = Record<Emoji, number>

export type AuthContextValue = {
	user: User | null
	isLoading: boolean
	fetchUser: () => Promise<void>
	logoutUser: () => Promise<void>
}

export type PageProps<T extends Record<string, string>> = {
	params: Promise<T>
}

export type LayoutProps<T extends Record<string, string>> = {
	params: Promise<T>
	children: React.ReactNode
}

export type ApiError = AxiosError<{ detail: string }>
