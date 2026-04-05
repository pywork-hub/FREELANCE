import {
	MessageStatus,
	useNewLastMessageSubscription,
} from '@/__generated__/output'
import type { TypeLastMessage } from '@/shared/types/message/message.type'
import { useEffect, type Dispatch, type SetStateAction } from 'react'

export const useLastMessage = (
	setLastMessage: Dispatch<SetStateAction<TypeLastMessage>>,
	roomId: number,
	lastMessageId?: number | null
) => {
	const { data } = useNewLastMessageSubscription({
		variables: {
			roomId,
		},
	})

	useEffect(() => {
		if (data?.roomMessages) {
			const message = data.roomMessages

			setLastMessage((prev) => {
				if (message.status === MessageStatus.Posted) {
					return {
						id: message.id,
						content: message.content,
						senderId: message.sender.id,
						type: message.type,
						isChecked: message.isChecked,
						status: message.status,
						createdAt: message.createdAt,
					}
				}

				if (prev && prev.id === message.id) {
					if (message.status === MessageStatus.Deleted) {
						return { ...prev, status: MessageStatus.Deleted }
					} else if (message.status === MessageStatus.Edited) {
						return {
							...prev,
							content: message.content,
							status: MessageStatus.Edited,
						}
					}
				}

				return prev
			})
		}
	}, [data?.roomMessages, lastMessageId, setLastMessage])

	return { messages: data?.roomMessages }
}
