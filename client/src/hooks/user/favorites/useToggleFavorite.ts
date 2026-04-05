import { useToggleFavoriteMutation } from '@/__generated__/output'
import { setServerSession } from '@/server/auth/get-server-session'
import toast from 'react-hot-toast'

export const useToggleFavorite = () => {
	const [mutate] = useToggleFavoriteMutation()

	const toggleFavorite = (serviceSlug: string) => {
		mutate({
			variables: {
				serviceSlug,
			},
			onCompleted: async (data) => {
				await setServerSession(data.toggleFavorite.user)
			},
			onError: () => {
				toast.error('Произошла ошибка.')
			},
		})
	}

	return {
		toggleFavorite,
	}
}
