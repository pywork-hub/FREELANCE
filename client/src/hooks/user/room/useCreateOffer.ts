import { useCreateOfferMutation, type OfferInput } from '@/__generated__/output'
import type { Dispatch, SetStateAction } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'

export const useCreateOffer = (
	roomId: number,
	setIsShow: Dispatch<SetStateAction<boolean>>
) => {
	const {
		register: registerInput,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<OfferInput>({
		mode: 'onChange',
		defaultValues: {
			roomId,
		},
	})

	const [createOffer, { loading }] = useCreateOfferMutation({
		onCompleted: () => {
			toast.success('Предложение успешно отправлено.')
			setIsShow(false)
		},
		onError: ({ message }) => {
			toast.error(message)
		},
	})

	const onSubmit: SubmitHandler<OfferInput> = async (data) => {
		await createOffer({
			variables: {
				data,
			},
		})
	}

	return {
		loading,
		registerInput,
		handleSubmit,
		onSubmit,
		control,
		errors,
	}
}
