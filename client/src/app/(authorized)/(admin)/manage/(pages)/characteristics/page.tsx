import type { Metadata } from 'next'

import ManageAttributes from '@/components/screens/authorized/admin/pages/attributes/ManageAttributes'
import { NO_INDEX_PAGE, SITE_NAME } from '@/constants/seo.constants'
import type { IPageSearchParam } from '@/shared/interfaces/param/param.interface'

export const metadata: Metadata = {
	title: `Характеристики | ${SITE_NAME}`,
	...NO_INDEX_PAGE,
}

export default function ManageAttributesPage({
	searchParams,
}: IPageSearchParam) {
	return <ManageAttributes searchParams={searchParams} />
}
