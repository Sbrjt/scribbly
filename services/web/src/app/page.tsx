'use client'
import Terminal from '@/components/Terminal'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { LuSparkles } from 'react-icons/lu'

export default function page() {
	return (
		<div className='flex flex-col flex-1 md:flex-row justify-evenly items-center sm:text-left w-full sm:my-auto gap-8 sm:gap-0 px-5 sm:pb-5'>
			<div className='lg:p-12 flex flex-col justify-center items-center sm:items-start gap-5'>
				<Badge variant='outline' className='gap-1.5 px-3 py-1 text-xs w-fit'>
					<LuSparkles className='size-3' />A place for ideas
				</Badge>
				<div>
					<h1 className='text-4xl lg:text-6xl font-light tracking-tight leading-tight'>
						Scribbly
					</h1>
					<p className='text-lg text-muted-foreground leading-relaxed tracking-widest max-w-sm'>
						A minimalist blogging platform
					</p>
				</div>
				<div className='flex gap-4 text-xs uppercase tracking-widest pt-5'>
					<Link
						href='/blog'
						className='px-5 py-2.5 bg-foreground text-background hover:opacity-80 transition-opacity'
					>
						Explore
					</Link>
					<Link
						href='/register'
						className='px-5 py-2.5 border border-border hover:bg-muted/40 transition-colors text-muted-foreground hover:text-foreground'
					>
						Sign in
					</Link>
				</div>
			</div>
			<Terminal />
		</div>
	)
}
