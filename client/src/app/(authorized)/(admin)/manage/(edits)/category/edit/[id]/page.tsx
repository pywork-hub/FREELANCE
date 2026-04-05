import NotFoundPage from '@/app/not-found'
import ManageCategoryEdit from '@/components/screens/authorized/admin/edits/category/ManageCategoryEdit'
import { NO_INDEX_PAGE, SITE_NAME } from '@/constants/seo.constants'
import type { IPageIdParam } from '@/shared/interfaces/param/param.interface'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: `Категория | ${SITE_NAME}`,
	...NO_INDEX_PAGE,
}

export default function ManageCategoryEditPage({ params }: IPageIdParam) {
	return params.id ? (
		<ManageCategoryEdit queryId={params.id} />
	) : (
		<NotFoundPage />
	)
}
