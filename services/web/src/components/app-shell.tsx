'use client'

import { cn } from '@/lib/utils'
import * as React from 'react'

interface AppShellProps extends React.HTMLAttributes<HTMLElement> {
	children: React.ReactNode
}

export function AppShell({ children, className, ...props }: AppShellProps) {
	return (
		<section
			className={cn('mx-auto flex-1 w-full flex flex-col', className)}
			{...props}
		>
			{children}
		</section>
	)
}
