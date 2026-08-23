'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useLoginForm } from '../../hooks/auth'

export default function LoginPage() {
	const router = useRouter()
	const { user, updateEmail, updatePassword, isLoading, handleSubmit } =
		useLoginForm(router)

	return (
		<div className='flex-1 flex flex-col items-center justify-center px-4'>
			<div className='w-full max-w-sm'>
				<div className='mb-15 text-center'>
					<h1 className='text-3xl font-semibold tracking-tight mb-1'>
						Welcome back
					</h1>
					<p className='text-sm text-muted-foreground'>
						Sign in to your account
					</p>
				</div>

				<form onSubmit={handleSubmit} className='space-y-4'>
					<div className='space-y-1.5'>
						<Label htmlFor='email'>Email</Label>
						<Input
							id='email'
							type='email'
							placeholder='you@example.com'
							value={user.email}
							onChange={(e) => updateEmail(e.target.value)}
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
							onChange={(e) => updatePassword(e.target.value)}
							required
							className='h-9'
						/>
					</div>

					<Button type='submit' className='w-full' disabled={isLoading}>
						{isLoading ? 'Signing in…' : 'Sign in'}
					</Button>
				</form>

				<p className='mt-6 text-center text-sm text-muted-foreground'>
					Don't have an account?{' '}
					<Link
						href='/register'
						className='text-foreground underline underline-offset-4 hover:opacity-75 transition-opacity'
					>
						Register
					</Link>
				</p>
			</div>
		</div>
	)
}
