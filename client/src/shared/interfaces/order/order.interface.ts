import type { TypeOrder, TypeOrders } from '@/shared/types/order/order.type'
import type { Dispatch, SetStateAction } from 'react'

export interface IOrder {
	order: TypeOrder
	isNotUser: boolean
	setOrders: Dispatch<SetStateAction<TypeOrder[]>>
}

export interface IOrderActions extends IOrder {
	setTimer: Dispatch<
		SetStateAction<{
			term: number
			startTime: Date
		}>
	>
}

export interface IOrders {
	orders: TypeOrders
}

export interface IOrderTimer {
	startTime: Date
	term: number
}
