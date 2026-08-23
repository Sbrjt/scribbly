'use client'
import { getMe, logout } from '@/api'
import { clearAccessToken } from '@/lib/axios'
import type { AuthContextValue, User } from '@/lib/types'
import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		fetchUser()
	}, [])

	async function fetchUser() {
		try {
			const u = await getMe()
			setUser(u)
		} catch {
			setUser(null)
		}
		setIsLoading(false)
	}

	async function logoutUser() {
		await logout()
		setUser(null)
		clearAccessToken()
		console.log('logout')
	}

	return (
		<AuthContext.Provider value={{ user, isLoading, fetchUser, logoutUser }}>
			{children}
		</AuthContext.Provider>
	)
}

export function useAuth() {
	const ctx = useContext(AuthContext)
	return ctx!
}
