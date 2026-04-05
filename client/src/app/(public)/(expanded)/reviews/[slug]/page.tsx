import type { Metadata } from 'next'

import NotFoundPage from '@/app/not-found'
import ServiceReviews from '@/components/screens/public/reviews/ServiceReviews'
import { SITE_NAME } from '@/constants/seo.constants'
import type {
	IPageSearchParam,
	IPageSlugParam,
} from '@/shared/interfaces/param/param.interface'

export const metadata: Metadata = {
	title: `Отзывы | ${SITE_NAME}`,
	description: `Отзывы | ${SITE_NAME}`,
	keywords: [SITE_NAME, 'Отзывы', 'Отзывы услуги', `Отзывы ${SITE_NAME}`],
}

export default function ReviewsPage({
	params,
	searchParams,
}: IPageSlugParam & IPageSearchParam) {
	if (!params.slug) return <NotFoundPage />

	return <ServiceReviews slug={params.slug} searchParams={searchParams} />
}
