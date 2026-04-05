import type { Metadata } from 'next'

import NotFoundPage from '@/app/not-found'
import ManageUserEdit from '@/components/screens/authorized/admin/edits/user/ManageUserEdit'
import { NO_INDEX_PAGE, SITE_NAME } from '@/constants/seo.constants'
import type { IPageIdParam } from '@/shared/interfaces/param/param.interface'

export const metadata: Metadata = {
	title: `Пользователь | ${SITE_NAME}`,
	...NO_INDEX_PAGE,
}

export default function ManageUserEditPage({ params }: IPageIdParam) {
	return params.id ? <ManageUserEdit queryId={params.id} /> : <NotFoundPage />
}
