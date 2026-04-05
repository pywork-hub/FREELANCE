import type { Metadata } from 'next'

import AuthRedirect from '@/components/screens/public/auth/redirect/AuthRedirect'
import { NO_INDEX_PAGE, SITE_NAME } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: `Перенаправление | ${SITE_NAME}`,
	...NO_INDEX_PAGE,
}

export default function AuthRedirectPage() {
	return <AuthRedirect />
}
