import { PageType } from '@/__generated__/output'
import Home from '@/components/screens/public/home/Home'
import { SITE_URL } from '@/constants/seo.constants'
import { useSeo } from '@/hooks/public/seo/useSeo'
import { SEO_METADATA } from '@/seo/metadata.seo'

export async function generateMetadata() {
	const { seo, error } = await useSeo(PageType.Home)

	if (!seo || error) return {}

	return SEO_METADATA({
		title: seo.title,
		description: seo.description,
		keywords: seo.keywords,
		graphs: seo.graphs,
		url: SITE_URL,
	})
}

export default function HomePage() {
	return <Home />
}
