import { OrderStatus } from '@/__generated__/output'
import cn from 'clsx'
import type { FC } from 'react'
import styles from '../../Orders.module.scss'
import type { IOrdersWrapperFilters } from './interface/orders-wrapper-filters.interface'

const OrdersWrapperFilters: FC<IOrdersWrapperFilters> = ({
	current,
	showAllOrders,
	showActiveOrders,
	showCompletedOrders,
	showCanceledOrders,
	showExpiredOrders,
	showRefundedOrders,
}) => {
	return (
		<ul className={styles.filters}>
			<li className={styles.filter}>
				<button
					className={cn(styles.filterBtn, {
						[styles.picked]: !current,
					})}
					onClick={showAllOrders}
				>
					Все
				</button>
			</li>
			<li className={styles.filter}>
				<button
					className={cn(styles.filterBtn, {
						[styles.picked]: current === OrderStatus.InProcess,
					})}
					onClick={showActiveOrders}
				>
					В работе
				</button>
			</li>
			<li className={styles.filter}>
				<button
					className={cn(styles.filterBtn, {
						[styles.picked]: current === OrderStatus.Completed,
					})}
					onClick={showCompletedOrders}
				>
					Завершённые
				</button>
			</li>
			<li className={styles.filter}>
				<button
					className={cn(styles.filterBtn, {
						[styles.picked]: current === OrderStatus.Canceled,
					})}
					onClick={showCanceledOrders}
				>
					Отменённые
				</button>
			</li>
			<li className={styles.filter}>
				<button
					className={cn(styles.filterBtn, {
						[styles.picked]: current === OrderStatus.Expired,
					})}
					onClick={showExpiredOrders}
				>
					Истекшие
				</button>
			</li>
			<li className={styles.filter}>
				<button
					className={cn(styles.filterBtn, {
						[styles.picked]: current === OrderStatus.Refunded,
					})}
					onClick={showRefundedOrders}
				>
					Возвращенные
				</button>
			</li>
		</ul>
	)
}

export default OrdersWrapperFilters
