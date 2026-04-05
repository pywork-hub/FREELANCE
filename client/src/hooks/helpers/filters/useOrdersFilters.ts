import { OrderStatus } from '@/__generated__/output'
import { useOrderNotification } from '@/hooks/user/orders/useOrderNotification'

import type { TypeOrder } from '@/shared/types/order/order.type'
import { useState, type Dispatch, type SetStateAction } from 'react'

export const useOrdersFilters = (
	userId: number,
	orders: TypeOrder[],
	setOrders: Dispatch<SetStateAction<TypeOrder[]>>
) => {
	const [currentFilter, setCurrentFilter] = useState<OrderStatus | null>(null)

	useOrderNotification(userId, setOrders)

	const getFilteredOrders = () => {
		switch (currentFilter) {
			case null:
				return orders
			case OrderStatus.InProcess:
				return orders.filter((order) => order.status === OrderStatus.InProcess)
			case OrderStatus.Completed:
				return orders.filter((order) => order.status === OrderStatus.Completed)
			case OrderStatus.Canceled:
				return orders.filter((order) => order.status === OrderStatus.Canceled)
			case OrderStatus.Expired:
				return orders.filter((order) => order.status === OrderStatus.Expired)
			case OrderStatus.Refunded:
				return orders.filter((order) => order.status === OrderStatus.Refunded)
			default:
				return orders
		}
	}

	const showAllOrders = () => setCurrentFilter(null)
	const showActiveOrders = () => setCurrentFilter(OrderStatus.InProcess)
	const showCompletedOrders = () => setCurrentFilter(OrderStatus.Completed)
	const showCanceledOrders = () => setCurrentFilter(OrderStatus.Canceled)
	const showExpiredOrders = () => setCurrentFilter(OrderStatus.Expired)
	const showRefundedOrders = () => setCurrentFilter(OrderStatus.Refunded)

	return {
		currentFilter,
		filteredOrders: getFilteredOrders(),
		showAllOrders,
		showActiveOrders,
		showCompletedOrders,
		showCanceledOrders,
		showExpiredOrders,
		showRefundedOrders,
	}
}
