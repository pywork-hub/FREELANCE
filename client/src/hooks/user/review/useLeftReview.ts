import { useLeftReviewMutation, type ReviewInput } from '@/__generated__/output'
import { useForm, type SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'

export const useLeftReview = (
	serviceId: number,
	roomId: number,
	closeModal: () => void
) => {
	const {
		control,
		formState: { errors },
		handleSubmit,
	} = useForm<ReviewInput>({
		mode: 'onChange',
		defaultValues: {
			serviceId,
			roomId,
		},
	})

	const [leftReview, { loading }] = useLeftReviewMutation()

	const onSubmit: SubmitHandler<ReviewInput> = async (data) => {
		await leftReview({
			variables: {
				data,
			},
			onCompleted: ({ leftReview }) => {
				if (!leftReview.type) {
					toast.error('Произошла ошибка при попытке оставить отзыв.')
					return
				}

				closeModal()
			},
			onError: ({ graphQLErrors }) => {
				graphQLErrors.forEach(({ extensions, message }) => {
					if (extensions?.code === 'BAD_REQUEST') {
						toast.error(message)
					} else {
						toast.error('Произошла ошибка при попытке оставить отзыв.')
					}
				})
			},
		})
	}

	return { control, errors, handleSubmit, onSubmit, loading }
}
