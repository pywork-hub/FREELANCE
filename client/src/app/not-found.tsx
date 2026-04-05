import type { Metadata } from 'next'

import SimpleFooter from '@/components/layout/footer/simple/SimpleFooter'
import SimpleHeader from '@/components/layout/header/simple/SimpleHeader'
import NotFound from '@/components/screens/public/not-found/NotFound'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Not Found',
	...NO_INDEX_PAGE,
}

export default function NotFoundPage() {
	return (
		<>
			<SimpleHeader />
			<main>
				<NotFound />
			</main>
			<SimpleFooter />
		</>
	)
}
