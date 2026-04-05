import type { Metadata } from 'next'

import Thanks from '@/components/screens/public/thanks/Thanks'
import { NO_INDEX_PAGE, SITE_NAME } from '@/constants/seo.constants'
import type { IPageSearchParam } from '@/shared/interfaces/param/param.interface'

export const metadata: Metadata = {
	title: `Спасибо | ${SITE_NAME}`,
	...NO_INDEX_PAGE,
}

export default function ThanksPage({ searchParams }: IPageSearchParam) {
	return <Thanks searchParams={searchParams} />
}
