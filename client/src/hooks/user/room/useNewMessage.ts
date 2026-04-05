import {
	MessageStatus,
	useNewMessageSubscription,
} from '@/__generated__/output'
import type { TypeMessages } from '@/shared/types/message/message.type'
import { useEffect, type Dispatch, type SetStateAction } from 'react'

export const useNewMessage = (
	setSubMessages: Dispatch<SetStateAction<TypeMessages>>,
	roomId: number
) => {
	const { data } = useNewMessageSubscription({
		variables: {
			roomId,
		},
	})

	useEffect(() => {
		if (data?.roomMessages) {
			const message = data.roomMessages
			const isDelete = message.status === MessageStatus.Deleted
			const isEdit = message.status === MessageStatus.Edited

			setSubMessages((prevData) => {
				if (prevData.length >= 50) {
					prevData = prevData.slice(0, -1)
				}

				if (isDelete || isEdit) {
					return prevData.map((msg) => {
						if (msg.id === message.id) {
							if (isDelete) {
								return { ...msg, status: MessageStatus.Deleted }
							}
							if (isEdit) {
								return {
									...msg,
									content: message.content,
									updatedAt: message.updatedAt,
									status: MessageStatus.Edited,
								}
							}
						}
						return msg
					})
				} else {
					return [
						{
							id: message.id,
							sender: {
								profile: {
									login: message.sender.profile.login,
									avatarPath: message.sender.profile.avatarPath,
								},
							},
							content: message.content,
							updatedAt: message.updatedAt,
							createdAt: message.createdAt,
							type: message.type,
							status: message.status,
							isChecked: message.isChecked,
						},
						...prevData,
					]
				}
			})
		}
	}, [data?.roomMessages])
}
