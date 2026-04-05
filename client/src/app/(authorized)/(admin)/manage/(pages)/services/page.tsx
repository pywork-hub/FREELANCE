import type { Metadata } from 'next'

import ManageServices from '@/components/screens/authorized/admin/pages/services/ManageServices'
import { NO_INDEX_PAGE, SITE_NAME } from '@/constants/seo.constants'
import { getUser } from '@/server/auth/get-server-session'
import type { IPageSearchParam } from '@/shared/interfaces/param/param.interface'

export const metadata: Metadata = {
	title: `Услуги | ${SITE_NAME}`,
	...NO_INDEX_PAGE,
}

export default async function ManageServicesPage({
	searchParams,
}: IPageSearchParam) {
	const user = await getUser()

	return <ManageServices searchParams={searchParams} user={user} />
}
