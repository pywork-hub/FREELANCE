import { useCheckedMessageSubscription } from '@/__generated__/output'
import { useNotificationStore } from '@/store/notification/notification.store'
import { useEffect } from 'react'

export const useNotificationCheckedMessage = (
	roomId: number,
	userId: number
) => {
	const { checkMessages } = useNotificationStore()
	const { data } = useCheckedMessageSubscription({
		variables: {
			roomId,
			userId,
		},
	})

	useEffect(() => {
		if (data?.checkedMessage) {
			checkMessages(data.checkedMessage)
		}
	}, [data?.checkedMessage, checkMessages])
}
