import type { Metadata } from 'next'

import NotFoundPage from '@/app/not-found'
import ManageAttributeEdit from '@/components/screens/authorized/admin/edits/attribute/ManageAttributeEdit'
import { NO_INDEX_PAGE, SITE_NAME } from '@/constants/seo.constants'
import type { IPageIdParam } from '@/shared/interfaces/param/param.interface'

export const metadata: Metadata = {
	title: `Характеристика | ${SITE_NAME}`,
	...NO_INDEX_PAGE,
}

export default function ManageCharacteristicEditPage({ params }: IPageIdParam) {
	return params.id ? (
		<ManageAttributeEdit queryId={params.id} />
	) : (
		<NotFoundPage />
	)
}
