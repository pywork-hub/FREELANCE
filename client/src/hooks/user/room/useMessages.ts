import { useMessagesMutation, type QueryInput } from '@/__generated__/output'
import type { TypeMessages } from '@/shared/types/message/message.type'
import type { Dispatch, SetStateAction } from 'react'
import toast from 'react-hot-toast'

export const useMessages = (
	roomId: number,
	query: QueryInput,
	page: number,
	setPage: Dispatch<SetStateAction<number>>,
	setSubMessages: Dispatch<SetStateAction<TypeMessages>>,
	setIsEnabled: Dispatch<SetStateAction<boolean>>
) => {
	const [getMessages] = useMessagesMutation({
		variables: {
			roomId,
			query,
		},
		onCompleted: ({ messages }) => {
			setSubMessages((prevData) => [...prevData, ...(messages as any)])
			if (messages.length === 0) {
				setIsEnabled(false)
			} else {
				setPage(page + 1)
			}
		},
		onError: () => {
			setPage(page)
			toast.error('Произошла ошибка.')
		},
	})

	return { getMessages }
}
