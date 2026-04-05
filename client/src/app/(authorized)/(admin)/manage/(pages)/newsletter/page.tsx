import type { Metadata } from 'next'

import ManageNewsletter from '@/components/screens/authorized/admin/pages/newsletter/ManageNewsletter'
import { NO_INDEX_PAGE, SITE_NAME } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: `E-mail Рассылки | ${SITE_NAME}`,
	...NO_INDEX_PAGE,
}

export default function ManageNewsletterPage() {
	return <ManageNewsletter />
}
