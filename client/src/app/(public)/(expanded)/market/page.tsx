import NotFoundPage from '@/app/not-found'
import Market from '@/components/screens/public/market/Market'
import { SITE_URL } from '@/constants/seo.constants'
import { useCatalog } from '@/hooks/public/catalog/useCatalog'
import { SEO_METADATA } from '@/seo/metadata.seo'
import { getUser } from '@/server/auth/get-server-session'
import { headers } from 'next/headers'

export async function generateMetadata() {
	const { seo, error } = await useCatalog()

	if (!seo || error) return {}

	const headersList = headers()
	const url = headersList.get('x-pathname')

	return SEO_METADATA({
		title: seo.title,
		description: seo.description,
		keywords: seo.keywords,
		graphs: seo.graphs,
		url: url ? `${SITE_URL}${url}` : undefined,
	})
}

export default async function MarketPage() {
	const user = await getUser()
	const { error, categories, filters, block } = await useCatalog()

	if (error || !filters) return <NotFoundPage />

	return (
		<Market
			block={block}
			categories={categories}
			filters={filters}
			user={user}
		/>
	)
}
