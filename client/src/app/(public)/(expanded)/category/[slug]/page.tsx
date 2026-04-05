import NotFoundPage from '@/app/not-found'
import Market from '@/components/screens/public/market/Market'
import { SITE_URL } from '@/constants/seo.constants'
import { useCatalog } from '@/hooks/public/catalog/useCatalog'
import { SEO_METADATA } from '@/seo/metadata.seo'
import { getUser } from '@/server/auth/get-server-session'
import type { IPageSlugParam } from '@/shared/interfaces/param/param.interface'
import { headers } from 'next/headers'

export async function generateMetadata({ params }: IPageSlugParam) {
	const { seo, categoryName, error } = await useCatalog(params.slug)

	if (!seo || error) return {}

	const headersList = headers()
	const url = headersList.get('x-pathname')

	return SEO_METADATA({
		title: seo.title,
		description: seo.description,
		keywords: seo.keywords,
		category: categoryName || undefined,
		graphs: seo.graphs,
		url: url ? `${SITE_URL}${url}` : undefined,
	})
}

export default async function CategoryPage({ params }: IPageSlugParam) {
	const user = await getUser()
	const { error, categories, filters, block } = await useCatalog(params.slug)

	if (error || !filters) return <NotFoundPage />

	return (
		<Market
			slug={params.slug}
			block={block}
			filters={filters}
			categories={categories}
			user={user}
		/>
	)
}
