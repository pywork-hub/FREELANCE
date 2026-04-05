import {
	OrderStatus,
	useOrderActionMutation,
	type OrderActionInput,
} from '@/__generated__/output'
import type { TypeOrder } from '@/shared/types/order/order.type'
import { type Dispatch, type SetStateAction } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { toast } from 'react-hot-toast'

export const useOrderAction = (
	orderId: number,
	managerId: number,
	userId: number,
	setOrders: Dispatch<SetStateAction<TypeOrder[]>>,
	setTimer: Dispatch<
		SetStateAction<{
			term: number
			startTime: Date
		}>
	>,
	setState: Dispatch<
		SetStateAction<{
			isShow: boolean
			action: () => void
			type: string
		}>
	>
) => {
	const {
		control,
		formState: { errors },
		handleSubmit,
	} = useForm<OrderActionInput>({
		mode: 'onChange',
	})

	const updateOrderStatus = (status: OrderStatus) => {
		setOrders((prevOrders) => {
			const orderIndex = prevOrders.findIndex((order) => order.id === orderId)

			if (orderIndex === -1) {
				return prevOrders
			}

			const updatedOrders = [...prevOrders]

			updatedOrders[orderIndex] = {
				...updatedOrders[orderIndex],
				status,
			}

			return updatedOrders
		})
	}

	const [updateStatus] = useOrderActionMutation({
		onError: ({ message }) => {
			toast.error(message)
		},
	})

	const cancelOrder = () =>
		updateStatus({
			variables: {
				data: {
					orderId,
					managerId,
					userId,
					type: 'canceled',
				},
			},
			onCompleted: () => {
				updateOrderStatus(OrderStatus.Canceled)
				toast.success('Заказ успешно отменен.')
			},
		})

	const completeOrder = () =>
		updateStatus({
			variables: {
				data: {
					orderId,
					managerId,
					userId,
					type: 'completed',
				},
			},
			onCompleted: () => {
				updateOrderStatus(OrderStatus.Completed)
				toast.success('Заказ успешно завершен.')
			},
		})

	const onSubmitInProcess: SubmitHandler<OrderActionInput> = async ({
		term,
	}) => {
		await updateStatus({
			variables: {
				data: {
					orderId,
					managerId,
					userId,
					term,
					type: 'inProcess',
				},
			},
			onCompleted: () => {
				updateOrderStatus(OrderStatus.InProcess)
				if (term) {
					setTimer({
						term: term + 1,
						startTime: new Date(),
					})
				}
				setState((prev) => ({
					...prev,
					isShow: false,
				}))
				toast.success('Заказ успешно в работе.')
			},
		})
	}

	const refundOrder = () =>
		updateStatus({
			variables: {
				data: {
					orderId,
					managerId,
					userId,
					type: 'refunded',
				},
			},
			onCompleted: () => {
				updateOrderStatus(OrderStatus.Refunded)
				toast.success('Заказ успешно возвращён.')
			},
		})

	return {
		cancelOrder,
		completeOrder,
		refundOrder,
		onSubmitInProcess,
		control,
		errors,
		handleSubmit,
	}
}
