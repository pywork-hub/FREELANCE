import type { Metadata } from 'next'

import Favorites from '@/components/screens/authorized/user/favorites/Favorites'
import { NO_INDEX_PAGE, SITE_NAME } from '@/constants/seo.constants'
import type { IPageSearchParam } from '@/shared/interfaces/param/param.interface'

export const metadata: Metadata = {
	title: `Избранное | ${SITE_NAME}`,
	...NO_INDEX_PAGE,
}

export default function FavoritePage({ searchParams }: IPageSearchParam) {
	return <Favorites searchParams={searchParams} />
}
