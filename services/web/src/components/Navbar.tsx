'use client'
import { useAuth } from '@/components/AuthContext'
import { ProfilePopover } from '@/components/ProfilePopover'
import { ThemeToggle } from '@/components/theme-toggle'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { FaPenNib } from 'react-icons/fa6'
import { SiGithub } from 'react-icons/si'

export default function Navbar() {
	const { user, isLoading } = useAuth()

	return (
		<nav className='sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur h-15'>
			<div className='flex h-14 items-center justify-between px-10'>
				<Link
					href='/'
					className='flex items-center gap-2 font-semibold tracking-tight text-foreground transition-all hover:opacity-80 duration-200'
				>
					<FaPenNib className='size-5' />
					<span>Scribly</span>
				</Link>

				<div className='flex items-center gap-4'>
					<Link href='/blog' className='nav-link'>
						Blogs
					</Link>
					{user && (
						<Link href='/dashboard' className='nav-link'>
							Dashboard
						</Link>
					)}
					<Link
						href='https://github.com/sbrjt/scribble'
						target='_blank'
						className='text-muted-foreground transition-colors hover:text-foreground duration-200'
					>
						<SiGithub className='size-5' />
					</Link>
					<ThemeToggle />

					{!isLoading && (
						<>
							{user ?
								<ProfilePopover />
							:	<Link
									href='/login'
									className={cn(
										buttonVariants({ variant: 'ghost', size: 'sm' }),
										'transition-all duration-200',
									)}
								>
									Sign in
								</Link>
							}
						</>
					)}
				</div>
			</div>
		</nav>
	)
}
