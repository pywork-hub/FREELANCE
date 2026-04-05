import type { Metadata } from 'next'

import Orders from '@/components/screens/authorized/user/orders/Orders'
import { NO_INDEX_PAGE, SITE_NAME } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: `Заказы | ${SITE_NAME}`,
	...NO_INDEX_PAGE,
}

export default function OrdersPage() {
	return <Orders />
}
