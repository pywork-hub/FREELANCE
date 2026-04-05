import { useCheckedMessageSubscription } from '@/__generated__/output'
import type { TypeLastMessage } from '@/shared/types/message/message.type'
import { useEffect, type Dispatch, type SetStateAction } from 'react'

export const useLastCheckedMessage = (
	setLastMessage: Dispatch<SetStateAction<TypeLastMessage>>,
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
			const messageIds = data.checkedMessage

			setLastMessage((prevData) => {
				if (prevData && messageIds.includes(prevData.id)) {
					return {
						...prevData,
						isChecked: true,
					}
				}
				return prevData
			})
		}
	}, [data?.checkedMessage])
}
