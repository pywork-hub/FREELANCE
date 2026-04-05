import {
	useOrderServiceMutation,
	type ServiceOrderInput,
} from '@/__generated__/output'
import { USER_PAGES } from '@/constants/url.constants'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export const useOrderService = (data: ServiceOrderInput) => {
	const { replace, refresh } = useRouter()

	const [mutate, { loading }] = useOrderServiceMutation({
		onCompleted: (data) => {
			const managerLogin = data.orderService.room.users.find(
				(u) => u.profile.login !== data.orderService.sender.profile.login
			)

			replace(USER_PAGES.CHAT(managerLogin ? managerLogin.profile.login : ''))

			refresh()
		},
		onError: ({ message }) => {
			toast.error(message)
		},
	})

	const orderService = () => {
		mutate({
			variables: {
				data,
			},
		})
	}

	return { orderService, loading }
}
