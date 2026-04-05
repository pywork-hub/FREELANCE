import {
	MessageType,
	OrderStatus,
	useUserNotificationSubscription,
} from '@/__generated__/output'
import type { TypeOrder } from '@/shared/types/order/order.type'
import { useEffect, type Dispatch, type SetStateAction } from 'react'

export const useOrderNotification = (
	userId: number,
	setOrders: Dispatch<SetStateAction<TypeOrder[]>>
) => {
	const { data } = useUserNotificationSubscription({
		variables: {
			userId,
		},
	})

	useEffect(() => {
		if (data?.userNotification) {
			const message = data.userNotification

			setOrders((prevOrders) => {
				const orderIndex = prevOrders.findIndex(
					(order) => order.id === message.orderId
				)

				if (orderIndex === -1) {
					return prevOrders
				}

				const updatedOrders = [...prevOrders]

				const status =
					message.type === MessageType.OrderInProcess
						? OrderStatus.InProcess
						: message.type === MessageType.OrderCompleted
						? OrderStatus.Completed
						: message.type === MessageType.OrderCanceled
						? OrderStatus.Canceled
						: message.type === MessageType.OrderRefunded
						? OrderStatus.Refunded
						: OrderStatus.Expired

				updatedOrders[orderIndex] = {
					...updatedOrders[orderIndex],
					status,
				}

				return updatedOrders
			})
		}
	}, [data?.userNotification, setOrders])
}
