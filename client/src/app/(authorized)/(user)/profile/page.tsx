import type { Metadata } from 'next'

import Profile from '@/components/screens/authorized/user/profile/Profile'
import { NO_INDEX_PAGE, SITE_NAME } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: `Профиль | ${SITE_NAME}`,
	...NO_INDEX_PAGE,
}

export default function ProfilePage() {
	return <Profile />
}
