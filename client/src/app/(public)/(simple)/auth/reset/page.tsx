import type { Metadata } from 'next'

import AuthReset from '@/components/screens/public/auth/forms/form/reset/AuthReset'
import { NO_INDEX_PAGE, SITE_NAME } from '@/constants/seo.constants'
import type { IPageSearchParam } from '@/shared/interfaces/param/param.interface'

export const metadata: Metadata = {
	title: `Сброс пароля | ${SITE_NAME}`,
	...NO_INDEX_PAGE,
}

export default function AuthResetPage({ searchParams }: IPageSearchParam) {
	return <AuthReset searchParams={searchParams} />
}
