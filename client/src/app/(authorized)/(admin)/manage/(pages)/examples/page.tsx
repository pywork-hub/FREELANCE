import type { Metadata } from 'next'

import ManageExamples from '@/components/screens/authorized/admin/pages/examples/ManageExamples'
import { NO_INDEX_PAGE, SITE_NAME } from '@/constants/seo.constants'
import { IPageSearchParam } from '@/shared/interfaces/param/param.interface'

export const metadata: Metadata = {
	title: `Примеры | ${SITE_NAME}`,
	...NO_INDEX_PAGE,
}

export default function ManageExamplesPage({ searchParams }: IPageSearchParam) {
	return <ManageExamples searchParams={searchParams} />
}
