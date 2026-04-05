import type { Metadata } from 'next'

import AuthConfirm from '@/components/screens/public/auth/confirm/AuthConfirm'
import { NO_INDEX_PAGE, SITE_NAME } from '@/constants/seo.constants'
import type { IPageSearchParam } from '@/shared/interfaces/param/param.interface'

export const metadata: Metadata = {
	title: `Подтверждение | ${SITE_NAME}`,
	...NO_INDEX_PAGE,
}

export default function AuthConfirmPage({ searchParams }: IPageSearchParam) {
	return (
		<AuthConfirm
			token={searchParams?.token ? String(searchParams.token) : ''}
		/>
	)
}
