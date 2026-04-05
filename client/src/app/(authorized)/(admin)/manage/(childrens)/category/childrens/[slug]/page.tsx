import type { Metadata } from 'next'

import NotFoundPage from '@/app/not-found'
import ManageCategories from '@/components/screens/authorized/admin/pages/categories/ManageCategories'
import { NO_INDEX_PAGE, SITE_NAME } from '@/constants/seo.constants'
import type {
	IPageSearchParam,
	IPageSlugParam,
} from '@/shared/interfaces/param/param.interface'

export const metadata: Metadata = {
	title: `Категории | ${SITE_NAME}`,
	...NO_INDEX_PAGE,
}

export default function CategoryChildrensPage({
	params,
	searchParams,
}: IPageSlugParam & IPageSearchParam) {
	return params.slug ? (
		<ManageCategories slug={params.slug} searchParams={searchParams} />
	) : (
		<NotFoundPage />
	)
}
