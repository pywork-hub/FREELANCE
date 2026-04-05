import type { Metadata } from 'next'

import ManageAnalytics from '@/components/screens/authorized/admin/pages/analytics/ManageAnalytics'
import { NO_INDEX_PAGE, SITE_NAME } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: `Аналитика | ${SITE_NAME}`,
	...NO_INDEX_PAGE,
}

export default function ManageAnalyticsPage() {
	return <ManageAnalytics />
}
