import { NextRequest, NextResponse } from 'next/server'
import { UserRole } from './__generated__/output'
import { EnumCookies } from './constants/cookies.constants'
import { ADMIN_PAGES, PUBLIC_PAGES } from './constants/url.constants'
import { getSession } from './libs/iron-session.lib'

export async function middleware(request: NextRequest, response: NextResponse) {
	const refreshToken = request.cookies.get(EnumCookies.REFRESH_TOKEN)?.value
	const isAdminPage = request.url.includes(ADMIN_PAGES.ROOT)
	const isAuthPage = request.url.includes('/auth')
	const { user } = await getSession(request, response)

	if (!refreshToken || !user) {
		if (isAuthPage) return
		return redirectToHome(request)
	}

	if (isAuthPage) {
		return NextResponse.rewrite(new URL('/404', request.url))
	}

	try {
		if (user?.roles.includes(UserRole.Admin)) return NextResponse.next()

		if (isAdminPage) return NextResponse.rewrite(new URL('/404', request.url))

		return NextResponse.next()
	} catch (error) {
		return redirectToHome(request)
	}
}

export const config = {
	matcher: [
		'/manage/:path*',
		'/profile',
		'/chat/:path*',
		'/auth((?!/redirect).)*',
		'/favorites',
		'/orders',
	],
}

const redirectToHome = (request: NextRequest) => {
	return NextResponse.redirect(new URL(PUBLIC_PAGES.HOME, request.url))
}
