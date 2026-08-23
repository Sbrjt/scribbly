import type { Metadata, Viewport } from 'next'
import { Geist_Mono, Inter } from 'next/font/google'

export const inter = Inter({ variable: '--font-sans', subsets: ['latin'] })
export const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Blog',
	description: 'A minimalistic blogging platform',
}

export const viewport: Viewport = {
	colorScheme: 'light dark',
}
