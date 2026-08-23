'use client'
import { register } from '@/api'
import { useAuth } from '@/components/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/toast'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { SubmitEvent } from 'react'
import { useRegisterForm } from '../../hooks/register'

export default function RegisterPage() {
	const router = useRouter()
	const { fetchUser } = useAuth()
	const { user, setUser, isLoading, setIsLoading } = useRegisterForm()

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault()
		setIsLoading(true)

		try {
			await register(user.name, user.email, user.password)
			fetchUser()
			router.push('/dashboard')
		} catch (err) {
			toast.add({
				title: 'Registration Failed :(',
				description: err.response?.data?.message,
				type: 'error',
			})
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className='flex-1 flex flex-col items-center justify-center px-4'>
			<div className='w-full max-w-sm'>
				<div className='mb-15 text-center'>
					<h1 className='text-3xl font-semibold tracking-tight mb-1'>
						Create an account
					</h1>
					<p className='text-sm text-muted-foreground'>Start writing today</p>
				</div>

				<form onSubmit={handleSubmit} className='space-y-4'>
					<div className='space-y-1.5'>
						<Label htmlFor='name'>Name</Label>
						<Input
							id='name'
							type='text'
							placeholder='Your name'
							value={user.name}
							onChange={(e) => setUser({ ...user, name: e.target.value })}
							required
							className='h-9'
						/>
					</div>

					<div className='space-y-1.5'>
						<Label htmlFor='email'>Email</Label>
						<Input
							id='email'
							type='email'
							placeholder='you@example.com'
							value={user.email}
							onChange={(e) => setUser({ ...user, email: e.target.value })}
							required
							className='h-9'
						/>
					</div>

					<div className='space-y-1.5'>
						<Label htmlFor='password'>Password</Label>
						<Input
							id='password'
							type='password'
							placeholder='Enter your password'
							value={user.password}
							onChange={(e) => setUser({ ...user, password: e.target.value })}
							required
							className='h-9'
						/>
					</div>

					<Button type='submit' className='w-full' disabled={isLoading}>
						{isLoading ? 'Creating account…' : 'Create account'}
					</Button>
				</form>

				<p className='mt-6 text-center text-sm text-muted-foreground'>
					Already have an account?{' '}
					<Link
						href='/login'
						className='text-foreground underline underline-offset-4 hover:opacity-75 transition-opacity'
					>
						Sign in
					</Link>
				</p>
			</div>
		</div>
	)
}
