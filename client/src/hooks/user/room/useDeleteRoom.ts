import { useDeleteRoomMutation } from '@/__generated__/output'
import { USER_PAGES } from '@/constants/url.constants'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export const useDeleteRoom = () => {
	const { push, refresh } = useRouter()

	const [mutate, { loading }] = useDeleteRoomMutation({
		onCompleted: () => {
			push(USER_PAGES.CHAT())
			refresh()
		},
		onError: ({ message }) => {
			toast.error(message)
		},
	})

	const deleteRoom = (roomId: number) => {
		mutate({
			variables: {
				roomId,
			},
		})
	}

	return {
		deleteRoom,
		loading,
	}
}
