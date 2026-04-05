import type { Metadata } from 'next'

import NotFoundPage from '@/app/not-found'
import ManageServiceEdit from '@/components/screens/authorized/admin/edits/service/ManageServiceEdit'
import { NO_INDEX_PAGE, SITE_NAME } from '@/constants/seo.constants'
import type { IPageIdParam } from '@/shared/interfaces/param/param.interface'

export const metadata: Metadata = {
	title: `Услуга | ${SITE_NAME}`,
	...NO_INDEX_PAGE,
}

export default function ManageServiceEditPage({ params }: IPageIdParam) {
	return params.id ? (
		<ManageServiceEdit queryId={params.id} />
	) : (
		<NotFoundPage />
	)
}
