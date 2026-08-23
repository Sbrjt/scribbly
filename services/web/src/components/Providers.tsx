'use client'
import { AuthProvider } from '@/components/AuthContext'
import { Toaster } from '@/components/ui/toast'
import { ProgressProvider } from '@bprogress/next/app'
import { ThemeProvider } from 'next-themes'
import { usePathname } from 'next/navigation'
import Navbar from './Navbar'

export default function Providers({ children }: { children: React.ReactNode }) {
	const pathname = usePathname() ?? ''
	const notNav =
		pathname.startsWith('/blog/new') || /^\/blog\/.+\/edit$/.test(pathname)

	return (
		<ThemeProvider attribute='class' enableSystem disableTransitionOnChange>
			<ProgressProvider
				height='3px'
				color='linear-gradient(to left, hsl(var(--primary)) 0%, hsl(var(--accent)) 95%)'
				options={{ showSpinner: false }}
				shallowRouting
			>
				<AuthProvider>
					<Toaster>
						{!notNav && <Navbar />}
						{children}
					</Toaster>
				</AuthProvider>
			</ProgressProvider>
		</ThemeProvider>
	)
}
