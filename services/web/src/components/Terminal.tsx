export default function Terminal() {
	return (
		<div className='flex flex-col items-center justify-center py-20 h-80 sm:w-100 w-full'>
			<div className='w-full font-mono'>
				<div className='rounded-xl border border-border overflow-hidden shadow-lg dark:shadow-gray-900'>
					{/* topbar */}
					<div className='flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/40'>
						<span className='size-3 rounded-full bg-red-400/70' />
						<span className='size-3 rounded-full bg-yellow-400/70' />
						<span className='size-3 rounded-full bg-green-400/70' />
						<span className='ml-3 text-xs text-muted-foreground tracking-wide'>
							Scribbly
						</span>
					</div>
					{/* content */}
					<div
						contentEditable
						suppressContentEditableWarning
						className='sm:px-15 sm:py-13 px-10 py-8 bg-background space-y-4 text-sm focus:outline-none'
					>
						<p className='text-xs text-muted-foreground uppercase tracking-widest'>
							# readme
						</p>
						<h1 className='text-2xl font-normal leading-snug'>
							A quiet place{' '}
							<span className='text-muted-foreground'>to think out loud.</span>
						</h1>
						<p className='text-muted-foreground leading-relaxed max-w-sm'>
							A little place for your thoughts.
							<br /> Write something worth reading.
							<br />
							Your words. Nothing else.
							<br />
							Write. Share. Be Read.
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

// make it type
