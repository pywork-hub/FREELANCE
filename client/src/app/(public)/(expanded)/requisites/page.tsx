import type { Metadata } from 'next'

import Requisites from '@/components/screens/public/requisites/Requisites'
import { NO_INDEX_PAGE, SITE_NAME } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: `Реквизиты | ${SITE_NAME}`,
	...NO_INDEX_PAGE,
}

export default function RequisitesPage() {
	return <Requisites />
}
