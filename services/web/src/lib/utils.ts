import { clsx, type ClassValue } from 'clsx'
import { formatDistanceToNowStrict } from 'date-fns'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function formatDate(
	dateString: string,
	format: Intl.DateTimeFormatOptions = {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	},
) {
	return new Date(dateString).toLocaleString(undefined, format)
}

export function formatRelativeTime(dateString: string) {
	return formatDistanceToNowStrict(new Date(dateString), { addSuffix: true })
}

export function readingTime(content: string) {
	const wordsPerMinute = 200
	const wordCount = content.trim().split(/\s+/).length
	const time = Math.ceil(wordCount / wordsPerMinute)
	return time
}
