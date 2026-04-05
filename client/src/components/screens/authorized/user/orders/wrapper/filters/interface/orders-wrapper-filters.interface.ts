import { OrderStatus } from '@/__generated__/output'

export interface IOrdersWrapperFilters {
	current: OrderStatus | null
	showAllOrders: () => void
	showActiveOrders: () => void
	showCompletedOrders: () => void
	showCanceledOrders: () => void
	showExpiredOrders: () => void
	showRefundedOrders: () => void
}
