import {
	useChangeRoomManagerMutation,
	type ChangeRoomManagerInput,
} from '@/__generated__/output'
import { USER_PAGES } from '@/constants/url.constants'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export const useChangeRoomManager = () => {
	const { replace, refresh } = useRouter()

	const [mutate] = useChangeRoomManagerMutation({
		onCompleted: (data) => {
			if (data.changeRoomManager) {
				toast.success('Менеджер комнаты успешно изменен.')
				replace(USER_PAGES.CHAT())
				refresh()
				return
			}

			toast.error('Произошла ошибка.')
		},
		onError: ({ message }) => {
			toast.error(message)
		},
	})

	const changeManager = (data: ChangeRoomManagerInput) => {
		mutate({
			variables: {
				data,
			},
		})
	}

	return { changeManager }
}
