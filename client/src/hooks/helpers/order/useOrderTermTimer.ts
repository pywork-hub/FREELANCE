import { orderTermFormat } from '@/utils/formats/order/order-term-format.util'
import { useEffect, useState } from 'react'

export const useOrderTermTimer = (createdAt: Date, term: number) => {
	const [timeRemaining, setTimeRemaining] = useState(
		orderTermFormat(createdAt, term)
	)

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeRemaining(orderTermFormat(createdAt, term))
		}, 1000)

		return () => clearInterval(timer)
	}, [createdAt, term])

	return timeRemaining
}
