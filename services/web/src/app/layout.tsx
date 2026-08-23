import Providers from '@/components/Providers'
import { geistMono, inter } from '@/lib/meta'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'
import './globals.css'

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode
}>) {
	return (
		<html
			lang='en'
			className={cn(inter.variable, geistMono.variable)}
			suppressHydrationWarning
		>
			<body className='min-h-screen flex flex-col bg-background text-foreground'>
				<Providers>
					<main className='flex-1 flex flex-col relative'>{children}</main>
				</Providers>
			</body>
		</html>
	)
}

export * from '@/lib/meta'
