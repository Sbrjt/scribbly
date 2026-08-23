import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function proxy(req: NextRequest) {
	const token = req.cookies.get('refreshToken')?.value

	console.log(token)

	if (!token) {
		return NextResponse.redirect(new URL('/', req.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/dashboard', '/blog/new', '/blog/:path*/edit'],
}
