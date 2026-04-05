import type { Metadata } from 'next'

import NotFoundPage from '@/app/not-found'
import ManageExampleEdit from '@/components/screens/authorized/admin/edits/example/ManageExampleEdit'
import { NO_INDEX_PAGE, SITE_NAME } from '@/constants/seo.constants'
import type { IPageIdParam } from '@/shared/interfaces/param/param.interface'

export const metadata: Metadata = {
	title: `Пример | ${SITE_NAME}`,
	...NO_INDEX_PAGE,
}

export default function ManageExampleEditPage({ params }: IPageIdParam) {
	return params.id ? (
		<ManageExampleEdit queryId={params.id} />
	) : (
		<NotFoundPage />
	)
}
