import {
	useSendNewsletterMutation,
	type NewsletterInput,
} from '@/__generated__/output'
import { useForm, type SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'

export const useSendNewsletter = () => {
	const {
		register: registerInput,
		control,
		formState: { errors },
		handleSubmit,
		setValue,
	} = useForm<NewsletterInput>({
		mode: 'onChange',
	})

	const [sendNewsletter, { loading }] = useSendNewsletterMutation({
		onCompleted: ({ sendNewsletter }) => {
			sendNewsletter
				? toast.success('Рассылка успешно отправлена.')
				: toast.error('Ошибка во время отправки рассылки.')
		},
		onError: ({ message }) => {
			toast.error(message)
		},
	})

	const onSubmit: SubmitHandler<NewsletterInput> = async (data) => {
		if (!data.file) {
			toast.error('Выберите HTML файл.')
			return
		}

		await sendNewsletter({
			variables: {
				data,
			},
		})
	}

	return {
		registerInput,
		control,
		errors,
		handleSubmit,
		onSubmit,
		setValue,
		loading,
	}
}
