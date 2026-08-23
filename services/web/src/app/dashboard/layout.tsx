'use client'
import { SidebarProvider } from '@/components/ui/sidebar'
import type { ReactNode } from 'react'
import DashboardSidebar from '../../components/Sidebar'

export default function DashboardLayout({
	children,
}: Readonly<{
	children: ReactNode
}>) {
	return (
		<SidebarProvider>
			<DashboardSidebar />
			{children}
		</SidebarProvider>
	)
}
