import type { Metadata } from 'next'

import ManagePageEdit from '@/components/screens/authorized/admin/edits/page/ManagePageEdit'
import { NO_INDEX_PAGE, SITE_NAME } from '@/constants/seo.constants'
import type { IPageSearchParam } from '@/shared/interfaces/param/param.interface'

export const metadata: Metadata = {
	title: `Страница | ${SITE_NAME}`,
	...NO_INDEX_PAGE,
}

export default function ManagePageEditPage({ searchParams }: IPageSearchParam) {
	return <ManagePageEdit searchParams={searchParams} />
}
