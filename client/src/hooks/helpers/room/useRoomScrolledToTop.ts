import { Sort } from '@/__generated__/output'
import { useMessages } from '@/hooks/user/room/useMessages'
import type { TypeMessages } from '@/shared/types/message/message.type'
import {
	useEffect,
	useState,
	type Dispatch,
	type RefObject,
	type SetStateAction,
} from 'react'

export const useRoomScroll = (
	roomId: number,
	length: number,
	scrollRef: RefObject<HTMLDivElement>,
	setSubMessages: Dispatch<SetStateAction<TypeMessages>>
) => {
	const [page, setPage] = useState(2)
	const [isEnabled, setIsEnabled] = useState(true)

	const { getMessages } = useMessages(
		roomId,
		{
			sort: Sort.Desc,
			page: String(page),
			perPage: '50',
		},
		page,
		setPage,
		setSubMessages,
		setIsEnabled
	)

	useEffect(() => {
		const currentScrollRef = scrollRef.current
		if (!currentScrollRef) return

		const handleScroll = () => {
			if (!isEnabled || length < 50) return

			const { scrollTop, clientHeight, scrollHeight } = currentScrollRef

			if (scrollHeight - clientHeight + scrollTop <= 1) {
				getMessages()
			}
		}

		currentScrollRef.addEventListener('scroll', handleScroll)

		return () => {
			if (currentScrollRef) {
				currentScrollRef.removeEventListener('scroll', handleScroll)
			}
		}
	}, [scrollRef, isEnabled, length])
}
