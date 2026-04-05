import {
	useSendRequestMutation,
	type RequestInput,
} from '@/__generated__/output'
import type { TypeIronUser } from '@/shared/types/user/user.type'
import { useContactStore } from '@/store/timer/timer.store'
import { timerFormat } from '@/utils/formats/timer/timer-format.util'
import { useForm, type SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'

export const useSendRequest = ({ user }: TypeIronUser) => {
	const {
		register: registerInput,
		control,
		formState: { errors },
		handleSubmit,
	} = useForm<RequestInput>({
		mode: 'onChange',
	})
	const { remainingTime, setTimer } = useContactStore()

	const [sendRequest, { loading }] = useSendRequestMutation()

	const onSubmit: SubmitHandler<RequestInput> = async (data) => {
		if (remainingTime) {
			return toast.error(
				`Мы уже отправили ссылку для подтверждения на ваш email. Вы можете попробовать снова через ${timerFormat(
					remainingTime
				)}.`
			)
		}

		await sendRequest({
			variables: {
				data: {
					firstName: data.firstName,
					lastName: data.lastName,
					message: data.message,
					...(user ? { email: user.profile.email } : { email: data.email }),
				},
			},
			onCompleted: (data) => {
				if (!data.sendRequest.id) {
					toast.error('Ошибка при отправке сообщения.')
					return
				}
				setTimer(300)
				toast.success(
					'Сообщение успешно отправлено. Мы ответим вам по электронной почте.',
					{
						duration: 5000,
					}
				)
			},
			onError: () => {
				toast.error('Ошибка при отправке сообщения.')
			},
		})
	}

	return { registerInput, control, errors, handleSubmit, onSubmit, loading }
}
