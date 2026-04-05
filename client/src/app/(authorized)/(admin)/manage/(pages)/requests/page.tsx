import type { Metadata } from 'next'

import ManageRequests from '@/components/screens/authorized/admin/pages/requests/ManageRequests'
import { NO_INDEX_PAGE, SITE_NAME } from '@/constants/seo.constants'
import type { IPageSearchParam } from '@/shared/interfaces/param/param.interface'

export const metadata: Metadata = {
	title: `Обращения | ${SITE_NAME}`,
	...NO_INDEX_PAGE,
}

export default function ManageRequestsPage({ searchParams }: IPageSearchParam) {
	return <ManageRequests searchParams={searchParams} />
}
