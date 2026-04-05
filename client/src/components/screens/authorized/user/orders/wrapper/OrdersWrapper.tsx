'use client'

import { UserRole } from '@/__generated__/output'
import Order from '@/components/parts/order/Order'
import { useOrdersFilters } from '@/hooks/helpers/filters/useOrdersFilters'
import type { IOrders } from '@/shared/interfaces/order/order.interface'
import type { TypeExistUser } from '@/shared/types/user/user.type'
import cn from 'clsx'
import { useState, type FC } from 'react'
import styles from '../Orders.module.scss'
import OrdersWrapperFilters from './filters/OrdersWrapperFilters'

const OrdersWrapper: FC<IOrders & TypeExistUser> = ({
	orders: queriedOrders,
	user,
}) => {
	const [orders, setOrders] = useState(queriedOrders)
	const {
		currentFilter,
		filteredOrders,
		showAllOrders,
		showActiveOrders,
		showCanceledOrders,
		showCompletedOrders,
		showExpiredOrders,
		showRefundedOrders,
	} = useOrdersFilters(user.id, orders, setOrders)

	const isNotUser =
		user.roles.includes(UserRole.Manager) || user.roles.includes(UserRole.Admin)

	return (
		<div className={styles.inner}>
			<OrdersWrapperFilters
				current={currentFilter}
				showAllOrders={showAllOrders}
				showActiveOrders={showActiveOrders}
				showCanceledOrders={showCanceledOrders}
				showCompletedOrders={showCompletedOrders}
				showExpiredOrders={showExpiredOrders}
				showRefundedOrders={showRefundedOrders}
			/>
			<div className={styles.fill}>
				<ul className={styles.labels}>
					<li className={cn(styles.label, styles.number)}>Номер</li>
					<li className={cn(styles.label, styles.name)}>Название</li>
					<li className={cn(styles.label, styles.partner)}>
						{isNotUser ? 'Покупатель' : 'Менеджер'}
					</li>
					<li className={cn(styles.label, styles.price)}>Цена</li>
					<li className={cn(styles.label, styles.orderStatus)}>
						Статус заказа
					</li>
					<li className={cn(styles.label, styles.created)}>Дата Создании</li>
					<li className={cn(styles.label, styles.term)}>Осталось</li>
				</ul>
				<ul className={styles.orders}>
					{filteredOrders.map((order, index) => (
						<Order
							key={index}
							order={order}
							isNotUser={isNotUser}
							setOrders={setOrders}
							user={user}
						/>
					))}
				</ul>
			</div>
		</div>
	)
}

export default OrdersWrapper
