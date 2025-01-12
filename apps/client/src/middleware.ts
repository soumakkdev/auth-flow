// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
	const excludedPaths = ['/login', '/signup', '/verify-email']
	const path = request.nextUrl.pathname
	const token = request.cookies.get('access_token')?.value

	if (excludedPaths.some((excludedPath) => path.startsWith(excludedPath))) {
		if (token) {
			return NextResponse.redirect(new URL('/', request.url))
		}
		return NextResponse.next()
	}

	// If no token, redirect to the login page
	if (!token) {
		return NextResponse.redirect(new URL('/login', request.url))
	}

	// Allow the request to proceed
	return NextResponse.next()
}

// Define which routes the middleware should run on
export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
}
