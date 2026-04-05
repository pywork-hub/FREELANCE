import type { Metadata } from 'next'

import ManageCategories from '@/components/screens/authorized/admin/pages/categories/ManageCategories'
import { NO_INDEX_PAGE, SITE_NAME } from '@/constants/seo.constants'
import type { IPageSearchParam } from '@/shared/interfaces/param/param.interface'

export const metadata: Metadata = {
	title: `Категории | ${SITE_NAME}`,
	...NO_INDEX_PAGE,
}

export default function ManageCategoriesPage({
	searchParams,
}: IPageSearchParam) {
	return <ManageCategories searchParams={searchParams} />
}
