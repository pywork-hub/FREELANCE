import { useCheckedMessageSubscription } from '@/__generated__/output'
import type { TypeMessages } from '@/shared/types/message/message.type'
import { useEffect, type Dispatch, type SetStateAction } from 'react'

export const useCheckedMessage = (
	setSubMessages: Dispatch<SetStateAction<TypeMessages>>,
	roomId: number,
	userId: number
) => {
	const { data } = useCheckedMessageSubscription({
		variables: {
			roomId,
			userId,
		},
	})

	useEffect(() => {
		if (data?.checkedMessage && data.checkedMessage.length > 0) {
			const messagesIds = data.checkedMessage
			setSubMessages((prevData) => {
				return prevData.map((message) => {
					if (messagesIds.includes(message.id)) {
						return {
							...message,
							isChecked: true,
						}
					}
					return message
				})
			})
		}
	}, [data?.checkedMessage])
}
