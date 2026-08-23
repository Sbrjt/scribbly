import { login } from '@/api'
import { useAuth } from '@/components/AuthContext'
import { toast } from '@/components/ui/toast'
import { useRouter } from 'next/navigation'
import type { SubmitEvent } from 'react'
import { useState } from 'react'

export function useLoginForm(router: ReturnType<typeof useRouter>) {
	const [user, setUser] = useState({ email: '', password: '' })
	const [isLoading, setIsLoading] = useState(false)
	const { fetchUser } = useAuth()

	const updateEmail = (email: string) => {
		setUser((prev) => ({ ...prev, email }))
	}

	const updatePassword = (password: string) => {
		setUser((prev) => ({ ...prev, password }))
	}

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault()
		setIsLoading(true)

		try {
			await login(user.email, user.password)
			fetchUser()
			router.push('/dashboard')
		} catch (err) {
			toast.add({
				title: 'Login Failed :(',
				description: err?.detail,
				type: 'error',
			})
		}
		setIsLoading(false)
	}

	return {
		user,
		isLoading,
		updateEmail,
		updatePassword,
		handleSubmit,
	}
}
