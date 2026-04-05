import { Sort } from '@/__generated__/output'
import Container from '@/components/ui/common/container/Container'
import Section from '@/components/ui/common/section/Section'
import Heading from '@/components/ui/elements/heading/Heading'
import { useUserOrders } from '@/hooks/user/orders/useUserOrders'
import { getExistUser } from '@/server/auth/get-server-session'
import type { FC } from 'react'
import styles from './Orders.module.scss'
import OrdersWrapper from './wrapper/OrdersWrapper'

const Orders: FC = async () => {
	const user = await getExistUser()
	const { orders, error } = await useUserOrders({
		sort: Sort.Desc,
	})

	if (error || !user) return null

	return (
		<Section className={styles.section}>
			<Container>
				<div className={styles.wrapper}>
					<Heading variant="h1" className={styles.heading}>
						Мои Заказы
					</Heading>
					{orders.length > 0 ? (
						<OrdersWrapper orders={orders} user={user} />
					) : (
						<p className={styles.notFound}>У вас нет заказов.</p>
					)}
				</div>
			</Container>
		</Section>
	)
}

export default Orders
