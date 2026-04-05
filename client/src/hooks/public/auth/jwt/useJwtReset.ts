import {
	useJwtResetMutation,
	type JwtAuthResetInput,
} from '@/__generated__/output'
import { PUBLIC_PAGES } from '@/constants/url.constants'
import { useRouter } from 'next/navigation'
import { useForm, type SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'

export const useJwtAuthReset = (token: string) => {
	const {
		register: registerInput,
		formState: { errors },
		handleSubmit,
	} = useForm<JwtAuthResetInput>({
		mode: 'onChange',
		defaultValues: {
			token,
		},
	})
	const { replace } = useRouter()

	const [reset, { loading }] = useJwtResetMutation()

	const onSubmit: SubmitHandler<JwtAuthResetInput> = async (data) => {
		if (!token) return toast.error('Токен не найден.')

		await reset({
			variables: {
				data,
			},
			onCompleted: (data) => {
				if (data.jwtReset) {
					toast.success('Пароль успешно обновлен. Войдите с новым паролем.')
					replace(PUBLIC_PAGES.LOGIN)
					return
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
