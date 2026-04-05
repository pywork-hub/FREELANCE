import { useCreateReviewOfferMutation } from '@/__generated__/output'
import toast from 'react-hot-toast'

export const useCreateReviewOffer = (roomId: number, closeModal: () => void) => {
	const [mutate, { loading }] = useCreateReviewOfferMutation({
		onCompleted: () => {
			toast.success('Предложение отзыва успешно отправлено.')
			closeModal()
		},
		onError: ({ message }) => {
			toast.error(message)
		},
	})

	const createReviewOffer = (serviceId: number) =>
		mutate({
			variables: {
				data: {
					roomId,
					serviceId,
				},
			},
		})

	return {
		createReviewOffer,
		loading,
	}
}
