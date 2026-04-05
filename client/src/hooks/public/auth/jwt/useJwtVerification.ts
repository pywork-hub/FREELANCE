import {
	useJwtVerificationMutation,
	type JwtAuthVerificationInput,
} from '@/__generated__/output'
import { useAuthVerificationStore } from '@/store/timer/timer.store'
import { timerFormat } from '@/utils/formats/timer/timer-format.util'
import { useForm, type SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'

export const useJwtAuthVerification = () => {
	const {
		register: registerInput,
		formState: { errors },
		handleSubmit,
	} = useForm<JwtAuthVerificationInput>({
		mode: 'onChange',
	})
	const { remainingTime, setTimer } = useAuthVerificationStore()

	const [sendVerification, { loading }] = useJwtVerificationMutation()

	const onSubmit: SubmitHandler<JwtAuthVerificationInput> = async (data) => {
		if (remainingTime) {
			return toast.error(
				`Мы уже отправили ссылку для подтверждения на вашу электронную почту. Вы можете попробовать снова через ${timerFormat(
					remainingTime
				)}.`
			)
		}

		await sendVerification({
			variables: {
				data,
			},
			onCompleted: (data) => {
				if (data.jwtVerification) {
					setTimer(300)
					return toast.success(
						'Мы уже отправили ссылку для подтверждения на вашу электронную почту. Вы можете попробовать снова через 5 минут.',
						{
							duration: 5000,
						}
					)
				}

				return toast.error('Произошла ошибка.')
			},
			onError: ({ message }) => {
				return toast.error(message)
			},
		})
	}

	return { registerInput, errors, handleSubmit, onSubmit, loading }
}
