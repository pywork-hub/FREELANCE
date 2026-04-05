import type { Metadata } from 'next'

import ManageUsers from '@/components/screens/authorized/admin/pages/users/ManageUsers'
import { NO_INDEX_PAGE, SITE_NAME } from '@/constants/seo.constants'
import type { IPageSearchParam } from '@/shared/interfaces/param/param.interface'

export const metadata: Metadata = {
	title: `Пользователи | ${SITE_NAME}`,
	...NO_INDEX_PAGE,
}

export default function ManageUsersPage({ searchParams }: IPageSearchParam) {
	return <ManageUsers searchParams={searchParams} />
}
