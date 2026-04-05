import type { Metadata } from 'next'

import Auth from '@/components/screens/public/auth/forms/Auth'
import { NO_INDEX_PAGE, SITE_NAME } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: `Авторизация | ${SITE_NAME}`,
	...NO_INDEX_PAGE,
}

export default function AuthPage() {
	return <Auth />
}
