import { useState } from 'react'

export function useRegisterForm() {
	const [user, setUser] = useState({ name: '', email: '', password: '' })
	const [isLoading, setIsLoading] = useState(false)

	const updateName = (name: string) => {
		setUser((prev) => ({ ...prev, name }))
	}

	const updateEmail = (email: string) => {
		setUser((prev) => ({ ...prev, email }))
	}

	const updatePassword = (password: string) => {
		setUser((prev) => ({ ...prev, password }))
	}

	const updateUser = (name: string, email: string, password: string) => {
		setUser({ name, email, password })
	}

	const resetForm = () => {
		setUser({ name: '', email: '', password: '' })
	}

	return {
		user,
		setUser,
		isLoading,
		setIsLoading,
		updateName,
		updateEmail,
		updatePassword,
		updateUser,
		resetForm,
	}
}
