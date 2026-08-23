'use client'
import { useAuth } from '@/components/AuthContext'
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LuChrome, LuFileText, LuLogOut, LuPlus } from 'react-icons/lu'

export default function DashboardSidebar() {
	const router = useRouter()
	const pathname = usePathname()
	const { user, logoutUser } = useAuth()

	const handleLogout = () => {
		logoutUser()
		router.push('/')
	}

	const menuItems = [
		{
			icon: LuChrome,
			label: 'Posts',
			href: '/dashboard',
			isActive: pathname === '/dashboard',
		},
		{
			icon: LuFileText,
			label: 'Stats',
			href: '/dashboard/stats',
			isActive: pathname.startsWith('/dashboard/stats'),
		},
	]

	return (
		<Sidebar className='border-r bg-slate-950 dark:bg-slate-950'>
			<SidebarContent className='flex flex-col px-5'>
				{/* Greeting Section */}
				<div className='px-6 py-6 space-y-1'>
					<p className='text-xs text-gray-400 uppercase tracking-widest font-medium'>
						Hi,
					</p>
					<p className='text-2xl font-light text-white uppercase tracking-tight'>
						{user?.name}
					</p>
				</div>

				{/* New Post Button */}
				<div className=' py-4'>
					<Link
						href='/blog/new'
						className='w-full bg-linear-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-full flex items-center justify-center gap-2 transition-all uppercase tracking-wider text-sm'
					>
						<LuPlus className='size-5' />
						New Post
					</Link>
				</div>

				{/* Menu Section */}
				<SidebarGroup className='gap-3 p-0'>
					<SidebarGroupLabel className='text-xs font-medium text-gray-400 px-6 uppercase tracking-widest'>
						Menu
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu className='gap-4'>
							{menuItems.map((item) => {
								const Icon = item.icon
								return (
									<SidebarMenuItem key={item.href}>
										<SidebarMenuButton
											isActive={item.isActive}
											className='text-gray-300 hover:bg-slate-800 hover:text-white px-6 py-5 rounded-pill transition-all duration-200 data-[active=true]:bg-slate-800 data-[active=true]:text-white'
										>
											<Link
												href={item.href}
												className='flex items-center gap-3 text-sm uppercase tracking-wide font-medium'
											>
												<Icon className='size-5' />
												<span>{item.label}</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								)
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<div className='px-4 py-4'>
				<button
					onClick={handleLogout}
					className='w-full flex items-center gap-6 px-6 py-2.5 rounded-lg text-xs text-gray-300 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 uppercase tracking-widest font-medium'
				>
					<LuLogOut className='size-4' />
					<span>Sign Out</span>
				</button>
			</div>
		</Sidebar>
	)
}
