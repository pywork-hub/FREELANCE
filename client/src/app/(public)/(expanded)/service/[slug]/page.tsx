import NotFoundPage from '@/app/not-found'
import Single from '@/components/screens/public/single/Single'
import { SITE_URL } from '@/constants/seo.constants'
import { useCurrentService } from '@/hooks/public/services/useCurrentService'
import { SEO_METADATA } from '@/seo/metadata.seo'
import type { IPageSlugParam } from '@/shared/interfaces/param/param.interface'
import { headers } from 'next/headers'

export async function generateMetadata({ params }: IPageSlugParam) {
	const { service } = await useCurrentService(params?.slug)

	if (!service || !service.seo) return {}

	const headersList = headers()
	const url = headersList.get('x-pathname')

	return SEO_METADATA({
		title: service.seo.title,
		description: service.seo.description,
		keywords: service.seo.keywords,
		category:
			service.categories.length > 0 ? service.categories[0].name : undefined,
		graphs: service.seo.graphs,
		url: url ? `${SITE_URL}${url}` : undefined,
	})
}

export default async function SinglePage({ params }: IPageSlugParam) {
	const { error, service, similarServices, reviewsCount } = await useCurrentService(params?.slug)

	if (!params.slug || error || !service) {
		return <NotFoundPage />
	}

	return (
		<Single
			service={service}
			similarServices={similarServices}
			reviewsCount={reviewsCount}
		/>
	)
}
